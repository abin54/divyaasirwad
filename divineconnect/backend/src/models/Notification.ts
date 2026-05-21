import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: 'booking_confirmation' | 'payment_success' | 'payment_failed' | 'puja_started'
    | 'puja_completed' | 'prasad_dispatched' | 'prasad_delivered' | 'festival_reminder'
    | 'offer_available' | 'review_request' | 'yatra_reminder' | 'general' | 'chat_message';
  title: string;
  titleHi?: string;
  titleBn?: string;
  body: string;
  bodyHi?: string;
  bodyBn?: string;
  data?: Record<string, unknown>;
  image?: string;
  isRead: boolean;
  isPushSent: boolean;
  priority: 'low' | 'normal' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      required: true,
      enum: [
        'booking_confirmation', 'payment_success', 'payment_failed',
        'puja_started', 'puja_completed', 'prasad_dispatched',
        'prasad_delivered', 'festival_reminder', 'offer_available',
        'review_request', 'yatra_reminder', 'general', 'chat_message',
      ],
    },
    title: { type: String, required: true },
    titleHi: { type: String },
    titleBn: { type: String },
    body: { type: String, required: true },
    bodyHi: { type: String },
    bodyBn: { type: String },
    data: { type: Map, of: Schema.Types.Mixed },
    image: { type: String },
    isRead: { type: Boolean, default: false },
    isPushSent: { type: Boolean, default: false },
    priority: { type: String, enum: ['low', 'normal', 'high'], default: 'normal' },
  },
  { timestamps: true }
);

notificationSchema.index({ user: 1, isRead: 1, createdAt: -1 });
notificationSchema.index({ type: 1, createdAt: -1 });

export default mongoose.model<INotification>('Notification', notificationSchema);
