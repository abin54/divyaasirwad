import mongoose, { Schema, Document } from 'mongoose';

export interface IDeity extends Document {
  name: string;
  nameHi: string;
  nameBn: string;
  slug: string;
  description: string;
  descriptionHi: string;
  descriptionBn: string;
  image: string;
  icon: string;
  category: 'primary' | 'avatar' | 'form' | 'other';
  associatedMantra?: string;
  associatedColors: string[];
  festivals: string[];
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const deitySchema = new Schema<IDeity>(
  {
    name: { type: String, required: true, trim: true },
    nameHi: { type: String, required: true, trim: true },
    nameBn: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, required: true },
    descriptionHi: { type: String, required: true },
    descriptionBn: { type: String, required: true },
    image: { type: String, required: true },
    icon: { type: String, required: true },
    category: {
      type: String,
      enum: ['primary', 'avatar', 'form', 'other'],
      default: 'primary',
    },
    associatedMantra: { type: String },
    associatedColors: [{ type: String }],
    festivals: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

deitySchema.index({ slug: 1 });
deitySchema.index({ category: 1, isActive: 1 });

export default mongoose.model<IDeity>('Deity', deitySchema);
