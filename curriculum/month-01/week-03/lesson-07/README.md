# Lesson 3.1: Object Mastery & this Binding

## Learning Objectives
- Understand all `this` binding rules
- Use call, apply, bind effectively
- Implement method borrowing
- Create factory and constructor patterns

## The Problem

You're building a game engine where entities have methods that need to be borrowed, bound, and called in different contexts.

## Requirements

### Task 1: this Binding Demonstrator
Implement `demonstrateThis()` that shows:
- Default binding (global/undefined)
- Implicit binding (method call)
- Explicit binding (call/apply)
- new binding (constructor)
- Arrow function lexical binding

### Task 2: Method Borrowing
Implement `borrowMethod(source, methodName, target)` that:
- Safely borrows methods between objects
- Preserves proper context
- Handles missing methods gracefully

### Task 3: Factory vs Constructor
Implement both patterns and demonstrate when to use each.

## Production Context

this binding in production:
- Event handlers losing context
- React class components (before hooks)
- Method extraction for callbacks
- Testing with mock contexts

## Hints

<details>
<summary>Hint 1: this Rules</summary>
Remember: new > explicit > implicit > default. Arrow functions ignore all rules.
</details>

<details>
<summary>Hint 2: Method Borrowing</summary>
Use Function.prototype.call or apply, or bind permanently with Function.prototype.bind.
</details>

## Commands
```bash
js-forge run month-01/week-03/lesson-07
js-forge test month-01/week-03/lesson-07
js-forge submit month-01/week-03/lesson-07
```
