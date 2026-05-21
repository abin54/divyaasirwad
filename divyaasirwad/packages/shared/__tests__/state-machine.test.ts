import { BOOKING_TRANSITIONS, CANCELLATION_POLICY } from '../src/state-machine/booking';

describe('Booking State Machine', () => {
  it('should define all valid transitions', () => {
    expect(BOOKING_TRANSITIONS.draft).toEqual(['pending']);
    expect(BOOKING_TRANSITIONS.pending).toContain('confirmed');
    expect(BOOKING_TRANSITIONS.pending).toContain('cancelled');
    expect(BOOKING_TRANSITIONS.confirmed).toContain('in_progress');
    expect(BOOKING_TRANSITIONS.in_progress).toEqual(['completed']);
    expect(BOOKING_TRANSITIONS.completed).toEqual([]);
    expect(BOOKING_TRANSITIONS.cancelled).toContain('refunded');
  });

  it('should have correct cancellation policy values', () => {
    expect(CANCELLATION_POLICY.fullRefundHours).toBe(24);
    expect(CANCELLATION_POLICY.partialRefundHours).toBe(12);
    expect(CANCELLATION_POLICY.partialRefundPercent).toBe(0.5);
    expect(CANCELLATION_POLICY.noRefundHours).toBe(2);
  });
});
