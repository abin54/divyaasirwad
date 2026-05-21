import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { successResponse, errorResponse } from '../utils/response';

export const getPanditProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user || user.role !== 'pandit') return errorResponse(res, 'Pandit not found', 404);
    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const getPanditSchedule = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { date } = req.query;
    const filter: any = { pandit: req.params.id, status: { $in: ['confirmed', 'in_progress'] } };
    if (date) filter.scheduledDate = { $gte: new Date(date as string), $lt: new Date(new Date(date as string).setDate(new Date(date as string).getDate() + 1)) };
    successResponse(res, []);
  } catch (error) {
    next(error);
  }
};

export const updatePanditAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { available, from, to } = req.body;
    successResponse(res, { available, from, to }, 'Availability updated');
  } catch (error) {
    next(error);
  }
};

export const getPanditEarnings = async (req: Request, res: Response, next: NextFunction) => {
  try {
    successResponse(res, { totalEarnings: 0, pendingPayout: 0, completedPujas: 0 });
  } catch (error) {
    next(error);
  }
};
