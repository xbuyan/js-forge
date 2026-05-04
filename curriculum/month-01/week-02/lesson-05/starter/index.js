/**
 * Lesson 2.2: Functions & Scope
 * 
 * Build a composable data processing pipeline.
 */

class PipelineBuilder {
  /**
   * Task 1: Create a composable pipeline
   * @param {...Function} functions
   * @returns {Function} - Composed pipeline
   */
  createPipeline(...functions) {
    // TODO: Compose functions left-to-right
    // If any function returns null, pipeline should stop and return null
    throw new Error('Not implemented');
  }

  /**
   * Task 2: Memoize a function
   * @param {Function} fn
   * @param {Object} options - { maxSize, ttl, keyGenerator }
   * @returns {Function}
   */
  memoize(fn, options = {}) {
    // TODO: Implement LRU cache with TTL
    throw new Error('Not implemented');
  }

  /**
   * Task 3: Curry a function
   * @param {Function} fn
   * @returns {Function}
   */
  curry(fn) {
    // TODO: Implement currying
    throw new Error('Not implemented');
  }

  /**
   * Task 4: Partial application
   * @param {Function} fn
   * @param {...any} args
   * @returns {Function}
   */
  partial(fn, ...args) {
    // TODO: Implement partial application
    throw new Error('Not implemented');
  }
}

module.exports = { PipelineBuilder };
