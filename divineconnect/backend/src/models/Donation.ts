import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  donationId: string;
  user: mongoose.Types.ObjectId;
  temple?: mongoose.Types.ObjectId;
  cause?: string;
  amount: number;
  currency: string;
  type: 'general' | 'temple' | 'annadanam' | 'education' | 'medical' | 'infrastructure' | 'festival';
  isAnonymous: boolean;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  message?: string;
  dedication?: {
    inNameOf: string;
    relation: string;
  };
  payment: mongoose.Types.ObjectId;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  receiptUrl?: string;
  taxBenefit: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const donationSchema = new Schema<IDonation>(
  {
    donationId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    temple: { type: Schema.Types.ObjectId, ref: 'Temple' },
    cause: { type: String },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'INR' },
    type: {
      type: String,
      enum: ['general', 'temple', 'annadanam', 'education', 'medical', 'infrastructure', 'festival'],
      default: 'general',
    },
    isAnonymous: { type: Boolean, default: false },
    donorName: { type: String },
    donorEmail: { type: String },
    donorPhone: { type: String },
    message: { type: String },
    dedication: {
      inNameOf: { type: String },
      relation: { type: String },
    },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    receiptUrl: { type: String },
    taxBenefit: { type: Boolean, default: true },
  },
  { timestamps: true }
);

donationSchema.index({ user: 1 });
donationSchema.index({ temple: 1 });
donationSchema.index({ status: 1 });

export default mongoose.model<IDonation>('Donation', donationSchema);
