# Lesson 2.2: Functions & Scope

## Learning Objectives
- Understand function declarations vs expressions vs arrows
- Master parameter handling (default, rest, destructuring)
- Implement higher-order functions
- Use IIFEs for encapsulation

## The Problem

You're building a data processing pipeline for an analytics dashboard. The pipeline needs to be composable, configurable, and type-safe.

## Requirements

### Task 1: Pipeline Builder
Implement `createPipeline(...functions)` that:
- Composes functions left-to-right
- Supports early termination via `null` return
- Handles async functions

### Task 2: Memoization
Implement `memoize(fn, options)` with:
- LRU cache with configurable size
- Custom key generator
- TTL (time-to-live) support

### Task 3: Curry & Partial
Implement `curry(fn)` and `partial(fn, ...args)` for functional composition.

## Production Context

Functional programming patterns in production:
- Data transformation pipelines
- Request middleware chains
- Event processing streams
- Computed property caching

## Hints

<details>
<summary>Hint 1: Pipeline</summary>
Use Array.prototype.reduce to pipe output of one function into the next.
</details>

<details>
<summary>Hint 2: Memoization Key</summary>
Use JSON.stringify(args) as default key, but allow custom resolver function.
</details>

## Commands
```bash
js-forge run month-01/week-02/lesson-05
js-forge test month-01/week-02/lesson-05
js-forge submit month-01/week-02/lesson-05
```
