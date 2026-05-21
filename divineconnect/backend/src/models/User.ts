import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IFamilyMember {
  name: string;
  relation: string;
  dob?: Date;
  gotra?: string;
  zodiac?: string;
  isPrimary: boolean;
}

export interface IUser extends Document {
  phone: string;
  email?: string;
  password?: string;
  name: string;
  photo?: string;
  language: string;
  role: 'user' | 'pandit' | 'temple_admin' | 'admin' | 'superadmin';
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  firebaseUid?: string;
  googleId?: string;
  familyMembers: IFamilyMember[];
  addresses: Array<{
    label: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    isDefault: boolean;
  }>;
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    smsUpdates: boolean;
    language: string;
  };
  fcmTokens: string[];
  deviceInfo?: {
    platform?: string;
    version?: string;
  };
  lastLogin?: Date;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const familyMemberSchema = new Schema<IFamilyMember>({
  name: { type: String, required: true, trim: true },
  relation: { type: String, required: true, trim: true },
  dob: { type: Date },
  gotra: { type: String, trim: true },
  zodiac: { type: String, trim: true },
  isPrimary: { type: Boolean, default: false },
});

const userSchema = new Schema<IUser>(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String, minlength: 6, select: false },
    name: { type: String, required: true, trim: true },
    photo: { type: String },
    language: { type: String, enum: ['en', 'hi', 'bn'], default: 'en' },
    role: {
      type: String,
      enum: ['user', 'pandit', 'temple_admin', 'admin', 'superadmin'],
      default: 'user',
    },
    isPhoneVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    firebaseUid: { type: String, index: true },
    googleId: { type: String, index: true },
    familyMembers: [familyMemberSchema],
    addresses: [
      {
        label: { type: String },
        address: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
        isDefault: { type: Boolean, default: false },
      },
    ],
    preferences: {
      notifications: { type: Boolean, default: true },
      emailUpdates: { type: Boolean, default: true },
      smsUpdates: { type: Boolean, default: true },
      language: { type: String, default: 'en' },
    },
    fcmTokens: [{ type: String }],
    deviceInfo: {
      platform: { type: String },
      version: { type: String },
    },
    lastLogin: { type: Date },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ role: 1, isActive: 1 });
userSchema.index({ name: 'text', phone: 'text' });

export default mongoose.model<IUser>('User', userSchema);
