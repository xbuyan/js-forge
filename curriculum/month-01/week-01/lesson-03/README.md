# Lesson 1.3: Type Conversion & Validation

## Learning Objectives
- Implement explicit type casting safely
- Handle implicit coercion edge cases
- Build robust input validators
- Understand JSON serialization quirks

## The Problem

You're building a configuration loader that reads environment variables and JSON files. Everything comes in as strings, but your application needs typed values. Build a system that:

1. Converts strings to their intended types safely
2. Validates that converted values meet constraints
3. Handles JSON parsing with custom revivers
4. Prevents prototype pollution from user input

## Requirements

### Task 1: Safe Parser
Implement `parseValue(value, type)` that converts strings to:
- `number`: Accepts integers, floats, scientific notation
- `boolean`: Only accepts `"true"`/`"false"` (case-insensitive), rejects `"1"`/`"0"`
- `array`: Parses comma-separated or JSON array strings
- `object`: Parses JSON objects safely (no prototype pollution)
- `date`: ISO 8601 strings only

### Task 2: Constraint Validator
Implement `validateConstraints(value, constraints)` where constraints is:
```javascript
{
  type: 'number',
  min: 0,
  max: 100,
  integer: true
}
```

### Task 3: JSON Safe Parse
Implement `safeJSONParse(str)` that:
- Uses a reviver to prevent `__proto__` and `constructor` pollution
- Returns `{ success: true, data }` or `{ success: false, error }`
- Handles circular reference detection

## Production Context

Configuration loading is a common source of security vulnerabilities:
- Prototype pollution via JSON.parse
- Type confusion in API endpoints
- Environment variable injection attacks

## Hints

<details>
<summary>Hint 1: Prototype Pollution</summary>
In your reviver, check if key === '__proto__' || key === 'constructor' || key === 'prototype' and skip those properties.
</details>

<details>
<summary>Hint 2: Date Parsing</summary>
Use `new Date(input)` and then check `!isNaN(date.getTime())` to validate. Reject invalid dates.
</details>

## Commands
```bash
js-forge run month-01/week-01/lesson-03
js-forge test month-01/week-01/lesson-03
js-forge submit month-01/week-01/lesson-03
```
