import mongoose, { Schema, Document } from 'mongoose';

export interface IDevotee {
  name: string;
  gotra?: string;
  relation: string;
  zodiac?: string;
}

export interface IBooking extends Document {
  bookingId: string;
  user: mongoose.Types.ObjectId;
  temple?: mongoose.Types.ObjectId;
  pandit?: mongoose.Types.ObjectId;
  ritual: mongoose.Types.ObjectId;
  deity: mongoose.Types.ObjectId;
  packageType: 'basic' | 'standard' | 'premium';
  type: 'home' | 'temple';
  address?: string;
  devotees: IDevotee[];
  scheduledDate: Date;
  scheduledTime: string;
  muhurta?: string;
  amount: number;
  discount: number;
  couponCode?: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  payment?: mongoose.Types.ObjectId;
  specialRequests?: string;
  completionMedia: Array<{
    type: 'image' | 'video';
    url: string;
    uploadedAt: Date;
  }>;
  completionNotes?: string;
  isReviewed: boolean;
  prasadDelivery?: {
    trackingId: string;
    courierPartner: string;
    status: 'processing' | 'dispatched' | 'in_transit' | 'delivered';
    estimatedDelivery: Date;
    trackingUrl: string;
  };
  cancelledBy?: 'user' | 'pandit' | 'admin';
  cancellationReason?: string;
  cancelledAt?: Date;
  refundAmount?: number;
  liveStreamUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const devoteeSchema = new Schema<IDevotee>({
  name: { type: String, required: true },
  gotra: { type: String },
  relation: { type: String, default: 'self' },
  zodiac: { type: String },
});

const bookingSchema = new Schema<IBooking>(
  {
    bookingId: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    temple: { type: Schema.Types.ObjectId, ref: 'Temple' },
    pandit: { type: Schema.Types.ObjectId, ref: 'User' },
    ritual: { type: Schema.Types.ObjectId, ref: 'Ritual', required: true },
    deity: { type: Schema.Types.ObjectId, ref: 'Deity', required: true },
    packageType: {
      type: String,
      enum: ['basic', 'standard', 'premium'],
      required: true,
    },
    type: { type: String, enum: ['home', 'temple'], required: true },
    address: { type: String },
    devotees: [devoteeSchema],
    scheduledDate: { type: Date, required: true },
    scheduledTime: { type: String, required: true },
    muhurta: { type: String },
    amount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    couponCode: { type: String },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded'],
      default: 'pending',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'paid', 'failed', 'refunded'],
      default: 'pending',
    },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    specialRequests: { type: String },
    completionMedia: [
      {
        type: { type: String, enum: ['image', 'video'] },
        url: { type: String },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    completionNotes: { type: String },
    isReviewed: { type: Boolean, default: false },
    prasadDelivery: {
      trackingId: { type: String },
      courierPartner: { type: String },
      status: {
        type: String,
        enum: ['processing', 'dispatched', 'in_transit', 'delivered'],
      },
      estimatedDelivery: { type: Date },
      trackingUrl: { type: String },
    },
    cancelledBy: { type: String, enum: ['user', 'pandit', 'admin'] },
    cancellationReason: { type: String },
    cancelledAt: { type: Date },
    refundAmount: { type: Number },
    liveStreamUrl: { type: String },
  },
  { timestamps: true }
);

bookingSchema.index({ user: 1, status: 1 });
bookingSchema.index({ temple: 1, status: 1 });
bookingSchema.index({ pandit: 1, scheduledDate: 1 });
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ scheduledDate: 1, status: 1 });
bookingSchema.index({ 'prasadDelivery.status': 1 });

export default mongoose.model<IBooking>('Booking', bookingSchema);
