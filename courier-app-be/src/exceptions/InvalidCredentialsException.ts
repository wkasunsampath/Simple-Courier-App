import { StatusCodes } from "http-status-codes";
import { BaseResponseError } from "./BaseResponseError";

export class InvalidCredentialsException extends BaseResponseError {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }
}
