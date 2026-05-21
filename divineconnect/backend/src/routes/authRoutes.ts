import { Router } from 'express';
import { sendOtp, verifyOtp, googleLogin, refreshToken, getProfile, updateProfile, addFamilyMember, updateFcmToken, logout } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/google', googleLogin);
router.post('/refresh-token', refreshToken);
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.post('/family', authenticate, addFamilyMember);
router.post('/fcm-token', authenticate, updateFcmToken);
router.post('/logout', authenticate, logout);

export default router;
