import { createHash } from 'crypto';

/**
 * Creates a hash mapping of an array of values using a secret key
 *
 * @param {*} secretKey - The secret key to generate a hash
 * @param {string[]} values - Values to map over
 * @return {{mapping: string, value: *}[]} - The generated mappings
 */
export function createHashMapping(secretKey, values) {
  const ALGORITHM = 'sha256';
  return values.map(value => {
    const hash = createHash(ALGORITHM, secretKey);
    hash.update(value);
    return {
      value,
      mapping: hash.digest('hex')
    }
  });
}
