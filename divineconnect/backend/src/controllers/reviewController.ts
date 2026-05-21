import { Request, Response, NextFunction } from 'express';
import Review from '../models/Review';
import Booking from '../models/Booking';
import Temple from '../models/Temple';
import { successResponse, paginatedResponse, errorResponse } from '../utils/response';
import { parsePagination } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

export const createReview = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { booking, temple, pandit, yatra, rating, title, description, images } = req.body;
    const bookingExists = await Booking.findById(booking);
    if (!bookingExists) return errorResponse(res, 'Booking not found', 404);
    if (bookingExists.user.toString() !== req.userId) return errorResponse(res, 'Unauthorized', 403);

    const review = await Review.create({
      user: req.userId, booking, temple, pandit, yatra,
      rating, title, description, images,
      isVerifiedPurchase: bookingExists.status === 'completed',
    });

    if (temple) {
      const templeData = await Temple.findById(temple);
      if (templeData) {
        const allReviews = await Review.find({ temple, isVisible: true });
        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        await Temple.findByIdAndUpdate(temple, { rating: avgRating, reviewCount: allReviews.length });
      }
    }

    await Booking.findByIdAndUpdate(booking, { isReviewed: true });
    successResponse(res, review, 'Review submitted', 201);
  } catch (error) {
    next(error);
  }
};

export const getTempleReviews = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const [reviews, total] = await Promise.all([
      Review.find({ temple: req.params.templeId, isVisible: true }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate('user', 'name photo'),
      Review.countDocuments({ temple: req.params.templeId, isVisible: true }),
    ]);
    paginatedResponse(res, reviews, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const markHelpful = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    await Review.findByIdAndUpdate(req.params.id, { $inc: { helpfulCount: 1 } });
    successResponse(res, null, 'Marked as helpful');
  } catch (error) {
    next(error);
  }
};
