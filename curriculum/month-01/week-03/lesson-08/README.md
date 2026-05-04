# Lesson 3.2: Array Methods & Functional Programming

## Learning Objectives
- Implement core array methods from scratch
- Chain array operations efficiently
- Understand lazy evaluation with generators
- Build a functional query DSL

## The Problem

You're building a data query engine for an analytics dashboard. Users need to filter, transform, and aggregate large datasets efficiently.

## Requirements

### Task 1: Implement Array Methods
Implement `map`, `filter`, `reduce`, `find`, `some`, `every` from scratch.

### Task 2: Query Builder
Implement a chainable query interface:
```javascript
query(data)
  .where(user => user.age > 18)
  .select(user => ({ name: user.name, age: user.age }))
  .orderBy('age', 'desc')
  .take(10)
  .execute()
```

### Task 3: Lazy Evaluation
Implement lazy chains that only compute when `.execute()` is called.

## Production Context

Array operations in production:
- Database query builders (MongoDB aggregation)
- Data transformation pipelines
- Analytics dashboards
- CSV/JSON data processing

## Hints

<details>
<summary>Hint 1: Method Implementation</summary>
Don't use built-in methods in your implementation. Use for loops.
</details>

<details>
<summary>Hint 2: Chaining</summary>
Return a new Query instance after each operation. Store operations as functions in an array.
</details>

## Commands
```bash
js-forge run month-01/week-03/lesson-08
js-forge test month-01/week-03/lesson-08
js-forge submit month-01/week-03/lesson-08
```
