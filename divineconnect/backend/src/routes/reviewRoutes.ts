import { Router } from 'express';
import { createReview, getTempleReviews, markHelpful } from '../controllers/reviewController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/', authenticate, createReview);
router.get('/temple/:templeId', getTempleReviews);
router.post('/:id/helpful', authenticate, markHelpful);

export default router;
