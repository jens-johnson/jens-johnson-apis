export default class ApiError extends Error {
  constructor(message, statusCode, cause = {}) {
    super(`statusCode=${statusCode} message=${message}`);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.message = message;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;
