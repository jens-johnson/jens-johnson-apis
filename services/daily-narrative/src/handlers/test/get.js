import { ApiError } from '@/common/error';
import { SCHEMAS, validate } from '@/common/validations';
import { createHashMapping } from '@/common/cryptography';
import { toErrorResponse, toResponse } from '@/handlers/response';

/**
 * Parses request to extract query string params
 * @param {Object} event - API GW event
 * @return {Promise<Object, ApiError>}
 */
function parseRequest(event) {
  return event.queryStringParameters
    ? Promise.resolve(event.queryStringParameters)
    : Promise.reject(new ApiError('Unable to parse request – no query string provided', 400));
}

/**
 * Validates request for query string params
 *
 * @param {Object} queryStringParameters
 * @return {Promise<Object, ApiError|ValidationError>}
 */
function validateRequest(queryStringParameters) {
  return validate(SCHEMAS.REQUESTS.TEST.GET, { ...queryStringParameters, values: JSON.parse(queryStringParameters.values) });
}

/**
 * Creates hash mapping of query params for a response
 *
 * @param {Object} queryStringParameters - Query params containing secret key and values
 * @return {Object} - The response body
 */
function constructResponse(queryStringParameters) {
  return {
    hashMap: createHashMapping(queryStringParameters.secretKey, queryStringParameters.values),
    timestamp: new Date().toISOString()
  }
}

exports.handler = (event) => {
  return Promise.resolve(event)
    .then(parseRequest)
    .then(validateRequest)
    .then(constructResponse)
    .then(toResponse)
    .catch(toErrorResponse);
};
