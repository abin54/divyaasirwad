import { Request, Response, NextFunction } from 'express';
import Razorpay from 'razorpay';
import Payment from '../models/Payment';
import Booking from '../models/Booking';
import { config } from '../config';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';
import { generatePaymentId } from '../utils/helpers';

const razorpay = new Razorpay({
  key_id: config.razorpay.keyId,
  key_secret: config.razorpay.keySecret,
});

export const createOrder = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { bookingId } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking) return errorResponse(res, 'Booking not found', 404);
    if (booking.user.toString() !== req.userId) return errorResponse(res, 'Unauthorized', 403);

    const paymentId = generatePaymentId();
    const options = {
      amount: Math.round(booking.totalAmount * 100),
      currency: 'INR',
      receipt: paymentId,
      notes: { bookingId: booking._id.toString(), userId: req.userId },
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      paymentId,
      booking: booking._id,
      user: req.userId,
      amount: booking.totalAmount,
      gateway: 'razorpay',
      gatewayOrderId: order.id,
      status: 'created',
    });

    booking.payment = payment._id;
    await booking.save();

    successResponse(res, {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: config.razorpay.keyId,
      paymentId: payment.paymentId,
    }, 'Payment order created');
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const expectedSig = require('crypto')
      .createHmac('sha256', config.razorpay.keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSig !== razorpay_signature) {
      return errorResponse(res, 'Invalid signature', 400);
    }

    const payment = await Payment.findOne({ gatewayOrderId: razorpay_order_id });
    if (!payment) return errorResponse(res, 'Payment not found', 404);

    payment.gatewayPaymentId = razorpay_payment_id;
    payment.gatewaySignature = razorpay_signature;
    payment.status = 'paid';
    await payment.save();

    await Booking.findByIdAndUpdate(payment.booking, { paymentStatus: 'paid' });

    successResponse(res, payment, 'Payment verified');
  } catch (error) {
    next(error);
  }
};

export const getPaymentStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payment = await Payment.findOne({ paymentId: req.params.paymentId }).populate('booking');
    if (!payment) return errorResponse(res, 'Payment not found', 404);
    successResponse(res, payment);
  } catch (error) {
    next(error);
  }
};

export const refundPayment = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { reason } = req.body;
    const payment = await Payment.findById(req.params.id);
    if (!payment) return errorResponse(res, 'Payment not found', 404);
    if (payment.status !== 'paid') return errorResponse(res, 'Payment cannot be refunded', 400);

    // In production: call Razorpay refund
    // const refund = await razorpay.payments.refund(payment.gatewayPaymentId);
    payment.status = 'refunded';
    payment.refundAmount = payment.amount;
    payment.refundReason = reason || 'Refund requested';
    payment.refundedAt = new Date();
    await payment.save();

    await Booking.findByIdAndUpdate(payment.booking, { paymentStatus: 'refunded', status: 'refunded' });

    successResponse(res, payment, 'Refund processed');
  } catch (error) {
    next(error);
  }
};

export const getTransactions = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const payments = await Payment.find({ user: req.userId })
      .sort({ createdAt: -1 }).limit(50).populate('booking', 'bookingId');
    successResponse(res, payments);
  } catch (error) {
    next(error);
  }
};
