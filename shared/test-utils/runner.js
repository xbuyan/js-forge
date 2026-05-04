#!/usr/bin/env node
/**
 * JS Forge Test Runner
 * Runs tests for a given lesson starter against test specs
 */

const fs = require('fs');
const path = require('path');

// Simple test framework
class TestSuite {
  constructor(name) {
    this.name = name;
    this.tests = [];
    this.beforeEachFn = null;
    this.afterEachFn = null;
  }

  beforeEach(fn) {
    this.beforeEachFn = fn;
  }

  afterEach(fn) {
    this.afterEachFn = fn;
  }

  it(description, fn) {
    this.tests.push({ description, fn });
  }

  async run() {
    let passed = 0;
    let failed = 0;
    const errors = [];

    console.log(`\n📦 ${this.name}`);
    console.log('─'.repeat(50));

    for (const test of this.tests) {
      try {
        if (this.beforeEachFn) await this.beforeEachFn();
        await test.fn();
        if (this.afterEachFn) await this.afterEachFn();

        console.log(`  ✅ ${test.description}`);
        passed++;
      } catch (error) {
        console.log(`  ❌ ${test.description}`);
        console.log(`     ${error.message}`);
        failed++;
        errors.push({ test: test.description, error: error.message });
      }
    }

    return { passed, failed, total: this.tests.length, errors };
  }
}

// Assertion library
const assert = {
  equal(actual, expected, message) {
    if (actual !== expected) {
      throw new Error(
        message || `Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`
      );
    }
  },

  deepEqual(actual, expected, message) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr !== expectedStr) {
      throw new Error(
        message || `Expected ${expectedStr}, got ${actualStr}`
      );
    }
  },

  true(value, message) {
    if (value !== true) {
      throw new Error(message || `Expected true, got ${JSON.stringify(value)}`);
    }
  },

  false(value, message) {
    if (value !== false) {
      throw new Error(message || `Expected false, got ${JSON.stringify(value)}`);
    }
  },

  throws(fn, message) {
    let threw = false;
    try {
      fn();
    } catch (e) {
      threw = true;
    }
    if (!threw) {
      throw new Error(message || 'Expected function to throw');
    }
  },

  includes(haystack, needle, message) {
    if (!haystack.includes(needle)) {
      throw new Error(
        message || `Expected ${JSON.stringify(haystack)} to include ${JSON.stringify(needle)}`
      );
    }
  },

  type(value, expectedType, message) {
    const actualType = typeof value;
    if (actualType !== expectedType) {
      throw new Error(
        message || `Expected type '${expectedType}', got '${actualType}'`
      );
    }
  },

  instance(value, constructor, message) {
    if (!(value instanceof constructor)) {
      throw new Error(
        message || `Expected instance of ${constructor.name}`
      );
    }
  }
};

// Global test utilities
global.describe = (name, fn) => {
  const suite = new TestSuite(name);
  global.it = suite.it.bind(suite);
  global.beforeEach = suite.beforeEach.bind(suite);
  global.afterEach = suite.afterEach.bind(suite);
  global.expect = (actual) => ({
    toBe: (expected) => assert.equal(actual, expected),
    toEqual: (expected) => assert.deepEqual(actual, expected),
    toBeTruthy: () => assert.true(!!actual),
    toBeFalsy: () => assert.false(!!actual),
    toThrow: () => assert.throws(actual),
    toContain: (expected) => assert.includes(actual, expected),
    toBeType: (expected) => assert.type(actual, expected),
    toBeInstanceOf: (expected) => assert.instance(actual, expected),
  });

  fn();

  // Run the suite
  suite.run().then(results => {
    console.log('─'.repeat(50));
    console.log(`Results: ${results.passed}/${results.total} passed`);
    if (results.failed > 0) {
      console.log(`         ${results.failed} failed`);
      process.exit(1);
    }
  }).catch(err => {
    console.error('Test runner error:', err);
    process.exit(1);
  });
};

// Main execution
const [,, starterPath, testPath] = process.argv;

if (!starterPath || !testPath) {
  console.error('Usage: node runner.js <starter-path> <test-path>');
  process.exit(1);
}

// Load the student's solution
const absoluteStarter = path.resolve(starterPath);
if (fs.existsSync(absoluteStarter)) {
  try {
    require(absoluteStarter);
  } catch (err) {
    console.error(`❌ Error loading starter: ${err.message}`);
    process.exit(1);
  }
} else {
  console.error(`❌ Starter file not found: ${absoluteStarter}`);
  process.exit(1);
}

// Run the tests
const absoluteTest = path.resolve(testPath);
if (fs.existsSync(absoluteTest)) {
  try {
    require(absoluteTest);
  } catch (err) {
    console.error(`❌ Error running tests: ${err.message}`);
    process.exit(1);
  }
} else {
  console.error(`❌ Test file not found: ${absoluteTest}`);
  process.exit(1);
}
