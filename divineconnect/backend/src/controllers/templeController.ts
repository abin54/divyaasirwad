import { Request, Response, NextFunction } from 'express';
import Temple from '../models/Temple';
import { successResponse, paginatedResponse, errorResponse } from '../utils/response';
import { parsePagination } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

export const getTemples = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { city, state, deity, category, lat, lng, radius, search, sort } = req.query;
    const filter: any = { isActive: true, isDeleted: false };

    if (city) filter['address.city'] = { $regex: city, $options: 'i' };
    if (state) filter['address.state'] = { $regex: state, $options: 'i' };
    if (deity) filter.deities = { $in: [deity] };
    if (category) filter.category = category;
    if (search) filter.$text = { $search: search };
    if (lat && lng && radius) {
      filter.location = {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng as string), parseFloat(lat as string)] },
          $maxDistance: parseInt(radius as string) * 1000,
        },
      };
    }

    let sortOption: any = { totalBookings: -1 };
    if (sort === 'rating') sortOption = { rating: -1 };
    if (sort === 'name') sortOption = { name: 1 };

    const [temples, total] = await Promise.all([
      Temple.find(filter).sort(sortOption).skip(skip).limit(limit).populate('deity', 'name nameHi slug icon'),
      Temple.countDocuments(filter),
    ]);

    paginatedResponse(res, temples, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getTempleBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const temple = await Temple.findOne({ slug: req.params.slug, isActive: true })
      .populate('deity', 'name nameHi slug icon image')
      .populate('deities', 'name nameHi slug icon')
      .populate('pandits', 'name photo rating');
    if (!temple) return errorResponse(res, 'Temple not found', 404);
    successResponse(res, temple);
  } catch (error) {
    next(error);
  }
};

export const getTempleById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const temple = await Temple.findById(req.params.id)
      .populate('deity', 'name nameHi slug icon image')
      .populate('deities', 'name nameHi slug icon');
    if (!temple) return errorResponse(res, 'Temple not found', 404);
    successResponse(res, temple);
  } catch (error) {
    next(error);
  }
};

export const createTemple = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const temple = await Temple.create({ ...req.body, createdBy: req.userId });
    successResponse(res, temple, 'Temple created', 201);
  } catch (error) {
    next(error);
  }
};

export const updateTemple = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const temple = await Temple.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!temple) return errorResponse(res, 'Temple not found', 404);
    successResponse(res, temple, 'Temple updated');
  } catch (error) {
    next(error);
  }
};

export const deleteTemple = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const temple = await Temple.findByIdAndUpdate(req.params.id, { isDeleted: true, isActive: false });
    if (!temple) return errorResponse(res, 'Temple not found', 404);
    successResponse(res, null, 'Temple deleted');
  } catch (error) {
    next(error);
  }
};

export const getFeaturedTemples = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const temples = await Temple.find({ isActive: true, isDeleted: false, category: { $in: ['famous', 'pilgrimage'] } })
      .sort({ totalBookings: -1, rating: -1 }).limit(10).populate('deity', 'name nameHi slug icon');
    successResponse(res, temples);
  } catch (error) {
    next(error);
  }
};

export const getCities = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const cities = await Temple.distinct('address.city', { isActive: true });
    successResponse(res, cities.sort());
  } catch (error) {
    next(error);
  }
};

export const searchTemples = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q } = req.query;
    if (!q) return errorResponse(res, 'Search query required', 400);
    const temples = await Temple.find({
      isActive: true,
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { 'address.city': { $regex: q, $options: 'i' } },
        { 'address.state': { $regex: q, $options: 'i' } },
        { 'address.area': { $regex: q, $options: 'i' } },
      ],
    }).limit(20).populate('deity', 'name slug icon');
    successResponse(res, temples);
  } catch (error) {
    next(error);
  }
};
