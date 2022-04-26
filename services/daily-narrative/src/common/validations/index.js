import Ajv from 'ajv';
import { ValidationError } from '@/common/error';
import schemas from './schemas';

const ajv = new Ajv();

/**
 * Mapping of schemas for validation
*/
export const SCHEMAS = {
  REQUESTS: {
    TEST: {
      POST: schemas.test.TestPostRequest,
      GET: schemas.test.TestGetRequest
    }
  }
};

/**
 * Validates a target object against a schema using AJV
 *
 * @param {Object} schema
 * @param {Object} target
 * @return {Promise<Object, ValidationError>}
 */
export function validate(schema, target) {
  const validation = ajv.compile(schema);
  const valid = validation(target);
  return valid
    ? Promise.resolve(target)
    : Promise.reject(new ValidationError(validation.errors));
}
