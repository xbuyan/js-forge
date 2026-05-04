/**
 * Tests for Lesson 2.1: Control Flow & Conditionals
 */

const { OrderProcessor } = require('../../starter/index.js');

describe('Lesson 2.1: OrderProcessor', () => {
  let processor;

  beforeEach(() => {
    processor = new OrderProcessor();
  });

  it('should process pending orders', () => {
    const result = processor.processOrder({
      id: '123',
      state: 'pending',
      items: ['item1'],
      payment: { method: 'credit_card' }
    });
    expect(result.success).toBe(true);
    expect(result.newState).toBe('validated');
  });

  it('should validate credit card', () => {
    const result = processor.validatePayment({
      method: 'credit_card',
      details: { number: '4111111111111111', expiry: '12/25', cvv: '123' }
    });
    expect(result.valid).toBe(true);
  });

  it('should reject invalid credit card', () => {
    const result = processor.validatePayment({
      method: 'credit_card',
      details: { number: '123', expiry: '12/25', cvv: '123' }
    });
    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);
  });

  it('should handle crypto payment', () => {
    const result = processor.validatePayment({
      method: 'crypto',
      details: { wallet: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb' }
    });
    expect(result.valid).toBe(true);
  });

  it('should retry failed operations', async () => {
    let attempts = 0;
    const failingOp = async () => {
      attempts++;
      if (attempts < 3) throw new Error('Network error');
      return 'success';
    };

    const result = await processor.retryWithBackoff(failingOp);
    expect(result).toBe('success');
    expect(attempts).toBe(3);
  });

  it('should handle order processing errors', async () => {
    const result = await processor.processOrderSafe({
      id: '456',
      state: 'unknown_state',
      items: [],
      payment: { method: 'invalid' }
    });

    expect(result.success).toBe(false);
    expect(result.error).toBeType('string');
  });
});
