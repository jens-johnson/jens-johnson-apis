import { ApiError, ValidationError } from '@/common/error';

/**
 * Constructs an API GW response
 *
 * @param {Object} body - Response body
 * @param {number} statusCode - HTTP status code (default 200)
 * @param {Object} headers - Optional additional response headers
 * @return {Object} - The API GW response
 */
export function toResponse(body, statusCode=200, headers) {
  return {
    statusCode,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };
}

/**
 * Converts an Error to an API GW response
 *
 * @param {Error} error - The generated error
 * @param {Object} headers - Optional additional headers
 * @return {Object} - The API GW response
 */
export function toErrorResponse(error, headers) {
  if (error instanceof ValidationError) {
    console.log('Yes', error.statusCode);
    return toResponse({
      message: 'Invalid request',
      description: error.message,
      errors: error.errors
    }, error.statusCode || 400, headers);
  } else if (error instanceof ApiError) {
    return toResponse({
      message: 'API Error',
      description: error.message,
      cause: error.cause
    }, error.statusCode || 500, headers);
  } else {
    return toResponse({
      message: 'Internal server error',
      description: error.message
    }, error.statusCode || 500, headers);
  }
}