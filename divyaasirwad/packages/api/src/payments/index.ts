import * as functions from 'firebase-functions';
import { db, collections } from '../lib/firebase';
import { AppError, requireAuth, successResponse, paginatedResponse } from '../lib/errors';
import { logEvent, measurePerformance } from '../lib/observability';
import { generatePaymentId, generateId } from '@divyaasirwad/shared';

export const createPaymentOrder = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('payments.createOrder', async () => {
    const { bookingId } = data;
    const bookingDoc = await collections.bookings.doc(bookingId).get();
    if (!bookingDoc.exists) throw new AppError('Booking not found', 404, 'NOT_FOUND');
    const booking = bookingDoc.data()!;
    if (booking.userId !== uid) throw new AppError('Unauthorized', 403, 'PERMISSION_DENIED');

    const paymentId = generatePaymentId();
    const paymentRef = collections.payments.doc();

    const payment = {
      id: paymentRef.id,
      paymentId,
      bookingId,
      userId: uid,
      amount: booking.totalAmount,
      currency: 'INR',
      gateway: 'razorpay',
      status: 'created',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await paymentRef.set(payment);
    await collections.bookings.doc(bookingId).update({ paymentId: paymentRef.id, updatedAt: new Date() });

    logEvent('payment_order_created', { paymentId, bookingId, amount: booking.totalAmount });

    const razorpayKey = functions.config().razorpay?.key;
    if (!razorpayKey) {
      logEvent('payment_config_missing', { paymentId });
    }

    return successResponse({
      paymentId,
      amount: booking.totalAmount,
      currency: 'INR',
      key: razorpayKey,
    });
  });
});

export const verifyPayment = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('payments.verify', async () => {
    const { paymentId, razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;

    const paymentDoc = await collections.payments.doc(paymentId).get();
    if (!paymentDoc.exists) throw new AppError('Payment not found', 404, 'NOT_FOUND');
    const payment = paymentDoc.data()!;
    if (payment.userId !== uid) throw new AppError('Unauthorized', 403, 'PERMISSION_DENIED');

    await paymentDoc.ref.update({
      gatewayPaymentId: razorpay_payment_id,
      gatewayOrderId: razorpay_order_id,
      status: 'paid',
      updatedAt: new Date(),
    });

    await collections.bookings.doc(payment.bookingId).update({
      paymentStatus: 'paid',
      status: 'confirmed',
      updatedAt: new Date(),
    });

    logEvent('payment_verified', { paymentId, bookingId: payment.bookingId });
    return successResponse({ message: 'Payment verified' });
  });
});

export const getTransactions = functions.https.onCall(async (data, context) => {
  const uid = requireAuth(context);
  return measurePerformance('payments.transactions', async () => {
    const { page = 1, limit = 20 } = data;
    const skip = (page - 1) * limit;
    const query = collections.payments.where('userId', '==', uid).orderBy('createdAt', 'desc');
    const snapshot = await query.offset(skip).limit(limit).get();
    const totalSnap = await query.count().get();
    return paginatedResponse(snapshot.docs.map((d) => d.data()), totalSnap.data().count, page, limit);
  });
});
