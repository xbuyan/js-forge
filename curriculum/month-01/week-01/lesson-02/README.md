# Lesson 1.2: Data Types & Type Coercion

## Learning Objectives
- Master all JavaScript primitive types
- Understand implicit vs explicit type coercion
- Predict coercion outcomes reliably
- Write type-safe code without TypeScript

## The Problem

You're building a data validation library for a form handling system. Users submit data as strings, but your backend expects proper types. You need to:

1. Safely convert string inputs to their intended types
2. Detect and reject dangerous coercions
3. Handle edge cases (NaN, null, undefined, empty strings)
4. Implement a type checker that rivals `typeof` but with fewer quirks

## Production Context

Form validation is where most type coercion bugs occur:
- `"5" + 3` → `"53"` (string concatenation)
- `"5" - 3` → `2` (numeric subtraction)
- `[] == false` → `true` (array coercion)
- `null == undefined` → `true` (spec behavior)

## Requirements

### Task 1: Safe Type Converter
Implement `safeConvert(value, targetType)` that:
- Converts strings to numbers, booleans, dates
- Returns `{ success: true, value }` or `{ success: false, error }`
- Never throws unexpectedly

### Task 2: Type Detective
Implement `detectType(value)` that:
- Correctly identifies arrays (unlike `typeof`)
- Distinguishes `null` from `object`
- Identifies `NaN` correctly (unlike `typeof` or `===`)
- Detects `Infinity` and `-Infinity`

### Task 3: Coercion Predictor
Implement `predictCoercion(a, b, operator)` that:
- Predicts the result of operations with mixed types
- Supports `+`, `-`, `==`, `===`, `<`, `>`
- Returns the expected result AND the coercion path taken

## Hints

<details>
<summary>Hint 1: Array Detection</summary>
Use `Array.isArray()` or `Object.prototype.toString.call()`
</details>

<details>
<summary>Hint 2: NaN Detection</summary>
`NaN === NaN` is false. Use `Number.isNaN()` or `Object.is()`
</details>

<details>
<summary>Hint 3: Coercion Rules</summary>
For `+`: if either operand is string, concatenate. Otherwise, convert to number.
For `-`: always convert to number.
For `==`: use Abstract Equality Comparison Algorithm (spec 7.2.14).
</details>

## Commands
```bash
js-forge run month-01/week-01/lesson-02
js-forge test month-01/week-01/lesson-02
js-forge submit month-01/week-01/lesson-02
```
