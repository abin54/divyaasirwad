import { Router } from 'express';
import { createBooking, getUserBookings, getBookingById, getBookingByBookingId, cancelBooking, getPanditBookings, updateBookingStatus, uploadCompletionMedia, getAllBookings } from '../controllers/bookingController';
import { authenticate, authorize } from '../middleware/auth';
import { upload, setUploadFolder } from '../middleware/upload';

const router = Router();

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getUserBookings);
router.get('/all', authenticate, authorize('admin', 'superadmin'), getAllBookings);
router.get('/pandit', authenticate, authorize('pandit'), getPanditBookings);
router.get('/tracking/:bookingId', getBookingByBookingId);
router.get('/:id', authenticate, getBookingById);
router.put('/:id/cancel', authenticate, cancelBooking);
router.put('/:id/status', authenticate, authorize('pandit', 'admin', 'superadmin'), updateBookingStatus);
router.post('/:id/media', authenticate, authorize('pandit'), setUploadFolder('pujas'), upload.array('media', 10), uploadCompletionMedia);

export default router;
