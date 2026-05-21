import { describe, it, expect } from '@jest/globals';
import { bookingMachine, BOOKING_TRANSITIONS, calculateRefundAmount, CANCELLATION_POLICY } from '../src/state-machine/booking';

describe('Booking State Machine', () => {
  it('should start in draft state', () => {
    expect(bookingMachine.initial).toBe('draft');
  });

  it('should have all required states', () => {
    const states = bookingMachine.states;
    expect(states).toHaveProperty('draft');
    expect(states).toHaveProperty('pending');
    expect(states).toHaveProperty('confirmed');
    expect(states).toHaveProperty('in_progress');
    expect(states).toHaveProperty('completed');
    expect(states).toHaveProperty('cancelled');
    expect(states).toHaveProperty('refunded');
  });

  it('should have correct initial context', () => {
    expect(bookingMachine.context).toEqual({
      booking: null,
      error: null,
      retryCount: 0,
    });
  });

  it('should define all valid transitions', () => {
    expect(BOOKING_TRANSITIONS.draft).toEqual(['pending']);
    expect(BOOKING_TRANSITIONS.pending).toContain('confirmed');
    expect(BOOKING_TRANSITIONS.pending).toContain('cancelled');
    expect(BOOKING_TRANSITIONS.confirmed).toContain('in_progress');
    expect(BOOKING_TRANSITIONS.in_progress).toEqual(['completed']);
    expect(BOOKING_TRANSITIONS.completed).toEqual([]);
    expect(BOOKING_TRANSITIONS.cancelled).toContain('refunded');
  });
});

describe('Cancellation Policy', () => {
  it('should have correct policy values', () => {
    expect(CANCELLATION_POLICY.fullRefundHours).toBe(24);
    expect(CANCELLATION_POLICY.partialRefundHours).toBe(12);
    expect(CANCELLATION_POLICY.partialRefundPercent).toBe(0.5);
    expect(CANCELLATION_POLICY.noRefundHours).toBe(2);
  });
});
