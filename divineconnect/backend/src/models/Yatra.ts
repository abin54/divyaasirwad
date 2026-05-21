import mongoose, { Schema, Document } from 'mongoose';

export interface IYatraPricing {
  economy: number;
  standard: number;
  deluxe: number;
}

export interface IYatraItinerary {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface IYatra extends Document {
  name: string;
  nameHi: string;
  nameBn: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  mainImage: string;
  destinations: Array<{
    temple: mongoose.Types.ObjectId;
    day: number;
    duration: string;
  }>;
  duration: {
    days: number;
    nights: number;
  };
  pricing: IYatraPricing;
  includes: string[];
  excludes: string[];
  itinerary: IYatraItinerary[];
  startDates: Date[];
  maxDevotees: number;
  currentBookings: number;
  transport: 'bus' | 'train' | 'flight' | 'all';
  accommodation: 'standard' | 'deluxe' | 'luxury';
  mealsIncluded: boolean;
  guidesAvailable: boolean;
  languages: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  category: 'domestic' | 'international';
  state: string;
  region: string;
  createdAt: Date;
  updatedAt: Date;
}

const yatraSchema = new Schema<IYatra>(
  {
    name: { type: String, required: true, trim: true },
    nameHi: { type: String, trim: true },
    nameBn: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, maxlength: 200 },
    images: [{ type: String }],
    mainImage: { type: String, required: true },
    destinations: [
      {
        temple: { type: Schema.Types.ObjectId, ref: 'Temple' },
        day: { type: Number },
        duration: { type: String },
      },
    ],
    duration: {
      days: { type: Number, required: true },
      nights: { type: Number, required: true },
    },
    pricing: {
      economy: { type: Number, required: true },
      standard: { type: Number, required: true },
      deluxe: { type: Number, required: true },
    },
    includes: [{ type: String }],
    excludes: [{ type: String }],
    itinerary: [
      {
        day: { type: Number },
        title: { type: String },
        description: { type: String },
        activities: [{ type: String }],
        meals: [{ type: String }],
        accommodation: { type: String },
      },
    ],
    startDates: [{ type: Date }],
    maxDevotees: { type: Number, default: 50 },
    currentBookings: { type: Number, default: 0 },
    transport: {
      type: String,
      enum: ['bus', 'train', 'flight', 'all'],
      default: 'bus',
    },
    accommodation: {
      type: String,
      enum: ['standard', 'deluxe', 'luxury'],
      default: 'standard',
    },
    mealsIncluded: { type: Boolean, default: true },
    guidesAvailable: { type: Boolean, default: true },
    languages: [{ type: String }],
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    category: { type: String, enum: ['domestic', 'international'], default: 'domestic' },
    state: { type: String },
    region: { type: String },
  },
  { timestamps: true }
);

yatraSchema.index({ slug: 1 });
yatraSchema.index({ isFeatured: 1, isActive: 1 });
yatraSchema.index({ state: 1, category: 1 });

export default mongoose.model<IYatra>('Yatra', yatraSchema);
