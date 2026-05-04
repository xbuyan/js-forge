/**
 * Tests for Lesson 3.1: Object Mastery & this Binding
 */

const { ThisMaster } = require('../../starter/index.js');

describe('Lesson 3.1: ThisMaster', () => {
  let master;

  beforeEach(() => {
    master = new ThisMaster();
  });

  it('should demonstrate default binding', () => {
    const result = master.demonstrateThis();
    expect(result.defaultBinding).toBeType('string');
  });

  it('should demonstrate implicit binding', () => {
    const result = master.demonstrateThis();
    expect(result.implicitBinding).toBeType('object');
  });

  it('should demonstrate explicit binding', () => {
    const result = master.demonstrateThis();
    expect(result.explicitBinding).toBe('explicit-context');
  });

  it('should demonstrate new binding', () => {
    const result = master.demonstrateThis();
    expect(result.newBinding).toBeType('object');
    expect(result.newBinding.type).toBe('new-bound');
  });

  it('should demonstrate arrow function binding', () => {
    const result = master.demonstrateThis();
    expect(result.arrowBinding).toBeType('string');
  });

  it('should borrow methods between objects', () => {
    const source = {
      name: 'source',
      greet() { return `Hello from ${this.name}`; }
    };

    const target = { name: 'target' };
    const result = master.borrowMethod(source, 'greet', target);

    expect(result).toBe('Hello from target');
  });

  it('should handle missing methods gracefully', () => {
    const source = { name: 'source' };
    const target = { name: 'target' };

    expect(() => master.borrowMethod(source, 'nonexistent', target)).toThrow();
  });

  it('should create entities with factory', () => {
    const entity = master.createEntityFactory('player', { health: 100 });
    expect(entity.type).toBe('player');
    expect(entity.health).toBe(100);
    expect(entity.greet).toBeType('function');
  });

  it('should create entities with constructor', () => {
    const entity = new master.EntityConstructor('enemy', { damage: 50 });
    expect(entity.type).toBe('enemy');
    expect(entity.damage).toBe(50);
  });
});
