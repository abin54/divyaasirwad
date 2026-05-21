import { Request, Response, NextFunction } from 'express';
import Booking from '../models/Booking';
import Ritual from '../models/Ritual';
import Temple from '../models/Temple';
import { successResponse, paginatedResponse, errorResponse } from '../utils/response';
import { parsePagination, generateBookingId } from '../utils/helpers';
import { AuthRequest } from '../middleware/auth';

export const createBooking = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { temple, ritual, deity, packageType, type, devotees, scheduledDate, scheduledTime, specialRequests, address, pandit } = req.body;

    const ritualData = await Ritual.findById(ritual);
    if (!ritualData) return errorResponse(res, 'Ritual not found', 404);

    const pricing = ritualData.pricing[packageType as keyof typeof ritualData.pricing];
    const bookingId = generateBookingId();

    const booking = await Booking.create({
      bookingId,
      user: req.userId,
      temple,
      ritual,
      deity,
      pandit,
      packageType,
      type,
      address: type === 'home' ? address : undefined,
      devotees: devotees || [{ name: req.user?.name, relation: 'self' }],
      scheduledDate: new Date(scheduledDate),
      scheduledTime,
      specialRequests,
      amount: pricing,
      discount: 0,
      totalAmount: pricing,
    });

    if (temple) {
      await Temple.findByIdAndUpdate(temple, { $inc: { totalBookings: 1 } });
    }

    successResponse(res, booking, 'Booking created', 201);
  } catch (error) {
    next(error);
  }
};

export const getUserBookings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { status } = req.query;
    const filter: any = { user: req.userId };
    if (status) filter.status = status;

    const [bookings, total] = await Promise.all([
      Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate('temple', 'name nameHi mainImage')
        .populate('ritual', 'name nameHi icon')
        .populate('deity', 'name nameHi icon'),
      Booking.countDocuments(filter),
    ]);

    paginatedResponse(res, bookings, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const getBookingById = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('temple', 'name nameHi mainImage address')
      .populate('ritual', 'name nameHi description')
      .populate('deity', 'name nameHi')
      .populate('pandit', 'name photo phone')
      .populate('payment');
    if (!booking) return errorResponse(res, 'Booking not found', 404);
    if (booking.user.toString() !== req.userId && req.userRole !== 'admin' && booking.pandit?.toString() !== req.userId) {
      return errorResponse(res, 'Unauthorized', 403);
    }
    successResponse(res, booking);
  } catch (error) {
    next(error);
  }
};

export const getBookingByBookingId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.bookingId })
      .populate('temple', 'name mainImage address')
      .populate('ritual', 'name icon')
      .populate('deity', 'name icon')
      .populate('pandit', 'name photo');
    if (!booking) return errorResponse(res, 'Booking not found', 404);
    successResponse(res, booking);
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { reason } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return errorResponse(res, 'Booking not found', 404);
    if (['completed', 'cancelled', 'refunded'].includes(booking.status)) {
      return errorResponse(res, 'Booking cannot be cancelled', 400);
    }
    const diffHours = (new Date(booking.scheduledDate).getTime() - Date.now()) / (1000 * 60 * 60);
    const refundAmount = diffHours > 24 ? booking.totalAmount : booking.totalAmount * 0.5;

    booking.status = 'cancelled';
    booking.cancelledBy = req.userRole === 'admin' ? 'admin' : 'user';
    booking.cancellationReason = reason || 'Cancelled by user';
    booking.cancelledAt = new Date();
    booking.refundAmount = refundAmount;
    await booking.save();

    successResponse(res, booking, 'Booking cancelled');
  } catch (error) {
    next(error);
  }
};

export const getPanditBookings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { status, date } = req.query;
    const filter: any = { pandit: req.userId };
    if (status) filter.status = status;
    if (date) filter.scheduledDate = new Date(date as string);

    const [bookings, total] = await Promise.all([
      Booking.find(filter).sort({ scheduledDate: 1 }).skip(skip).limit(limit)
        .populate('user', 'name phone')
        .populate('ritual', 'name')
        .populate('deity', 'name'),
      Booking.countDocuments(filter),
    ]);
    paginatedResponse(res, bookings, total, page, limit);
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { status, notes } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return errorResponse(res, 'Booking not found', 404);

    const validTransitions: Record<string, string[]> = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['in_progress', 'cancelled'],
      in_progress: ['completed'],
    };

    if (!validTransitions[booking.status]?.includes(status)) {
      return errorResponse(res, `Cannot transition from ${booking.status} to ${status}`, 400);
    }

    booking.status = status;
    if (status === 'completed') booking.completionNotes = notes;
    await booking.save();

    successResponse(res, booking, `Booking ${status}`);
  } catch (error) {
    next(error);
  }
};

export const uploadCompletionMedia = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return errorResponse(res, 'Booking not found', 404);
    if (booking.pandit?.toString() !== req.userId && req.userRole !== 'admin') {
      return errorResponse(res, 'Unauthorized', 403);
    }
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return errorResponse(res, 'No files uploaded', 400);
    }
    const files = req.files as Express.Multer.File[];
    const media = files.map((f) => ({
      type: f.mimetype.startsWith('video') ? 'video' : 'image' as const,
      url: `/uploads/pujas/${f.filename}`,
      uploadedAt: new Date(),
    }));
    booking.completionMedia.push(...media);
    await booking.save();
    successResponse(res, booking.completionMedia, 'Media uploaded');
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { page, limit, skip } = parsePagination(req.query);
    const { status, fromDate, toDate, temple, pandit } = req.query;
    const filter: any = {};
    if (status) filter.status = status;
    if (fromDate || toDate) {
      filter.scheduledDate = {};
      if (fromDate) filter.scheduledDate.$gte = new Date(fromDate as string);
      if (toDate) filter.scheduledDate.$lte = new Date(toDate as string);
    }
    if (temple) filter.temple = temple;
    if (pandit) filter.pandit = pandit;

    const [bookings, total] = await Promise.all([
      Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit)
        .populate('user', 'name phone email')
        .populate('temple', 'name')
        .populate('ritual', 'name')
        .populate('deity', 'name')
        .populate('pandit', 'name phone'),
      Booking.countDocuments(filter),
    ]);
    paginatedResponse(res, bookings, total, page, limit);
  } catch (error) {
    next(error);
  }
};
