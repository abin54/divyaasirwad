import { Request, Response, NextFunction } from 'express';
import Notification from '../models/Notification';
import { successResponse, paginatedResponse, errorResponse } from '../utils/response';
import { parsePagination } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

export const getUserNotifications = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { type, unread } = req.query;
    const filter: any = { user: req.userId };
    if (type) filter.type = type;
    if (unread === 'true') filter.isRead = false;

    const [notifications, total] = await Promise.all([
      Notification.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Notification.countDocuments(filter),
    ]);
    paginatedResponse(res, notifications, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    successResponse(res, null, 'Notification marked as read');
  } catch (error) {
    next(error);
  }
};

export const markAllAsRead = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await Notification.updateMany({ user: req.userId, isRead: false }, { isRead: true });
    successResponse(res, null, 'All notifications marked as read');
  } catch (error) {
    next(error);
  }
};

export const getUnreadCount = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const count = await Notification.countDocuments({ user: req.userId, isRead: false });
    successResponse(res, { count });
  } catch (error) {
    next(error);
  }
};
