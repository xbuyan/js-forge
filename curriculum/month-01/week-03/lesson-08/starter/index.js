/**
 * Lesson 3.2: Array Methods & Functional Programming
 * 
 * Build a functional query engine.
 */

class QueryEngine {
  /**
   * Task 1: Implement array methods from scratch
   */
  myMap(array, callback) {
    // TODO: Implement map without using Array.prototype.map
    throw new Error('Not implemented');
  }

  myFilter(array, predicate) {
    // TODO: Implement filter without using Array.prototype.filter
    throw new Error('Not implemented');
  }

  myReduce(array, reducer, initialValue) {
    // TODO: Implement reduce without using Array.prototype.reduce
    throw new Error('Not implemented');
  }

  myFind(array, predicate) {
    // TODO: Implement find
    throw new Error('Not implemented');
  }

  mySome(array, predicate) {
    // TODO: Implement some
    throw new Error('Not implemented');
  }

  myEvery(array, predicate) {
    // TODO: Implement every
    throw new Error('Not implemented');
  }

  /**
   * Task 2: Create chainable query
   * @param {Array} data
   * @returns {Query}
   */
  query(data) {
    // TODO: Return chainable query object
    throw new Error('Not implemented');
  }
}

// Query class for chaining
class Query {
  constructor(data) {
    this.data = data;
    this.operations = [];
  }

  where(predicate) {
    // TODO: Add filter operation
    throw new Error('Not implemented');
  }

  select(transform) {
    // TODO: Add map operation
    throw new Error('Not implemented');
  }

  orderBy(field, direction = 'asc') {
    // TODO: Add sort operation
    throw new Error('Not implemented');
  }

  take(count) {
    // TODO: Add limit operation
    throw new Error('Not implemented');
  }

  execute() {
    // TODO: Apply all operations lazily
    throw new Error('Not implemented');
  }
}

module.exports = { QueryEngine, Query };
