/**
 * Tests for Lesson 2.3: Closures & Lexical Scoping
 */

const { WidgetFactory } = require('../../starter/index.js');

describe('Lesson 2.3: WidgetFactory', () => {
  let factory;

  beforeEach(() => {
    factory = new WidgetFactory();
  });

  it('should create counter with private state', () => {
    const counter = factory.createCounter();

    counter.increment();
    counter.increment();
    expect(counter.getValue()).toBe(2);

    counter.decrement();
    expect(counter.getValue()).toBe(1);
  });

  it('should maintain history', () => {
    const counter = factory.createCounter();
    counter.increment();
    counter.increment();
    counter.decrement();

    const history = counter.getHistory();
    expect(history).toEqual([0, 1, 2, 1]);
  });

  it('should not expose private state', () => {
    const counter = factory.createCounter();
    expect(counter.count).toBe(undefined);
    expect(counter.history).toBe(undefined);
  });

  it('should debounce handler', (done) => {
    let calls = 0;
    const handler = factory.createHandler({ name: 'test' }, 50);

    handler(() => calls++);
    handler(() => calls++);
    handler(() => calls++);

    expect(calls).toBe(0);

    setTimeout(() => {
      expect(calls).toBe(1);
      done();
    }, 100);
  });

  it('should create widget with chaining', () => {
    const widget = factory.createWidget({ id: 'w1', color: 'blue' });

    const result = widget
      .setColor('red')
      .setSize('large')
      .render();

    expect(result).toBeType('string');
    expect(result.includes('red')).toBe(true);
    expect(result.includes('large')).toBe(true);
  });
});
