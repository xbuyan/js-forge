/**
 * Lesson 2.1: Control Flow & Conditionals
 * 
 * Build an order processing state machine.
 */

class OrderProcessor {
  constructor() {
    this.retryAttempts = 3;
    this.retryDelay = 1000; // ms
  }

  /**
   * Task 1: Process order based on state
   * @param {Object} order - { id, state, items, payment }
   * @returns {Object} - { success, newState, actions }
   */
  processOrder(order) {
    // TODO: Implement state machine
    throw new Error('Not implemented');
  }

  /**
   * Task 2: Validate payment based on method
   * @param {Object} payment - { method, details }
   * @returns {{valid: boolean, errors: string[]}}
   */
  validatePayment(payment) {
    // TODO: Handle credit_card, paypal, crypto, bank_transfer
    throw new Error('Not implemented');
  }

  /**
   * Task 3: Retry with exponential backoff
   * @param {Function} operation - Async operation to retry
   * @returns {Promise<any>}
   */
  async retryWithBackoff(operation) {
    // TODO: Implement retry logic
    throw new Error('Not implemented');
  }

  /**
   * Task 4: Process order with full error handling
   */
  async processOrderSafe(order) {
    // TODO: Wrap processOrder in try/catch with proper cleanup
    throw new Error('Not implemented');
  }
}

module.exports = { OrderProcessor };
