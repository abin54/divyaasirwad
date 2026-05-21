import mongoose, { Schema, Document } from 'mongoose';

export interface IPayment extends Document {
  paymentId: string;
  booking: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  amount: number;
  currency: string;
  gateway: 'razorpay' | 'stripe' | 'wallet';
  gatewayPaymentId: string;
  gatewayOrderId: string;
  gatewaySignature: string;
  method: 'upi' | 'card' | 'netbanking' | 'wallet';
  status: 'created' | 'attempted' | 'paid' | 'failed' | 'refunded';
  refundId?: string;
  refundAmount?: number;
  refundReason?: string;
  refundedAt?: Date;
  notes: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    paymentId: { type: String, required: true, unique: true },
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    gateway: {
      type: String,
      enum: ['razorpay', 'stripe', 'wallet'],
      required: true,
    },
    gatewayPaymentId: { type: String },
    gatewayOrderId: { type: String },
    gatewaySignature: { type: String },
    method: {
      type: String,
      enum: ['upi', 'card', 'netbanking', 'wallet'],
    },
    status: {
      type: String,
      enum: ['created', 'attempted', 'paid', 'failed', 'refunded'],
      default: 'created',
    },
    refundId: { type: String },
    refundAmount: { type: Number },
    refundReason: { type: String },
    refundedAt: { type: Date },
    notes: { type: Map, of: String },
  },
  { timestamps: true }
);

paymentSchema.index({ booking: 1 });
paymentSchema.index({ user: 1 });
paymentSchema.index({ gatewayPaymentId: 1 });
paymentSchema.index({ status: 1 });

export default mongoose.model<IPayment>('Payment', paymentSchema);
