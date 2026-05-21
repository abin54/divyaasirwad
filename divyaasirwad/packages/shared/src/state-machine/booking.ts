import { createMachine, assign, fromPromise } from 'xstate';
import { BookingStatus, PaymentStatus, Booking } from '../types';

export interface BookingContext {
  booking: Booking | null;
  error: string | null;
  retryCount: number;
}

export type BookingEvent =
  | { type: 'CREATE'; booking: Omit<Booking, 'id' | 'bookingId' | 'status' | 'paymentStatus'> }
  | { type: 'CONFIRM'; panditId: string }
  | { type: 'START' }
  | { type: 'COMPLETE'; media?: Array<{ type: 'image' | 'video'; url: string }>; notes?: string }
  | { type: 'CANCEL'; reason: string; cancelledBy: 'user' | 'pandit' | 'admin' }
  | { type: 'REFUND'; amount: number }
  | { type: 'PAYMENT_SUCCESS'; paymentId: string }
  | { type: 'PAYMENT_FAILED'; error: string }
  | { type: 'RETRY' }
  | { type: 'ERROR'; error: string };

export const bookingMachine = createMachine(
  {
    id: 'booking',
    types: {} as {
      context: BookingContext;
      events: BookingEvent;
    },
    initial: 'draft',
    context: {
      booking: null,
      error: null,
      retryCount: 0,
    },
    states: {
      draft: {
        on: {
          CREATE: {
            target: 'pending',
            actions: ['setBooking'],
          },
        },
      },
      pending: {
        on: {
          CONFIRM: {
            target: 'confirmed',
            actions: ['setPandit', 'notifyConfirmation'],
          },
          CANCEL: {
            target: 'cancelled',
            actions: ['setCancellation', 'processRefund'],
          },
          PAYMENT_SUCCESS: {
            target: 'confirmed',
            actions: ['setPayment', 'notifyConfirmation'],
          },
          PAYMENT_FAILED: {
            target: 'payment_failed',
            actions: ['setError'],
          },
        },
      },
      payment_failed: {
        after: {
          300000: { target: 'pending' },
        },
        on: {
          RETRY: { target: 'pending', actions: ['resetError'] },
          CANCEL: { target: 'cancelled', actions: ['setCancellation'] },
        },
      },
      confirmed: {
        on: {
          START: {
            target: 'in_progress',
            actions: ['notifyStarted'],
          },
          CANCEL: {
            target: 'cancellation_review',
            actions: ['setCancellation'],
          },
        },
      },
      in_progress: {
        on: {
          COMPLETE: {
            target: 'completed',
            actions: ['setCompletion', 'notifyCompleted'],
          },
        },
      },
      completed: {
        type: 'final',
      },
      cancellation_review: {
        on: {
          APPROVE_CANCEL: {
            target: 'cancelled',
            actions: ['processRefund', 'notifyCancellation'],
          },
          REJECT_CANCEL: {
            target: 'confirmed',
            actions: ['clearCancellation'],
          },
        },
      },
      cancelled: {
        on: {
          REFUND: {
            target: 'refunded',
            actions: ['processRefund', 'notifyRefund'],
          },
        },
      },
      refunded: {
        type: 'final',
      },
    },
  },
  {
    actions: {
      setBooking: assign({
        booking: ({ event }) => ({
          ...(event as any).booking,
          status: 'pending' as BookingStatus,
          paymentStatus: 'pending' as PaymentStatus,
        }),
        error: null,
      }),
      setPandit: assign({
        booking: ({ context, event }) =>
          context.booking ? { ...context.booking, panditId: (event as any).panditId } : null,
      }),
      setPayment: assign({
        booking: ({ context, event }) =>
          context.booking
            ? { ...context.booking, paymentId: (event as any).paymentId, paymentStatus: 'paid' as PaymentStatus }
            : null,
      }),
      setError: assign({
        error: ({ event }) => (event as any).error,
        retryCount: ({ context }) => context.retryCount + 1,
      }),
      resetError: assign({ error: null }),
      setCancellation: assign({
        booking: ({ context, event }) =>
          context.booking
            ? {
                ...context.booking,
                cancelledBy: (event as any).cancelledBy,
                cancellationReason: (event as any).reason,
                cancelledAt: new Date(),
              }
            : null,
      }),
      clearCancellation: assign({
        booking: ({ context }) =>
          context.booking
            ? {
                ...context.booking,
                cancelledBy: undefined,
                cancellationReason: undefined,
                cancelledAt: undefined,
              }
            : null,
      }),
      setCompletion: assign({
        booking: ({ context, event }) =>
          context.booking
            ? {
                ...context.booking,
                status: 'completed' as BookingStatus,
                completionMedia: (event as any).media || [],
                completionNotes: (event as any).notes,
              }
            : null,
      }),
      processRefund: assign({
        booking: ({ context }) =>
          context.booking
            ? {
                ...context.booking,
                status: 'refunded' as BookingStatus,
                paymentStatus: 'refunded' as PaymentStatus,
                refundAmount: context.booking.totalAmount,
              }
            : null,
      }),
      notifyConfirmation: () => {},
      notifyStarted: () => {},
      notifyCompleted: () => {},
      notifyCancellation: () => {},
      notifyRefund: () => {},
    },
  }
);

export const BOOKING_TRANSITIONS: Record<BookingStatus, BookingStatus[]> = {
  draft: ['pending'],
  pending: ['confirmed', 'cancelled'],
  confirmed: ['in_progress', 'cancellation_review'],
  in_progress: ['completed'],
  completed: [],
  cancelled: ['refunded'],
  refunded: [],
  cancellation_review: ['cancelled', 'confirmed'],
};

export const CANCELLATION_POLICY = {
  fullRefundHours: 24,
  partialRefundHours: 12,
  partialRefundPercent: 0.5,
  noRefundHours: 2,
};

export function calculateRefundAmount(totalAmount: number, scheduledDate: Date): number {
  const now = new Date();
  const hoursUntil = (scheduledDate.getTime() - now.getTime()) / (1000 * 60 * 60);

  if (hoursUntil >= CANCELLATION_POLICY.fullRefundHours) return totalAmount;
  if (hoursUntil >= CANCELLATION_POLICY.partialRefundHours) return totalAmount * CANCELLATION_POLICY.partialRefundPercent;
  if (hoursUntil >= CANCELLATION_POLICY.noRefundHours) return totalAmount * 0.25;
  return 0;
}
