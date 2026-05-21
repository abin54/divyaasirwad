import { describe, it, expect } from '@jest/globals';
import { generateBookingId, generatePaymentId, generateOtp, slugify, maskPhone, parsePagination, calculateDistance } from '../src/utils';
import { calculateRefundAmount, CANCELLATION_POLICY, BOOKING_TRANSITIONS } from '../src/state-machine/booking';

describe('Shared Utils', () => {
  describe('generateBookingId', () => {
    it('should generate ID with DC prefix', () => {
      const id = generateBookingId();
      expect(id.startsWith('DC')).toBe(true);
      expect(id.length).toBeGreaterThan(10);
    });
  });

  describe('generatePaymentId', () => {
    it('should generate ID with PAY prefix', () => {
      const id = generatePaymentId();
      expect(id.startsWith('PAY')).toBe(true);
    });
  });

  describe('generateOtp', () => {
    it('should generate 6-digit OTP by default', () => {
      const otp = generateOtp();
      expect(otp).toHaveLength(6);
      expect(/^\d{6}$/.test(otp)).toBe(true);
    });
  });

  describe('slugify', () => {
    it('should convert text to slug', () => {
      expect(slugify('Kashi Vishwanath Temple')).toBe('kashi-vishwanath-temple');
      expect(slugify('  Hello  World  ')).toBe('hello-world');
      expect(slugify('Special@#$Chars')).toBe('specialchars');
    });
  });

  describe('maskPhone', () => {
    it('should mask phone number', () => {
      expect(maskPhone('9876543210')).toBe('98****3210');
    });
  });

  describe('parsePagination', () => {
    it('should parse default pagination', () => {
      const result = parsePagination({});
      expect(result).toEqual({ page: 1, limit: 20, skip: 0 });
    });

    it('should parse custom pagination', () => {
      const result = parsePagination({ page: '3', limit: '10' });
      expect(result).toEqual({ page: 3, limit: 10, skip: 20 });
    });

    it('should clamp limit to max 100', () => {
      const result = parsePagination({ limit: '200' });
      expect(result.limit).toBe(100);
    });
  });

  describe('calculateDistance', () => {
    it('should calculate distance between two points', () => {
      const dist = calculateDistance(25.3108, 83.0103, 27.5830, 77.6737);
      expect(dist).toBeGreaterThan(500);
      expect(dist).toBeLessThan(600);
    });
  });
});

describe('Booking State Machine', () => {
  describe('calculateRefundAmount', () => {
    it('should give full refund if > 24 hours', () => {
      const future = new Date(Date.now() + 48 * 60 * 60 * 1000);
      expect(calculateRefundAmount(1000, future)).toBe(1000);
    });

    it('should give partial refund if 12-24 hours', () => {
      const future = new Date(Date.now() + 18 * 60 * 60 * 1000);
      expect(calculateRefundAmount(1000, future)).toBe(500);
    });

    it('should give 25% refund if 2-12 hours', () => {
      const future = new Date(Date.now() + 6 * 60 * 60 * 1000);
      expect(calculateRefundAmount(1000, future)).toBe(250);
    });

    it('should give no refund if < 2 hours', () => {
      const future = new Date(Date.now() + 1 * 60 * 60 * 1000);
      expect(calculateRefundAmount(1000, future)).toBe(0);
    });
  });

  describe('BOOKING_TRANSITIONS', () => {
    it('should allow valid transitions', () => {
      expect(BOOKING_TRANSITIONS.draft).toContain('pending');
      expect(BOOKING_TRANSITIONS.pending).toContain('confirmed');
      expect(BOOKING_TRANSITIONS.confirmed).toContain('in_progress');
      expect(BOOKING_TRANSITIONS.in_progress).toContain('completed');
    });

    it('should not allow completed to transition', () => {
      expect(BOOKING_TRANSITIONS.completed).toHaveLength(0);
    });
  });
});
