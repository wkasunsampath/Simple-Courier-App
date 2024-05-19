import { Request } from "express";
import { User } from "../src/db/models/User";

export interface AuthRequest extends Request {
  user: User;
}
