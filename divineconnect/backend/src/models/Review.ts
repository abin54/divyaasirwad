import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  booking: mongoose.Types.ObjectId;
  temple?: mongoose.Types.ObjectId;
  pandit?: mongoose.Types.ObjectId;
  yatra?: mongoose.Types.ObjectId;
  rating: number;
  title?: string;
  description: string;
  images: string[];
  isVerifiedPurchase: boolean;
  isVisible: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    temple: { type: Schema.Types.ObjectId, ref: 'Temple' },
    pandit: { type: Schema.Types.ObjectId, ref: 'User' },
    yatra: { type: Schema.Types.ObjectId, ref: 'Yatra' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, maxlength: 100 },
    description: { type: String, required: true, maxlength: 1000 },
    images: [{ type: String }],
    isVerifiedPurchase: { type: Boolean, default: false },
    isVisible: { type: Boolean, default: true },
    helpfulCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

reviewSchema.index({ temple: 1, isVisible: 1 });
reviewSchema.index({ pandit: 1, isVisible: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ booking: 1 });

export default mongoose.model<IReview>('Review', reviewSchema);
