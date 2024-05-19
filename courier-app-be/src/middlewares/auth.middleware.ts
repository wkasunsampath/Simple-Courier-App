import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";
import db from "../db";
import { User } from "../db/models/User";

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, async (err: Error, user) => {
    try {
      if (err || !user) {
        throw new UnauthorizedException();
      }
      const fullUser = await db.manager.findOneBy(User, { id: user.id });
      if (fullUser) {
        req.user = fullUser;
        next();
      } else {
        throw new UnauthorizedException();
      }
    } catch (e) {
      next(e);
    }
  })(req, res);
};

export default AuthMiddleware;
