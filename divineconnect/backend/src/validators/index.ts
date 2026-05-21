import { body, param, query } from 'express-validator';

export const validateSendOtp = [
  body('phone').isString().isLength({ min: 10, max: 10 }).withMessage('Valid phone number required'),
];

export const validateVerifyOtp = [
  body('phone').isString().isLength({ min: 10, max: 10 }),
  body('otp').isString().isLength({ min: 6, max: 6 }),
];

export const validateBooking = [
  body('ritual').isMongoId().withMessage('Valid ritual ID required'),
  body('deity').isMongoId().withMessage('Valid deity ID required'),
  body('packageType').isIn(['basic', 'standard', 'premium']),
  body('type').isIn(['home', 'temple']),
  body('scheduledDate').isISO8601().withMessage('Valid date required'),
  body('scheduledTime').isString().notEmpty(),
];

export const validatePayment = [
  body('bookingId').isMongoId(),
];

export const validatePaymentVerify = [
  body('razorpay_payment_id').notEmpty(),
  body('razorpay_order_id').notEmpty(),
  body('razorpay_signature').notEmpty(),
];

export const validateReview = [
  body('booking').isMongoId(),
  body('rating').isInt({ min: 1, max: 5 }),
  body('description').isString().isLength({ min: 10, max: 1000 }),
];

export const validateDonation = [
  body('amount').isFloat({ min: 1 }).withMessage('Amount must be greater than 0'),
  body('type').optional().isIn(['general', 'temple', 'annadanam', 'education', 'medical', 'infrastructure', 'festival']),
];

export const validateId = [
  param('id').isMongoId().withMessage('Invalid ID format'),
];
