import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { config } from '../config';
import { successResponse, errorResponse } from '../utils/response';
import { AuthRequest } from '../middleware/auth';
import { generateOtp } from '../utils/helpers';

const generateToken = (userId: string, role: string): string => {
  return jwt.sign({ id: userId, role }, config.jwt.secret, {
    expiresIn: config.jwt.expiresIn,
  } as jwt.SignOptions);
};

const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ id: userId }, config.jwt.secret, {
    expiresIn: config.jwt.refreshExpiresIn,
  } as jwt.SignOptions);
};

export const sendOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone } = req.body;
    if (!phone || phone.length < 10) {
      return errorResponse(res, 'Valid phone number is required', 400);
    }
    const otp = generateOtp();
    // In production: send OTP via Twilio/SMS gateway
    // await twilioService.sendSms(phone, `Your ${config.app.name} OTP is: ${otp}`);
    console.log(`OTP for ${phone}: ${otp}`);
    // Store OTP in Redis: await redis.setex(`otp:${phone}`, 300, otp);
    successResponse(res, { otp: process.env.NODE_ENV === 'development' ? otp : undefined }, 'OTP sent successfully');
  } catch (error) {
    next(error);
  }
};

export const verifyOtp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { phone, otp, name } = req.body;
    if (!phone || !otp) {
      return errorResponse(res, 'Phone and OTP are required', 400);
    }
    // In production: verify OTP from Redis
    // const storedOtp = await redis.get(`otp:${phone}`);
    // if (storedOtp !== otp) return errorResponse(res, 'Invalid OTP', 400);
    if (process.env.NODE_ENV === 'production' && otp !== '123456') {
      return errorResponse(res, 'Invalid OTP', 400);
    }
    let user = await User.findOne({ phone });
    if (!user) {
      user = await User.create({ phone, name: name || `User${phone.slice(-4)}`, isPhoneVerified: true });
    } else {
      user.isPhoneVerified = true;
      user.lastLogin = new Date();
      await user.save();
    }
    const token = generateToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());
    successResponse(res, {
      token,
      refreshToken,
      user: { id: user._id, name: user.name, phone: user.phone, role: user.role, language: user.language },
    }, 'Login successful');
  } catch (error) {
    next(error);
  }
};

export const googleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name, googleId, photo, fcmToken } = req.body;
    if (!email || !googleId) {
      return errorResponse(res, 'Email and Google ID required', 400);
    }
    let user = await User.findOne({ $or: [{ googleId }, { email }] });
    if (!user) {
      const phone = `google_${googleId.slice(-8)}`;
      user = await User.create({ email, name, googleId, phone, photo, isEmailVerified: true, isPhoneVerified: true });
    } else {
      user.googleId = googleId;
      user.lastLogin = new Date();
      if (photo) user.photo = photo;
      await user.save();
    }
    const token = generateToken(user._id.toString(), user.role);
    const refreshToken = generateRefreshToken(user._id.toString());
    successResponse(res, { token, refreshToken, user }, 'Google login successful');
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken: token } = req.body;
    if (!token) return errorResponse(res, 'Refresh token required', 400);
    const decoded = jwt.verify(token, config.jwt.secret) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user || !user.isActive) return errorResponse(res, 'Invalid token', 401);
    const newToken = generateToken(user._id.toString(), user.role);
    const newRefreshToken = generateRefreshToken(user._id.toString());
    successResponse(res, { token: newToken, refreshToken: newRefreshToken }, 'Token refreshed');
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId).select('-password -fcmTokens');
    if (!user) return errorResponse(res, 'User not found', 404);
    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const allowed = ['name', 'email', 'language', 'photo', 'preferences'];
    const updates: any = {};
    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }
    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true, runValidators: true }).select('-password');
    if (!user) return errorResponse(res, 'User not found', 404);
    successResponse(res, user, 'Profile updated');
  } catch (error) {
    next(error);
  }
};

export const addFamilyMember = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, relation, gotra, zodiac, dob } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return errorResponse(res, 'User not found', 404);
    user.familyMembers.push({ name, relation, gotra, zodiac: zodiac || undefined, dob: dob || undefined, isPrimary: user.familyMembers.length === 0 });
    await user.save();
    successResponse(res, user.familyMembers, 'Family member added', 201);
  } catch (error) {
    next(error);
  }
};

export const updateFcmToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { fcmToken } = req.body;
    await User.findByIdAndUpdate(req.userId, { $addToSet: { fcmTokens: fcmToken } });
    successResponse(res, null, 'FCM token updated');
  } catch (error) {
    next(error);
  }
};

export const logout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { fcmToken } = req.body;
    if (fcmToken) {
      await User.findByIdAndUpdate(req.userId, { $pull: { fcmTokens: fcmToken } });
    }
    successResponse(res, null, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};
