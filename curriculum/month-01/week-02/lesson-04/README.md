# Lesson 2.1: Control Flow & Conditionals

## Learning Objectives
- Master all conditional statement patterns
- Implement state machines using switch
- Use early returns to reduce nesting
- Handle errors with try/catch/finally

## The Problem

You're building an order processing system for an e-commerce platform. The system must handle different order states, payment methods, and edge cases with clean, maintainable code.

## Requirements

### Task 1: Order State Machine
Implement `processOrder(order)` that handles states:
- `pending` → validate inventory
- `validated` → process payment
- `paid` → schedule shipping
- `shipped` → send tracking
- `delivered` → request review
- `cancelled` → handle refund

### Task 2: Payment Method Handler
Handle multiple payment types with different validation rules:
- `credit_card`: Validate number, expiry, CVV
- `paypal`: Check account linking
- `crypto`: Verify wallet address format
- `bank_transfer`: Validate IBAN

### Task 3: Error Recovery
Implement retry logic with exponential backoff for payment failures.

## Production Context

State machines are everywhere in production:
- Order lifecycles
- User onboarding flows
- CI/CD pipelines
- Game state management

## Hints

<details>
<summary>Hint 1: State Machine Pattern</summary>
Use an object to map states to handler functions instead of nested if/else chains.
</details>

<details>
<summary>Hint 2: Early Returns</summary>
Each validation failure should return immediately. Avoid else-after-return.
</details>

## Commands
```bash
js-forge run month-01/week-02/lesson-04
js-forge test month-01/week-02/lesson-04
js-forge submit month-01/week-02/lesson-04
```
