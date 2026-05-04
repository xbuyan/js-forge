/**
 * Lesson 1.3: Type Conversion & Validation
 * 
 * Build a safe configuration loader.
 */

class SafeConfigLoader {
  /**
   * Task 1: Safely parse a string value to a target type
   * @param {string} value - The string to parse
   * @param {string} type - 'number', 'boolean', 'array', 'object', 'date'
   * @returns {{success: boolean, value?: any, error?: string}}
   */
  parseValue(value, type) {
    // TODO: Implement safe parsing for each type
    throw new Error('Not implemented');
  }

  /**
   * Task 2: Validate value against constraints
   * @param {any} value
   * @param {Object} constraints
   * @returns {{valid: boolean, errors: string[]}}
   */
  validateConstraints(value, constraints) {
    // TODO: Check type, min, max, integer, pattern, enum
    throw new Error('Not implemented');
  }

  /**
   * Task 3: Safely parse JSON without prototype pollution
   * @param {string} str
   * @returns {{success: boolean, data?: any, error?: string}}
   */
  safeJSONParse(str) {
    // TODO: Use reviver to prevent __proto__, constructor, prototype
    // TODO: Detect circular references
    throw new Error('Not implemented');
  }

  /**
   * Task 4: Load and validate configuration from mixed sources
   * @param {Object} sources - { env: {}, json: {} }
   * @param {Object} schema
   * @returns {{config: Object, errors: Object}}
   */
  loadConfig(sources, schema) {
    // TODO: Parse env strings, merge with JSON, validate against schema
    throw new Error('Not implemented');
  }
}

module.exports = { SafeConfigLoader };
