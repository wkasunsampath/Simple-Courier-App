import { StatusCodes } from "http-status-codes";
import { BaseResponseError } from "./BaseResponseError";

export class DataValidationException extends BaseResponseError {
  constructor(message?: string) {
    super(StatusCodes.UNPROCESSABLE_ENTITY, message ?? "Invalid data");
  }
}
