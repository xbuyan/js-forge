# Lesson 2.3: Closures & Lexical Scoping

## Learning Objectives
- Understand lexical scope vs dynamic scope
- Create private state with closures
- Implement the module pattern
- Avoid common closure traps

## The Problem

You're building a module system for a widget library. Each widget needs private state, public methods, and event handlers that maintain proper context.

## Requirements

### Task 1: Counter Module
Implement `createCounter()` using closure for:
- Private count variable
- increment(), decrement(), getValue() methods
- History tracking (all previous values)

### Task 2: Event Handler Factory
Implement `createHandler(context)` that:
- Returns functions bound to context
- Maintains private event log
- Supports debouncing

### Task 3: Module Pattern
Implement `createWidget(config)` that:
- Has private state (not accessible externally)
- Exposes public API
- Supports method chaining

## Production Context

Closures in production:
- Module encapsulation
- Factory functions
- Event listeners with state
- React hooks (useState, useEffect)

## Hints

<details>
<summary>Hint 1: Private State</summary>
Return an object with methods that close over private variables.
</details>

<details>
<summary>Hint 2: Debouncing</summary>
Use setTimeout and clearTimeout within closure to manage timing.
</details>

## Commands
```bash
js-forge run month-01/week-02/lesson-06
js-forge test month-01/week-02/lesson-06
js-forge submit month-01/week-02/lesson-06
```
