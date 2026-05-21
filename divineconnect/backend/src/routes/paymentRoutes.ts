import { Router } from 'express';
import { createOrder, verifyPayment, getPaymentStatus, refundPayment, getTransactions } from '../controllers/paymentController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/create-order', authenticate, createOrder);
router.post('/verify', authenticate, verifyPayment);
router.get('/transactions', authenticate, getTransactions);
router.get('/:paymentId', getPaymentStatus);
router.post('/:id/refund', authenticate, refundPayment);

export default router;
