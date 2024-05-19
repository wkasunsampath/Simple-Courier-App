import { NextFunction, Request, Response } from "express";
import createUserSchema from "../validations/createUser.schema";
import { register } from "../services/auth.service";
import { generateToken } from "../auth/payload";
import passport from "passport";
import { User } from "../db/models/User";
import { InvalidCredentialsException } from "../exceptions/InvalidCredentialsException";
import { errorLogger } from "../services/logger.service";

export const RegisterUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedResults = await createUserSchema.validateAsync(req.body);
    const user = await register(validatedResults);
    const token = generateToken(user);
    return res.json({
      token,
      user: { id: user.id, name: user.name, type: user.type },
    });
  } catch (err) {
    errorLogger.error(err);
    next(err);
  }
};

export const LoginUser = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, (err: Error, user: User) => {
    try {
      if (err || !user) {
        throw new InvalidCredentialsException();
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          throw new InvalidCredentialsException();
        }
        const token = generateToken(user);
        return res.json({
          token,
          user: { id: user.id, name: user.name, type: user.type },
        });
      });
    } catch (err) {
      errorLogger.error(err);
      next(err);
    }
  })(req, res);
};
