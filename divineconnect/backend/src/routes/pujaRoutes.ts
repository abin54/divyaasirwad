import { Router } from 'express';
import { getRituals, getRitualBySlug, getTrendingPujas, getDeities, getDeityBySlug, getPujaRecommendations } from '../controllers/pujaController';

const router = Router();

router.get('/rituals', getRituals);
router.get('/rituals/trending', getTrendingPujas);
router.get('/rituals/:slug', getRitualBySlug);
router.get('/deities', getDeities);
router.get('/deities/:slug', getDeityBySlug);
router.get('/recommendations', getPujaRecommendations);

export default router;
