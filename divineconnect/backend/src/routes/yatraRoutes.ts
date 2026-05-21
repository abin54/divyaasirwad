import { Router } from 'express';
import { getYatras, getYatraBySlug, getFeaturedYatras } from '../controllers/yatraController';

const router = Router();

router.get('/', getYatras);
router.get('/featured', getFeaturedYatras);
router.get('/:slug', getYatraBySlug);

export default router;
