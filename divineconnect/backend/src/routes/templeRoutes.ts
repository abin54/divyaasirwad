import { Router } from 'express';
import { getTemples, getTempleBySlug, getTempleById, createTemple, updateTemple, deleteTemple, getFeaturedTemples, getCities, searchTemples } from '../controllers/templeController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getTemples);
router.get('/featured', getFeaturedTemples);
router.get('/cities', getCities);
router.get('/search', searchTemples);
router.get('/:slug', getTempleBySlug);
router.get('/id/:id', getTempleById);
router.post('/', authenticate, authorize('admin', 'superadmin', 'temple_admin'), createTemple);
router.put('/:id', authenticate, authorize('admin', 'superadmin', 'temple_admin'), updateTemple);
router.delete('/:id', authenticate, authorize('admin', 'superadmin'), deleteTemple);

export default router;
