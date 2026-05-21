import { Router } from 'express';
import { getPanditProfile, getPanditSchedule, updatePanditAvailability, getPanditEarnings } from '../controllers/panditController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.use(authenticate, authorize('pandit'));

router.get('/profile', getPanditProfile);
router.get('/schedule', getPanditSchedule);
router.put('/availability', updatePanditAvailability);
router.get('/earnings', getPanditEarnings);

export default router;
