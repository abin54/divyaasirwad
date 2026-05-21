import { Request, Response, NextFunction } from 'express';
import Ritual from '../models/Ritual';
import Deity from '../models/Deity';
import { successResponse, paginatedResponse } from '../utils/response';
import { parsePagination } from '../utils/helpers';

export const getRituals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { deity, category, type, popular, trending } = req.query;
    const filter: any = { isActive: true };
    if (deity) filter.deity = deity;
    if (category) filter.category = category;
    if (type) filter.type = { $in: [type, 'both'] };
    if (popular) filter.isPopular = true;
    if (trending) filter.isTrending = true;

    const [rituals, total] = await Promise.all([
      Ritual.find(filter).sort({ order: 1, isPopular: -1 }).skip(skip).limit(limit)
        .populate('deity', 'name nameHi slug icon'),
      Ritual.countDocuments(filter),
    ]);
    paginatedResponse(res, rituals, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getRitualBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ritual = await Ritual.findOne({ slug: req.params.slug, isActive: true })
      .populate('deity', 'name nameHi slug icon image')
      .populate('associatedDeities', 'name nameHi slug icon');
    if (!ritual) return res.status(404).json({ message: 'Ritual not found' });
    successResponse(res, ritual);
  } catch (error) {
    next(error);
  }
};

export const getTrendingPujas = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rituals = await Ritual.find({ isActive: true, isTrending: true })
      .sort({ order: 1 }).limit(10).populate('deity', 'name nameHi slug icon');
    successResponse(res, rituals);
  } catch (error) {
    next(error);
  }
};

export const getDeities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.query;
    const filter: any = { isActive: true };
    if (category) filter.category = category;
    const deities = await Deity.find(filter).sort({ order: 1 });
    successResponse(res, deities);
  } catch (error) {
    next(error);
  }
};

export const getDeityBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deity = await Deity.findOne({ slug: req.params.slug, isActive: true });
    if (!deity) return res.status(404).json({ message: 'Deity not found' });
    const rituals = await Ritual.find({ $or: [{ deity: deity._id }, { associatedDeities: deity._id }], isActive: true });
    successResponse(res, { deity, rituals });
  } catch (error) {
    next(error);
  }
};

export const getPujaRecommendations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { purpose } = req.query;
    const recommendations: Record<string, string[]> = {
      health: ['Dhanvantari Puja', 'Maha Mrityunjaya Jaap', 'Surya Namaskar'],
      wealth: ['Lakshmi Puja', 'Kuber Puja', 'Ganesh Puja'],
      marriage: ['Gauri Puja', 'Shiva Puja', 'Swayamvara Puja'],
      education: ['Saraswati Puja', 'Gayatri Jaap', 'Hayagriva Puja'],
      peace: ['Shanti Puja', 'Navgraha Puja', 'Vishnu Puja'],
      success: ['Hanuman Puja', 'Durga Puja', 'Kali Puja'],
    };
    const slugs = recommendations[purpose as string] || [];
    const rituals = await Ritual.find({ slug: { $in: slugs }, isActive: true }).populate('deity', 'name slug icon');
    successResponse(res, rituals);
  } catch (error) {
    next(error);
  }
};
