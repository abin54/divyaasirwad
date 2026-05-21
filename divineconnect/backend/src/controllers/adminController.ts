import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import Booking from '../models/Booking';
import Payment from '../models/Payment';
import Temple from '../models/Temple';
import Ritual from '../models/Ritual';
import { successResponse } from '../utils/response';

export const getDashboardStats = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [
      totalUsers, activeUsers, totalPandits, totalBookings,
      totalRevenue, pendingBookings, totalTemples, totalRituals
    ] = await Promise.all([
      User.countDocuments({ isDeleted: false }),
      User.countDocuments({ isActive: true, isDeleted: false, lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } }),
      User.countDocuments({ role: 'pandit', isActive: true }),
      Booking.countDocuments(),
      Payment.aggregate([{ $match: { status: 'paid' } }, { $group: { _id: null, total: { $sum: '$amount' } } }]),
      Booking.countDocuments({ status: 'pending' }),
      Temple.countDocuments({ isActive: true }),
      Ritual.countDocuments({ isActive: true }),
    ]);

    successResponse(res, {
      stats: {
        totalUsers, activeUsers, totalPandits, totalBookings,
        totalRevenue: totalRevenue[0]?.total || 0,
        pendingBookings, totalTemples, totalRituals,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getRevenueAnalytics = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { period = 'monthly' } = req.query;
    let groupFormat: any;
    if (period === 'daily') groupFormat = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    else if (period === 'yearly') groupFormat = { $dateToString: { format: '%Y', date: '$createdAt' } };
    else groupFormat = { $dateToString: { format: '%Y-%m', date: '$createdAt' } };

    const revenue = await Payment.aggregate([
      { $match: { status: 'paid' } },
      { $group: { _id: groupFormat, total: { $sum: '$amount' }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } },
    ]);

    const bookings = await Booking.aggregate([
      { $match: {} },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    successResponse(res, { revenue, bookings });
  } catch (error) {
    next(error);
  }
};

export const getUsersList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page = 1, limit = 20, role, search } = req.query;
    const filter: any = {};
    if (role) filter.role = role;
    if (search) filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { phone: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).select('-password -fcmTokens'),
      User.countDocuments(filter),
    ]);
    successResponse(res, { users, total, page: Number(page), totalPages: Math.ceil(total / Number(limit)) });
  } catch (error) {
    next(error);
  }
};

export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true });
    successResponse(res, user, 'User role updated');
  } catch (error) {
    next(error);
  }
};

export const toggleUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.isActive = !user.isActive;
    await user.save();
    successResponse(res, user, `User ${user.isActive ? 'activated' : 'deactivated'}`);
  } catch (error) {
    next(error);
  }
};
