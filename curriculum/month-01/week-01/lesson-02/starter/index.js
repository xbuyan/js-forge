/**
 * Lesson 1.2: Data Types & Type Coercion
 * 
 * Build a type-safe data validation utility.
 */

class TypeGuard {
  /**
   * Task 1: Safely convert a value to a target type
   * @param {any} value - The value to convert
   * @param {string} targetType - 'number', 'boolean', 'string', 'date'
   * @returns {{success: boolean, value?: any, error?: string}}
   */
  safeConvert(value, targetType) {
    // TODO: Implement safe conversion
    // Rules:
    // - 'number': Parse floats, reject NaN, Infinity is acceptable
    // - 'boolean': "true"/"false" strings, 0/1, reject others
    // - 'string': Always succeeds
    // - 'date': ISO strings, timestamps, reject invalid dates
    throw new Error('Not implemented');
  }

  /**
   * Task 2: Accurate type detection
   * @param {any} value
   * @returns {string} - 'null', 'array', 'nan', 'infinity', 'date', 'regexp', 
   *                     'string', 'number', 'boolean', 'undefined', 'object', 'function', 'symbol', 'bigint'
   */
  detectType(value) {
    // TODO: Implement better typeof
    // Must handle all edge cases that typeof gets wrong
    throw new Error('Not implemented');
  }

  /**
   * Task 3: Predict coercion outcomes
   * @param {any} a
   * @param {any} b  
   * @param {string} operator - '+', '-', '==', '===', '<', '>'
   * @returns {{result: any, coercionPath: string[]}}
   */
  predictCoercion(a, b, operator) {
    // TODO: Predict what JavaScript will do
    // Return the actual result AND the steps JavaScript takes
    // Example: predictCoercion("5", 3, "+") → { result: "53", coercionPath: ["number 3 → string "3"", "string concatenation"] }
    throw new Error('Not implemented');
  }

  /**
   * Task 4: Validate form data
   * @param {Object} data - Key-value pairs of string inputs
   * @param {Object} schema - { field: { type, required, validator } }
   * @returns {{valid: boolean, errors: Object, converted: Object}}
   */
  validateForm(data, schema) {
    // TODO: Use safeConvert to validate and convert form data
    // Return converted values if valid, detailed errors if not
    throw new Error('Not implemented');
  }
}

// Export for testing
module.exports = { TypeGuard };
