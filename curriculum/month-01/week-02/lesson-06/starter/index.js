/**
 * Lesson 2.3: Closures & Lexical Scoping
 * 
 * Build a widget library with private state.
 */

class WidgetFactory {
  /**
   * Task 1: Create a counter with private state
   * @returns {Object} - { increment, decrement, getValue, getHistory }
   */
  createCounter() {
    // TODO: Use closure for private count and history
    throw new Error('Not implemented');
  }

  /**
   * Task 2: Create event handler with context and debounce
   * @param {Object} context
   * @param {number} delay - debounce delay in ms
   * @returns {Function}
   */
  createHandler(context, delay = 0) {
    // TODO: Return function that maintains context and debounces
    throw new Error('Not implemented');
  }

  /**
   * Task 3: Create widget with module pattern
   * @param {Object} config
   * @returns {Object} - Public API
   */
  createWidget(config) {
    // TODO: Private state, public methods, method chaining
    throw new Error('Not implemented');
  }
}

module.exports = { WidgetFactory };
