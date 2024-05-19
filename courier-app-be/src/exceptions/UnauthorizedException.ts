import { StatusCodes } from "http-status-codes";
import { BaseResponseError } from "./BaseResponseError";

export class UnauthorizedException extends BaseResponseError {
  constructor() {
    super(StatusCodes.UNAUTHORIZED, "Unauthorized");
  }
}
