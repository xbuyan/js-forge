/**
 * Tests for Lesson 1.3: Type Conversion & Validation
 */

const { SafeConfigLoader } = require('../../starter/index.js');

describe('Lesson 1.3: SafeConfigLoader', () => {
  let loader;

  beforeEach(() => {
    loader = new SafeConfigLoader();
  });

  it('should parse numbers correctly', () => {
    expect(loader.parseValue('42', 'number').value).toBe(42);
    expect(loader.parseValue('3.14', 'number').value).toBe(3.14);
    expect(loader.parseValue('1e5', 'number').value).toBe(100000);
  });

  it('should reject invalid numbers', () => {
    expect(loader.parseValue('not-a-number', 'number').success).toBe(false);
    expect(loader.parseValue('', 'number').success).toBe(false);
  });

  it('should parse booleans strictly', () => {
    expect(loader.parseValue('true', 'boolean').value).toBe(true);
    expect(loader.parseValue('FALSE', 'boolean').value).toBe(false);
    expect(loader.parseValue('1', 'boolean').success).toBe(false);
    expect(loader.parseValue('yes', 'boolean').success).toBe(false);
  });

  it('should parse arrays', () => {
    const result = loader.parseValue('a,b,c', 'array');
    expect(result.success).toBe(true);
    expect(result.value).toEqual(['a', 'b', 'c']);
  });

  it('should parse dates', () => {
    const result = loader.parseValue('2024-01-15', 'date');
    expect(result.success).toBe(true);
    expect(result.value instanceof Date).toBe(true);
  });

  it('should validate constraints', () => {
    const result = loader.validateConstraints(50, {
      type: 'number',
      min: 0,
      max: 100
    });
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('should fail constraint validation', () => {
    const result = loader.validateConstraints(150, {
      type: 'number',
      min: 0,
      max: 100
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should prevent prototype pollution', () => {
    const malicious = '{"__proto__": {"isAdmin": true}}';
    const result = loader.safeJSONParse(malicious);
    expect(result.success).toBe(true);

    const obj = {};
    expect(obj.isAdmin).toBe(undefined);
  });

  it('should load and validate config', () => {
    const sources = {
      env: { PORT: '3000', DEBUG: 'true' },
      json: { name: 'my-app' }
    };

    const schema = {
      PORT: { type: 'number', min: 1024, max: 65535 },
      DEBUG: { type: 'boolean' },
      name: { type: 'string', required: true }
    };

    const result = loader.loadConfig(sources, schema);
    expect(result.errors).toBeType('object');
    expect(Object.keys(result.errors).length).toBe(0);
    expect(result.config.PORT).toBe(3000);
    expect(result.config.DEBUG).toBe(true);
  });
});
