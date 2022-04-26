import { mapValues } from 'lodash';
import { ApiError } from '@/common/error';
import { SCHEMAS, validate } from '@/common/validations';
import { toErrorResponse, toResponse } from '@/handlers/response';

/**
 * Validates request body using AJV
 *
 * @param {Object} requestBody
 * @return {Promise<Object, ValidationError>}
 */
function validateRequest(requestBody) {
  return validate(SCHEMAS.REQUESTS.TEST.POST, requestBody);
}

/**
 * Transforms request body to construct a response body
 *
 * @param {{ stringType: string, numberType: number, objectType: Object, booleanType: boolean, arrayType: Array }} requestBody
 * @return {Promise<{timestamp: string, arrayType: Array, numberType: number, booleanType: boolean, stringType: string, timestamp: string, objectType: Object}>}
 */
function constructResponse(requestBody) {
  return Promise.resolve({
    timestamp: new Date().toISOString(),
    stringType: requestBody.stringType.toUpperCase().replace(/ /g, '_'),
    numberType: requestBody.numberType * 10,
    objectType: mapValues(requestBody.objectType, obj => `${obj instanceof Object ? "Keys: " + Object.keys(obj).join(', ') : "Values: " + obj}`),
    booleanType: !requestBody.booleanType,
    arrayType: requestBody.arrayType.map(k => k.toUpperCase().replace(/ /g, '_'))
  });
}

/**
 * Plucks request body from the API GW event
 *
 * @param {Object} event - API GW event
 * @return {Promise<Object,ApiError>}
 */
function parseRequest(event) {
  return event.body
    ? Promise.resolve(JSON.parse(event.body))
    : Promise.reject(new ApiError('Unable to parse request – No request body provided', 400));
}

exports.handler = (event) => {
  return Promise.resolve(event)
    .then(parseRequest)
    .then(validateRequest)
    .then(constructResponse)
    .then(toResponse)
    .catch(toErrorResponse);
};
