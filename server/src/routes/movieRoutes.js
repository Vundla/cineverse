// FILE: server/src/routes/movieRoutes.js
// =======================================================
import express from 'express';
import { getPopularMovies, searchMovies, getMovieDetails, getRecommendations, addFavorite, getFavorites } from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();
router.get('/popular', getPopularMovies);
router.get('/search', searchMovies);
router.get('/details/:id', getMovieDetails);
router.get('/recommendations', protect, getRecommendations);
router.route('/favorites').get(protect, getFavorites).post(protect, addFavorite);
export default router;
