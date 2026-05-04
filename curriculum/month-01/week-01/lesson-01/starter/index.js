/**
 * Lesson 1.1: Environment Detection & Variable Declarations
 * 
 * Complete the UniversalLogger class below.
 */

class UniversalLogger {
  constructor(config) {
    // TODO: Use the correct declaration type for config
    // This should be immutable after construction
    this.config = config;

    // TODO: Initialize log counter with correct declaration
    this.logCount = 0;
  }

  /**
   * Task 1: Detect the runtime environment
   * @returns {'node' | 'browser'}
   */
  detectEnvironment() {
    // TODO: Implement environment detection
    // Check for Node.js specific globals vs Browser globals
    throw new Error('Not implemented');
  }

  /**
   * Task 2: Log a message with proper formatting
   * Uses the detected environment for context
   */
  log(message, level = 'info') {
    // TODO: Increment log counter
    // TODO: Format: [ENVIRONMENT] [LEVEL] [COUNT]: message
    // Example: [node] [info] [1]: Server started
    throw new Error('Not implemented');
  }

  /**
   * Task 3: Demonstrate var vs let in loops
   * This function should show the classic closure-in-loop problem
   * and its modern solution
   */
  demonstrateLoopScope() {
    const results = [];

    // TODO: Create a loop using VAR that demonstrates the closure trap
    // The classic problem: all callbacks log the same final value

    // TODO: Create a loop using LET that solves it
    // Each callback should capture its own iteration value

    return {
      varResults: [], // Fill with 3 callbacks that when called, show the bug
      letResults: []  // Fill with 3 callbacks that work correctly
    };
  }

  /**
   * Task 4: Hoisting demonstration
   * Show that function declarations are hoisted but let/const are not
   */
  hoistingDemo() {
    // TODO: Call a function BEFORE its declaration (this should work)
    const functionResult = hoistedFunction();

    // TODO: Try to access a let/const variable before declaration
    // This should throw a ReferenceError in the Temporal Dead Zone
    let tdzResult;
    try {
      // Your TDZ access here
      tdzResult = 'should fail';
    } catch (e) {
      tdzResult = e.name;
    }

    // Variable declaration (must be AFTER the TDZ attempt)
    const afterDeclaration = 'I exist after this line';

    function hoistedFunction() {
      return 'I was hoisted!';
    }

    return {
      functionResult,
      tdzResult,
      afterDeclaration
    };
  }

  getStats() {
    return {
      environment: this.detectEnvironment(),
      totalLogs: this.logCount,
      config: this.config
    };
  }
}

// Export for testing
module.exports = { UniversalLogger };
