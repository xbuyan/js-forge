# Lesson 1.1: Environment Detection & Variable Declarations

## Learning Objectives
- Understand JavaScript runtime environments (Node.js vs Browser)
- Master `var`, `let`, and `const` declarations
- Predict hoisting behavior
- Write environment-agnostic code

## The Problem

You're building a universal logging utility that needs to work in both Node.js and the browser. The utility must:

1. Detect which environment it's running in
2. Use appropriate logging mechanism (`console.log` works everywhere, but you should know the difference)
3. Store configuration using the correct variable declaration type
4. Demonstrate understanding of hoisting

## Starter Code

The `starter/index.js` file contains a partially implemented `UniversalLogger` class. Your task is to complete it.

## Requirements

### Task 1: Environment Detection
Implement `detectEnvironment()` that returns `'node'` or `'browser'` based on available globals.

### Task 2: Proper Variable Declarations
- Use `const` for the logger configuration (it never changes after initialization)
- Use `let` for the log counter (it increments)
- Demonstrate why `var` would be problematic in a loop scenario

### Task 3: Hoisting Awareness
Implement a function that shows you understand hoisting by using a function before its declaration, but fails predictably with `let`/`const`.

## Production Context

In real applications, environment detection is crucial for:
- Conditional polyfills
- Different storage mechanisms (localStorage vs fs)
- API endpoint selection
- Feature flags

## Hints

<details>
<summary>Hint 1: Environment Detection</summary>
Check for `process` and `process.versions` for Node.js. Check for `window` or `document` for browser.
</details>

<details>
<summary>Hint 2: Variable Choice</summary>
Ask yourself: "Will this value be reassigned?" If no → `const`. If yes, but only in block scope → `let`. Avoid `var` in modern code.
</details>

<details>
<summary>Hint 3: Hoisting</summary>
Function declarations are hoisted entirely. `let` and `const` are hoisted but not initialized (Temporal Dead Zone).
</details>

## Running Your Code

```bash
js-forge run month-01/week-01/lesson-01
```

## Testing Your Solution

```bash
js-forge test month-01/week-01/lesson-01
```

## Submitting

```bash
js-forge submit month-01/week-01/lesson-01
```
