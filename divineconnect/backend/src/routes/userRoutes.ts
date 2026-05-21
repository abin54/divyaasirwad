import { Router } from 'express';
import { getUserProfile, updateUserProfile, addAddress, getAddresses, deleteAddress } from '../controllers/userController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.use(authenticate);

router.get('/profile', getUserProfile);
router.put('/profile', updateUserProfile);
router.post('/addresses', addAddress);
router.get('/addresses', getAddresses);
router.delete('/addresses/:index', deleteAddress);

export default router;
