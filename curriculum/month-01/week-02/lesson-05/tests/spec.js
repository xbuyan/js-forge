/**
 * Tests for Lesson 2.2: Functions & Scope
 */

const { PipelineBuilder } = require('../../starter/index.js');

describe('Lesson 2.2: PipelineBuilder', () => {
  let builder;

  beforeEach(() => {
    builder = new PipelineBuilder();
  });

  it('should compose functions in pipeline', () => {
    const pipeline = builder.createPipeline(
      x => x + 1,
      x => x * 2,
      x => x - 3
    );
    expect(pipeline(5)).toBe(9); // (5+1)*2-3 = 9
  });

  it('should stop pipeline on null', () => {
    const pipeline = builder.createPipeline(
      x => x > 10 ? null : x,
      x => x * 2
    );
    expect(pipeline(5)).toBe(10);
    expect(pipeline(15)).toBe(null);
  });

  it('should memoize function results', () => {
    let calls = 0;
    const expensive = builder.memoize((x) => {
      calls++;
      return x * 2;
    }, { maxSize: 3 });

    expect(expensive(5)).toBe(10);
    expect(expensive(5)).toBe(10);
    expect(calls).toBe(1);
  });

  it('should curry a function', () => {
    const add = (a, b, c) => a + b + c;
    const curried = builder.curry(add);

    expect(curried(1)(2)(3)).toBe(6);
    expect(curried(1, 2)(3)).toBe(6);
  });

  it('should partially apply arguments', () => {
    const multiply = (a, b, c) => a * b * c;
    const double = builder.partial(multiply, 2);

    expect(double(3, 4)).toBe(24);
  });
});
