export class BaseResponseError extends Error {
  constructor(
    public statusCode: number,
    message?: string
  ) {
    super(message);
  }
}
