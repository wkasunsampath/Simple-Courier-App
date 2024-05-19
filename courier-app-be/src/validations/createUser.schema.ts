import Joi from "joi";
import db from "../db";
import { User } from "../db/models/User";
import { DataValidationException } from "../exceptions/DataValidationException";

const createUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email()
    .required()
    .external(async (value) => {
      const sameEmailUser = await db.manager.findOneBy(User, { email: value });
      if (sameEmailUser) {
        throw new DataValidationException("Email address is already in use.");
      }
      return value;
    }),
  password: Joi.string().required(),
  repeatPassword: Joi.ref("password"),
  mobile: Joi.number().required(),
  address: Joi.string().required(),
}).with("password", "repeatPassword");

export default createUserSchema;
