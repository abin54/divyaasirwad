import * as functions from 'firebase-functions';
import { db, collections, FieldValue } from '../lib/firebase';
import { AppError, withErrorHandling, requireAuth, successResponse, paginatedResponse } from '../lib/errors';
import { logInfo, logEvent, measurePerformance } from '../lib/observability';
import { validateSchema, createBookingSchema, cancelBookingSchema } from '../lib/validation';
import { generateBookingId, calculateRefundAmount, BOOKING_TRANSITIONS } from '@divyaasirwad/shared';

export const createBooking = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('bookings.create', async () => {
    const { templeId, ritualId, deityId, packageType, type, address, devotees, scheduledDate, scheduledTime, specialRequests, couponCode } =
      validateSchema(createBookingSchema, data);

    const ritualDoc = await collections.rituals.doc(ritualId).get();
    if (!ritualDoc.exists) throw new AppError('Ritual not found', 404, 'NOT_FOUND');
    const ritual = ritualDoc.data()!;

    const amount = ritual.pricing[packageType];
    const discount = 0;
    const totalAmount = amount - discount;

    const bookingId = generateBookingId();
    const bookingRef = collections.bookings.doc();

    const booking = {
      id: bookingRef.id,
      bookingId,
      userId: uid,
      templeId,
      ritualId,
      deityId,
      packageType,
      type,
      address,
      devotees,
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      amount,
      discount,
      couponCode,
      totalAmount,
      status: 'pending',
      paymentStatus: 'pending',
      specialRequests,
      completionMedia: [],
      isReviewed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await bookingRef.set(booking);

    if (templeId) {
      await collections.temples.doc(templeId).update({
        totalBookings: FieldValue.increment(1),
      });
    }

    logEvent('booking_created', { bookingId, uid, ritualId, totalAmount });
    return successResponse(booking);
  });
});

export const getUserBookings = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('bookings.getUserBookings', async () => {
    const { page = 1, limit = 20, status } = data;
    let query = collections.bookings.where('userId', '==', uid).orderBy('createdAt', 'desc');
    if (status) query = query.where('status', '==', status);

    const skip = (page - 1) * limit;
    const snapshot = await query.offset(skip).limit(limit).get();
    const totalSnap = await query.count().get();

    const bookings = snapshot.docs.map((d) => d.data());
    return paginatedResponse(bookings, totalSnap.data().count, page, limit);
  });
});

export const getBookingById = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('bookings.getById', async () => {
    const { id } = data;
    const doc = await collections.bookings.doc(id).get();
    if (!doc.exists) throw new AppError('Booking not found', 404, 'NOT_FOUND');
    const booking = doc.data()!;
    if (booking.userId !== uid && booking.panditId !== uid) {
      throw new AppError('Unauthorized', 403, 'PERMISSION_DENIED');
    }
    return successResponse(booking);
  });
});

export const getBookingByBookingId = functions.https.onCall(async (data) => {
  return measurePerformance('bookings.getByBookingId', async () => {
    const { bookingId } = data;
    const snapshot = await collections.bookings.where('bookingId', '==', bookingId).limit(1).get();
    if (snapshot.empty) throw new AppError('Booking not found', 404, 'NOT_FOUND');
    return successResponse(snapshot.docs[0].data());
  });
});

export const cancelBooking = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('bookings.cancel', async () => {
    const { id, reason } = validateSchema(cancelBookingSchema, data);
    const doc = await collections.bookings.doc(id).get();
    if (!doc.exists) throw new AppError('Booking not found', 404, 'NOT_FOUND');
    const booking = doc.data()!;

    if (booking.userId !== uid) throw new AppError('Unauthorized', 403, 'PERMISSION_DENIED');
    if (!['pending', 'confirmed'].includes(booking.status)) {
      throw new AppError('Booking cannot be cancelled', 400, 'INVALID_STATE');
    }

    const refundAmount = calculateRefundAmount(booking.totalAmount, booking.scheduledDate.toDate());

    await doc.ref.update({
      status: 'cancelled',
      cancelledBy: 'user',
      cancellationReason: reason,
      cancelledAt: new Date(),
      refundAmount,
      updatedAt: new Date(),
    });

    logEvent('booking_cancelled', { bookingId: booking.bookingId, refundAmount });
    return successResponse({ message: 'Booking cancelled', refundAmount });
  });
});

export const updateBookingStatus = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('bookings.updateStatus', async () => {
    const { id, status, media, notes } = data;
    const doc = await collections.bookings.doc(id).get();
    if (!doc.exists) throw new AppError('Booking not found', 404, 'NOT_FOUND');
    const booking = doc.data()!;

    const validTransitions: Record<string, string[]> = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['in_progress', 'cancelled'],
      in_progress: ['completed'],
    };

    if (!validTransitions[booking.status]?.includes(status)) {
      throw new AppError(`Cannot transition from ${booking.status} to ${status}`, 400, 'INVALID_TRANSITION');
    }

    const updates: Record<string, unknown> = { status, updatedAt: new Date() };
    if (status === 'completed') {
      updates.completionMedia = media || [];
      updates.completionNotes = notes;
    }

    await doc.ref.update(updates);
    logEvent('booking_status_updated', { bookingId: booking.bookingId, status });
    return successResponse({ message: `Booking ${status}` });
  });
});

export const uploadCompletionMedia = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('bookings.uploadMedia', async () => {
    const { id, media } = data;
    const doc = await collections.bookings.doc(id).get();
    if (!doc.exists) throw new AppError('Booking not found', 404, 'NOT_FOUND');
    const booking = doc.data()!;

    if (booking.panditId !== uid) throw new AppError('Unauthorized', 403, 'PERMISSION_DENIED');

    await doc.ref.update({
      completionMedia: FieldValue.arrayUnion(...media),
      updatedAt: new Date(),
    });

    logEvent('completion_media_uploaded', { bookingId: booking.bookingId });
    return successResponse({ message: 'Media uploaded' });
  });
});

export const getPanditBookings = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('bookings.getPanditBookings', async () => {
    const { page = 1, limit = 20, status, date } = data;
    let query = collections.bookings.where('panditId', '==', uid).orderBy('scheduledDate', 'asc');
    if (status) query = query.where('status', '==', status);
    if (date) {
      const start = new Date(date);
      const end = new Date(start);
      end.setDate(end.getDate() + 1);
      query = query.where('scheduledDate', '>=', start).where('scheduledDate', '<', end);
    }

    const skip = (page - 1) * limit;
    const snapshot = await query.offset(skip).limit(limit).get();
    const totalSnap = await query.count().get();

    return paginatedResponse(snapshot.docs.map((d) => d.data()), totalSnap.data().count, page, limit);
  });
});
