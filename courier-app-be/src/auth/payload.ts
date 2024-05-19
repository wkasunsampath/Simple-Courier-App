import jwt from "jsonwebtoken";
import { User } from "../db/models/User";

export const generateToken = (user: User) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.type,
    },
    process.env.APP_KEY ?? "",
    { expiresIn: "7d" }
  );
};
