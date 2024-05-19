import bcrypt from "bcrypt";
import { User } from "../db/models/User";
import db from "../db";

export const register = async (userData) => {
  const { password, ...rest } = userData;
  return db.manager.save(
    db.manager.create(User, {
      ...rest,
      password: await bcrypt.hash(password, 10),
    })
  );
};
