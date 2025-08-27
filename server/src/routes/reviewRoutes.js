// FILE: server/src/routes/reviewRoutes.js
// =======================================================
import express from 'express';
import { getMovieReviews, createReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.route('/:movieId').get(getMovieReviews);
router.route('/').post(protect, createReview);
export default router;