/**
 * Tests for Lesson 1.2: Data Types & Type Coercion
 */

const { TypeGuard } = require('../../starter/index.js');

describe('Lesson 1.2: TypeGuard', () => {
  let guard;

  beforeEach(() => {
    guard = new TypeGuard();
  });

  it('should safely convert strings to numbers', () => {
    const result = guard.safeConvert("42", 'number');
    expect(result.success).toBe(true);
    expect(result.value).toBe(42);
  });

  it('should reject invalid number conversions', () => {
    const result = guard.safeConvert("not-a-number", 'number');
    expect(result.success).toBe(false);
    expect(result.error).toBeType('string');
  });

  it('should detect arrays correctly', () => {
    expect(guard.detectType([])).toBe('array');
    expect(guard.detectType([1, 2, 3])).toBe('array');
  });

  it('should detect null correctly', () => {
    expect(guard.detectType(null)).toBe('null');
  });

  it('should detect NaN correctly', () => {
    expect(guard.detectType(NaN)).toBe('nan');
  });

  it('should detect Infinity', () => {
    expect(guard.detectType(Infinity)).toBe('infinity');
    expect(guard.detectType(-Infinity)).toBe('infinity');
  });

  it('should predict string + number coercion', () => {
    const prediction = guard.predictCoercion("5", 3, '+');
    expect(prediction.result).toBe('53');
    expect(prediction.coercionPath.length).toBeGreaterThan(0);
  });

  it('should predict == coercion between null and undefined', () => {
    const prediction = guard.predictCoercion(null, undefined, '==');
    expect(prediction.result).toBe(true);
  });

  it('should predict === does not coerce', () => {
    const prediction = guard.predictCoercion("5", 5, '===');
    expect(prediction.result).toBe(false);
    expect(prediction.coercionPath.length).toBe(0);
  });

  it('should validate form data against schema', () => {
    const data = {
      name: "John",
      age: "25",
      active: "true"
    };

    const schema = {
      name: { type: 'string', required: true },
      age: { type: 'number', required: true },
      active: { type: 'boolean', required: false }
    };

    const result = guard.validateForm(data, schema);
    expect(result.valid).toBe(true);
    expect(result.converted.age).toBe(25);
    expect(result.converted.active).toBe(true);
  });

  it('should reject invalid form data', () => {
    const data = {
      name: "",
      age: "not-a-number"
    };

    const schema = {
      name: { type: 'string', required: true },
      age: { type: 'number', required: true }
    };

    const result = guard.validateForm(data, schema);
    expect(result.valid).toBe(false);
    expect(Object.keys(result.errors).length).toBeGreaterThan(0);
  });
});
