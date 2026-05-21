import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { successResponse, paginatedResponse, errorResponse } from '../utils/response';
import { parsePagination } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

export const getUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId).select('-password -fcmTokens');
    if (!user) return errorResponse(res, 'User not found', 404);
    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response, next: NextFunction) => {
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

export const addAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { label, address, city, state, pincode, isDefault } = req.body;
    const user = await User.findById(req.userId);
    if (!user) return errorResponse(res, 'User not found', 404);
    if (isDefault) user.addresses.forEach((a) => (a.isDefault = false));
    user.addresses.push({ label, address, city, state, pincode, isDefault: isDefault || user.addresses.length === 0 });
    await user.save();
    successResponse(res, user.addresses, 'Address added', 201);
  } catch (error) {
    next(error);
  }
};

export const getAddresses = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId).select('addresses');
    if (!user) return errorResponse(res, 'User not found', 404);
    successResponse(res, user.addresses);
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return errorResponse(res, 'User not found', 404);
    user.addresses = user.addresses.filter((_, i) => i !== parseInt(req.params.index));
    await user.save();
    successResponse(res, user.addresses, 'Address deleted');
  } catch (error) {
    next(error);
  }
};
