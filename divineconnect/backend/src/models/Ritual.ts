import mongoose, { Schema, Document } from 'mongoose';

export interface IRitualPrice {
  basic: number;
  standard: number;
  premium: number;
}

export interface IRitualDuration {
  basic: number;
  standard: number;
  premium: number;
}

export interface IRitual extends Document {
  name: string;
  nameHi: string;
  nameBn: string;
  slug: string;
  description: string;
  descriptionHi: string;
  descriptionBn: string;
  shortDescription: string;
  category: 'puja' | 'hawan' | 'aarti' | 'sanskar' | 'tarpan' | 'daily' | 'festival';
  type: 'home' | 'temple' | 'both';
  deity: mongoose.Types.ObjectId;
  associatedDeities: mongoose.Types.ObjectId[];
  image: string;
  icon: string;
  pricing: IRitualPrice;
  duration: IRitualDuration;
  includes: string[];
  requirements: string[];
  samagri: string[];
  benefits: string[];
  benefitsHi: string[];
  benefitsBn: string[];
  muhurta?: boolean;
  instructions: string;
  isPopular: boolean;
  isTrending: boolean;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ritualSchema = new Schema<IRitual>(
  {
    name: { type: String, required: true, trim: true },
    nameHi: { type: String, required: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    descriptionHi: { type: String, required: true },
    descriptionBn: { type: String, required: true },
    shortDescription: { type: String, maxlength: 200 },
    category: {
      type: String,
      enum: ['puja', 'hawan', 'aarti', 'sanskar', 'tarpan', 'daily', 'festival'],
      required: true,
    },
    type: {
      type: String,
      enum: ['home', 'temple', 'both'],
      default: 'both',
    },
    deity: { type: Schema.Types.ObjectId, ref: 'Deity', required: true },
    associatedDeities: [{ type: Schema.Types.ObjectId, ref: 'Deity' }],
    image: { type: String, required: true },
    icon: { type: String, required: true },
    pricing: {
      basic: { type: Number, required: true },
      standard: { type: Number, required: true },
      premium: { type: Number, required: true },
    },
    duration: {
      basic: { type: Number, default: 60 },
      standard: { type: Number, default: 120 },
      premium: { type: Number, default: 180 },
    },
    includes: [{ type: String }],
    requirements: [{ type: String }],
    samagri: [{ type: String }],
    benefits: [{ type: String }],
    benefitsHi: [{ type: String }],
    benefitsBn: [{ type: String }],
    muhurta: { type: Boolean, default: false },
    instructions: { type: String },
    isPopular: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

ritualSchema.index({ slug: 1 });
ritualSchema.index({ deity: 1, isActive: 1 });
ritualSchema.index({ category: 1, isPopular: 1 });
ritualSchema.index({ isTrending: 1 });

export default mongoose.model<IRitual>('Ritual', ritualSchema);
