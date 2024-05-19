import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/UnauthorizedException";
import { AuthRequest } from "../../types/interfaces";
import { UserType } from "../../types/emums";

const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    if ((req as AuthRequest).user?.type === UserType.USER) {
      next();
    } else {
      throw new UnauthorizedException();
    }
  } catch (e) {
    next(e);
  }
};

export default UserMiddleware;
