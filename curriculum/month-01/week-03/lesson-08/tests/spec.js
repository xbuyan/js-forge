/**
 * Tests for Lesson 3.2: Array Methods & Functional Programming
 */

const { QueryEngine } = require('../../starter/index.js');

describe('Lesson 3.2: QueryEngine', () => {
  let engine;
  const users = [
    { name: 'Alice', age: 25, role: 'admin' },
    { name: 'Bob', age: 17, role: 'user' },
    { name: 'Charlie', age: 30, role: 'user' },
    { name: 'Diana', age: 22, role: 'admin' },
  ];

  beforeEach(() => {
    engine = new QueryEngine();
  });

  it('should implement myMap', () => {
    const result = engine.myMap([1, 2, 3], x => x * 2);
    expect(result).toEqual([2, 4, 6]);
  });

  it('should implement myFilter', () => {
    const result = engine.myFilter([1, 2, 3, 4, 5], x => x > 2);
    expect(result).toEqual([3, 4, 5]);
  });

  it('should implement myReduce', () => {
    const result = engine.myReduce([1, 2, 3, 4], (sum, x) => sum + x, 0);
    expect(result).toBe(10);
  });

  it('should implement myFind', () => {
    const result = engine.myFind(users, u => u.name === 'Charlie');
    expect(result.age).toBe(30);
  });

  it('should implement mySome', () => {
    expect(engine.mySome(users, u => u.age > 25)).toBe(true);
    expect(engine.mySome(users, u => u.age > 50)).toBe(false);
  });

  it('should implement myEvery', () => {
    expect(engine.myEvery(users, u => u.age > 15)).toBe(true);
    expect(engine.myEvery(users, u => u.age > 20)).toBe(false);
  });

  it('should create chainable queries', () => {
    const result = engine.query(users)
      .where(u => u.age >= 18)
      .select(u => ({ name: u.name, age: u.age }))
      .orderBy('age', 'desc')
      .take(2)
      .execute();

    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Charlie');
    expect(result[0].age).toBe(30);
  });

  it('should support lazy evaluation', () => {
    let filterCalls = 0;
    const query = engine.query([1, 2, 3, 4, 5])
      .where(x => { filterCalls++; return x > 2; })
      .take(2);

    // Before execute, filter should not have been called
    expect(filterCalls).toBe(0);

    const result = query.execute();
    expect(result).toEqual([3, 4]);
    expect(filterCalls).toBeGreaterThan(0);
  });
});
