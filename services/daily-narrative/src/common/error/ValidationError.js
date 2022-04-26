import ApiError from './ApiError';

export default class ValidationError extends ApiError {
  constructor(errors, message = undefined) {
    super(message || 'API Validation Error', 400);
    this.errors = errors;
  }
}