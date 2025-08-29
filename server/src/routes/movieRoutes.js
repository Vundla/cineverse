// FILE: server/src/routes/movieRoutes.js (Updated)
// =======================================================
import express from 'express';
import { 
    getPopularMovies, 
    searchMovies, 
    getMovieDetails, 
    getMovieVideos, // <-- Import new controller
    getMoviesByGenre
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/popular', getPopularMovies);
router.get('/search', searchMovies);
router.get('/genre/:genreId', getMoviesByGenre);
router.get('/details/:id', getMovieDetails);
router.get('/videos/:id', getMovieVideos); // <-- Add new route

export default router;
