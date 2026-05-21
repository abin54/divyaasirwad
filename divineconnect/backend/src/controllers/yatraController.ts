import { Request, Response, NextFunction } from 'express';
import Yatra from '../models/Yatra';
import { successResponse, paginatedResponse, errorResponse } from '../utils/response';
import { parsePagination } from '../utils/helpers';

export const getYatras = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { state, category, region, featured } = req.query;
    const filter: any = { isActive: true };
    if (state) filter.state = state;
    if (category) filter.category = category;
    if (region) filter.region = region;
    if (featured) filter.isFeatured = true;

    const [yatras, total] = await Promise.all([
      Yatra.find(filter).sort({ isFeatured: -1, rating: -1 }).skip(skip).limit(limit),
      Yatra.countDocuments(filter),
    ]);
    paginatedResponse(res, yatras, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getYatraBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const yatra = await Yatra.findOne({ slug: req.params.slug, isActive: true })
      .populate('destinations.temple', 'name nameHi mainImage address');
    if (!yatra) return errorResponse(res, 'Yatra not found', 404);
    successResponse(res, yatra);
  } catch (error) {
    next(error);
  }
};

export const getFeaturedYatras = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const yatras = await Yatra.find({ isActive: true, isFeatured: true }).sort({ rating: -1 }).limit(8);
    successResponse(res, yatras);
  } catch (error) {
    next(error);
  }
};
