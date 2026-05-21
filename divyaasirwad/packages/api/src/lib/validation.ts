import { z } from 'zod';

export const phoneSchema = z.string().regex(/^[6-9]\d{9}$/, 'Invalid Indian phone number');
export const emailSchema = z.string().email('Invalid email');
export const nameSchema = z.string().min(2, 'Name must be at least 2 characters').max(100);
export const otpSchema = z.string().length(6, 'OTP must be 6 digits').regex(/^\d{6}$/);
export const dateSchema = z.string().datetime('Invalid date format');
export const timeSchema = z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Invalid time format');
export const mongoIdSchema = z.string().regex(/^[a-zA-Z0-9]+$/, 'Invalid ID');

export const sendOtpSchema = z.object({ phone: phoneSchema });
export const verifyOtpSchema = z.object({ phone: phoneSchema, otp: otpSchema, name: nameSchema.optional() });

export const createBookingSchema = z.object({
  templeId: mongoIdSchema.optional(),
  ritualId: mongoIdSchema,
  deityId: mongoIdSchema,
  packageType: z.enum(['basic', 'standard', 'premium']),
  type: z.enum(['home', 'temple']),
  address: z.string().optional(),
  devotees: z.array(z.object({
    name: nameSchema,
    gotra: z.string().optional(),
    relation: z.string(),
    zodiac: z.string().optional(),
  })).min(1),
  scheduledDate: dateSchema,
  scheduledTime: timeSchema,
  specialRequests: z.string().max(500).optional(),
  couponCode: z.string().optional(),
});

export const cancelBookingSchema = z.object({
  id: mongoIdSchema,
  reason: z.string().min(10, 'Reason must be at least 10 characters').max(500),
});

export const createPaymentSchema = z.object({
  bookingId: mongoIdSchema,
});

export const verifyPaymentSchema = z.object({
  razorpay_payment_id: z.string(),
  razorpay_order_id: z.string(),
  razorpay_signature: z.string(),
});

export const createReviewSchema = z.object({
  bookingId: mongoIdSchema,
  templeId: mongoIdSchema.optional(),
  panditId: mongoIdSchema.optional(),
  rating: z.number().min(1).max(5),
  title: z.string().max(100).optional(),
  description: z.string().min(10).max(1000),
  images: z.array(z.string().url()).max(5).optional(),
});

export const createDonationSchema = z.object({
  templeId: mongoIdSchema.optional(),
  cause: z.string().optional(),
  amount: z.number().min(1),
  type: z.enum(['general', 'temple', 'annadanam', 'education', 'medical', 'infrastructure', 'festival']),
  isAnonymous: z.boolean().default(false),
  message: z.string().max(500).optional(),
});

export const addFamilyMemberSchema = z.object({
  name: nameSchema,
  relation: z.string(),
  gotra: z.string().optional(),
  zodiac: z.string().optional(),
  dob: dateSchema.optional(),
});

export const updateProfileSchema = z.object({
  name: nameSchema.optional(),
  email: emailSchema.optional(),
  language: z.enum(['en', 'hi', 'bn']).optional(),
  photo: z.string().url().optional(),
  preferences: z.object({
    notifications: z.boolean().optional(),
    emailUpdates: z.boolean().optional(),
    smsUpdates: z.boolean().optional(),
  }).optional(),
});

export function validateSchema<T extends z.ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const errors = result.error.errors.map((e) => ({ field: e.path.join('.'), message: e.message }));
    throw new Error(`Validation failed: ${JSON.stringify(errors)}`);
  }
  return result.data;
}
