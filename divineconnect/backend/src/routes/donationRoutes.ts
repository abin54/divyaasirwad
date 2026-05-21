import { Router } from 'express';
import { createDonation, getUserDonations, getTempleDonations } from '../controllers/donationController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createDonation);
router.get('/', authenticate, getUserDonations);
router.get('/temple/:templeId', getTempleDonations);

export default router;
