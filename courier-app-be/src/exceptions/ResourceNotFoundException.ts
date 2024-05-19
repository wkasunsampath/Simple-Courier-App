import { StatusCodes } from "http-status-codes";
import { BaseResponseError } from "./BaseResponseError";

export class ResourceNotFoundException extends BaseResponseError {
  constructor(message?: string) {
    super(StatusCodes.NOT_FOUND, message ?? "Resource not found");
  }
}
