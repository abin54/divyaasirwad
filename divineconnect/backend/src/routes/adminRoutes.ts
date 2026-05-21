import { Router } from 'express';
import { getDashboardStats, getRevenueAnalytics, getUsersList, updateUserRole, toggleUserStatus } from '../controllers/adminController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate, authorize('admin', 'superadmin'));

router.get('/dashboard', getDashboardStats);
router.get('/analytics', getRevenueAnalytics);
router.get('/users', getUsersList);
router.put('/users/:id/role', updateUserRole);
router.put('/users/:id/toggle-status', toggleUserStatus);

export default router;
