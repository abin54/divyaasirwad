import { Router } from 'express';
import authRoutes from './authRoutes';
import templeRoutes from './templeRoutes';
import pujaRoutes from './pujaRoutes';
import bookingRoutes from './bookingRoutes';
import paymentRoutes from './paymentRoutes';
import yatraRoutes from './yatraRoutes';
import adminRoutes from './adminRoutes';
import panditRoutes from './panditRoutes';
import reviewRoutes from './reviewRoutes';
import donationRoutes from './donationRoutes';
import notificationRoutes from './notificationRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/temples', templeRoutes);
router.use('/pujas', pujaRoutes);
router.use('/bookings', bookingRoutes);
router.use('/payments', paymentRoutes);
router.use('/yatras', yatraRoutes);
router.use('/admin', adminRoutes);
router.use('/pandit', panditRoutes);
router.use('/reviews', reviewRoutes);
router.use('/donations', donationRoutes);
router.use('/notifications', notificationRoutes);
router.use('/users', userRoutes);

router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'DivineConnect API' });
});

export default router;
