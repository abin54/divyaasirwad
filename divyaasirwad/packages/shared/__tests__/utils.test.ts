import { validatePhone, validateEmail, formatCurrency } from '../src/utils';
import { calculateRefundAmount, CANCELLATION_POLICY } from '../src/state-machine/booking';

describe('Utils', () => {
  describe('validatePhone', () => {
    it('should validate Indian phone numbers', () => {
      expect(validatePhone('9876543210')).toBe(true);
      expect(validatePhone('1234567890')).toBe(false);
      expect(validatePhone('12345')).toBe(false);
      expect(validatePhone('abcdefghij')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    it('should validate email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('invalid')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency in INR', () => {
      expect(formatCurrency(100)).toBe('₹100');
      expect(formatCurrency(1000)).toBe('₹1,000');
      expect(formatCurrency(0)).toBe('₹0');
    });
  });

  describe('calculateRefundAmount', () => {
    it('should return full refund for bookings >24h away', () => {
      const futureDate = new Date(Date.now() + 25 * 60 * 60 * 1000);
      expect(calculateRefundAmount(1000, futureDate)).toBe(1000);
    });

    it('should return 50% refund for bookings 12-24h away', () => {
      const futureDate = new Date(Date.now() + 18 * 60 * 60 * 1000);
      expect(calculateRefundAmount(1000, futureDate)).toBe(500);
    });

    it('should return 25% refund for bookings 2-12h away', () => {
      const futureDate = new Date(Date.now() + 6 * 60 * 60 * 1000);
      expect(calculateRefundAmount(1000, futureDate)).toBe(250);
    });

    it('should return 0 refund for bookings <2h away', () => {
      const futureDate = new Date(Date.now() + 1 * 60 * 60 * 1000);
      expect(calculateRefundAmount(1000, futureDate)).toBe(0);
    });
  });

  describe('CANCELLATION_POLICY', () => {
    it('should have correct policy values', () => {
      expect(CANCELLATION_POLICY.fullRefundHours).toBe(24);
      expect(CANCELLATION_POLICY.partialRefundHours).toBe(12);
      expect(CANCELLATION_POLICY.partialRefundPercent).toBe(0.5);
      expect(CANCELLATION_POLICY.noRefundHours).toBe(2);
    });
  });
});
