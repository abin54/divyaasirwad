import mongoose, { Schema, Document } from 'mongoose';

export interface ITemple extends Document {
  name: string;
  nameHi: string;
  nameBn: string;
  slug: string;
  description: string;
  shortDescription: string;
  images: string[];
  mainImage: string;
  deity: mongoose.Types.ObjectId;
  deities: mongoose.Types.ObjectId[];
  address: {
    street: string;
    area: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  timings: {
    morning: { open: string; close: string };
    evening: { open: string; close: string };
    aartiTimings: Array<{ name: string; time: string }>;
  };
  facilities: string[];
  category: 'local' | 'pilgrimage' | 'famous' | 'historic';
  rating: number;
  reviewCount: number;
  totalBookings: number;
  isVerified: boolean;
  pandits: mongoose.Types.ObjectId[];
  pricing: {
    minPujaPrice: number;
    maxPujaPrice: number;
  };
  gallery: string[];
  videos: string[];
  festivals: Array<{
    name: string;
    date: string;
    description: string;
  }>;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const templeSchema = new Schema<ITemple>(
  {
    name: { type: String, required: true, trim: true },
    nameHi: { type: String, trim: true },
    nameBn: { type: String, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    shortDescription: { type: String, maxlength: 200 },
    images: [{ type: String }],
    mainImage: { type: String, required: true },
    deity: { type: Schema.Types.ObjectId, ref: 'Deity', required: true },
    deities: [{ type: Schema.Types.ObjectId, ref: 'Deity' }],
    address: {
      street: { type: String, required: true },
      area: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String },
      country: { type: String, default: 'India' },
    },
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], required: true },
    },
    contact: {
      phone: { type: String },
      email: { type: String },
      website: { type: String },
    },
    timings: {
      morning: {
        open: { type: String, default: '06:00' },
        close: { type: String, default: '12:00' },
      },
      evening: {
        open: { type: String, default: '16:00' },
        close: { type: String, default: '21:00' },
      },
      aartiTimings: [
        {
          name: { type: String },
          time: { type: String },
        },
      ],
    },
    facilities: [{ type: String }],
    category: {
      type: String,
      enum: ['local', 'pilgrimage', 'famous', 'historic'],
      default: 'local',
    },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    totalBookings: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    pandits: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    pricing: {
      minPujaPrice: { type: Number, default: 0 },
      maxPujaPrice: { type: Number, default: 0 },
    },
    gallery: [{ type: String }],
    videos: [{ type: String }],
    festivals: [
      {
        name: { type: String },
        date: { type: String },
        description: { type: String },
      },
    ],
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

templeSchema.index({ location: '2dsphere' });
templeSchema.index({ 'address.city': 1, 'address.state': 1 });
templeSchema.index({ slug: 1 });
templeSchema.index({ deity: 1 });
templeSchema.index({ category: 1, isActive: 1 });
templeSchema.index({ rating: -1 });
templeSchema.index({ name: 'text', 'address.city': 'text', 'address.state': 'text' });

export default mongoose.model<ITemple>('Temple', templeSchema);
