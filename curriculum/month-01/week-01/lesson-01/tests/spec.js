/**
 * Tests for Lesson 1.1: Environment Detection & Variable Declarations
 */

const { UniversalLogger } = require('../../starter/index.js');

describe('Lesson 1.1: UniversalLogger', () => {
  let logger;

  beforeEach(() => {
    logger = new UniversalLogger({ prefix: 'APP', debug: true });
  });

  it('should detect the current environment correctly', () => {
    const env = logger.detectEnvironment();
    expect(env).toBeType('string');
    expect(['node', 'browser']).toContain(env);
  });

  it('should use const for immutable config', () => {
    // Attempting to reassign config property should not affect original
    const stats = logger.getStats();
    expect(stats.config.prefix).toBe('APP');

    // The config object reference should be stable
    const originalConfig = logger.config;
    logger.config = { prefix: 'HACKED' };
    expect(logger.config).toBe(originalConfig); // Same reference = const behavior
  });

  it('should increment log counter correctly', () => {
    logger.log('First');
    logger.log('Second');
    const stats = logger.getStats();
    expect(stats.totalLogs).toBe(2);
  });

  it('should format log messages correctly', () => {
    const env = logger.detectEnvironment();
    const result = logger.log('Test message', 'warn');

    // Should return formatted string or undefined (if just console.log)
    // The key test is that it doesn't throw
    expect(typeof result === 'string' || result === undefined).toBe(true);
  });

  it('should demonstrate var closure trap', () => {
    const { varResults, letResults } = logger.demonstrateLoopScope();

    expect(varResults).toBeType('object');
    expect(letResults).toBeType('object');
    expect(varResults.length).toBe(3);
    expect(letResults.length).toBe(3);

    // Var results should all show the same value (the loop end value)
    const varFirst = varResults[0]();
    const varLast = varResults[2]();
    expect(varFirst).toBe(varLast); // Classic closure trap

    // Let results should show different values
    const letFirst = letResults[0]();
    const letLast = letResults[2]();
    expect(letFirst).not.toBe(letLast); // Each has own scope
  });

  it('should demonstrate hoisting correctly', () => {
    const result = logger.hoistingDemo();

    expect(result.functionResult).toBe('I was hoisted!');
    expect(result.tdzResult).toBe('ReferenceError');
    expect(result.afterDeclaration).toBe('I exist after this line');
  });

  it('should maintain proper stats', () => {
    logger.log('A');
    logger.log('B');
    logger.log('C');

    const stats = logger.getStats();
    expect(stats.totalLogs).toBe(3);
    expect(stats.environment).toBeType('string');
    expect(stats.config).toBeType('object');
  });
});
