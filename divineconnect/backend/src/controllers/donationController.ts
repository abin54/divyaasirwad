import { Request, Response, NextFunction } from 'express';
import Donation from '../models/Donation';
import { successResponse, paginatedResponse, errorResponse } from '../utils/response';
import { parsePagination, generateDonationId } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

export const createDonation = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { temple, cause, amount, type, isAnonymous, message, dedication } = req.body;
    const donationId = generateDonationId();

    const donation = await Donation.create({
      donationId, user: req.userId, temple, cause, amount,
      type, isAnonymous, message, dedication,
      status: 'pending',
    });

    successResponse(res, donation, 'Donation created', 201);
  } catch (error) {
    next(error);
  }
};

export const getUserDonations = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const [donations, total] = await Promise.all([
      Donation.find({ user: req.userId }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate('temple', 'name mainImage'),
      Donation.countDocuments({ user: req.userId }),
    ]);
    paginatedResponse(res, donations, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getTempleDonations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const [donations, total] = await Promise.all([
      Donation.find({ temple: req.params.templeId, status: 'completed' }).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate('user', 'name'),
      Donation.countDocuments({ temple: req.params.templeId, status: 'completed' }),
    ]);
    paginatedResponse(res, donations, total, page, limit);
  } catch (error) {
    next(error);
  }
};
