/**
 * Lesson 3.1: Object Mastery & this Binding
 * 
 * Master this binding in all contexts.
 */

class ThisMaster {
  /**
   * Task 1: Demonstrate all this binding rules
   * @returns {Object} - Results from each binding type
   */
  demonstrateThis() {
    // TODO: Show default, implicit, explicit, new, and arrow binding
    throw new Error('Not implemented');
  }

  /**
   * Task 2: Borrow a method from one object to another
   * @param {Object} source
   * @param {string} methodName
   * @param {Object} target
   * @returns {any}
   */
  borrowMethod(source, methodName, target) {
    // TODO: Safely borrow and execute method with target as context
    throw new Error('Not implemented');
  }

  /**
   * Task 3: Create entity using factory pattern
   * @param {string} type
   * @param {Object} props
   * @returns {Object}
   */
  createEntityFactory(type, props) {
    // TODO: Factory pattern implementation
    throw new Error('Not implemented');
  }

  /**
   * Task 4: Create entity using constructor pattern
   * @param {string} type
   * @param {Object} props
   */
  EntityConstructor(type, props) {
    // TODO: Constructor pattern - attach to this
    throw new Error('Not implemented');
  }
}

module.exports = { ThisMaster };
