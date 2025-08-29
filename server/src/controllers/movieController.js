// FILE: server/src/controllers/movieController.js (Updated)
// =======================================================
import tmdbService from '../services/tmdbService.js'; // <-- Import the service object

export const getPopularMovies = async (req, res) => {
  try { res.json(await tmdbService.fetchPopularMovies()); } 
  catch (e) { res.status(500).json({ message: 'Error fetching popular movies' }); }
};

export const searchMovies = async (req, res) => {
  try { res.json(await tmdbService.searchMovies(req.query.query)); }
  catch (e) { res.status(500).json({ message: 'Error searching movies' }); }
};

export const getMoviesByGenre = async (req, res) => {
  try { res.json(await tmdbService.fetchMoviesByGenre(req.params.genreId)); }
  catch (e) { res.status(500).json({ message: 'Error fetching movies by genre' }); }
};

export const getMovieDetails = async (req, res) => {
  try { res.json(await tmdbService.fetchMovieDetails(req.params.id)); }
  catch (e) { res.status(404).json({ message: 'Movie not found' }); }
};

// NEW CONTROLLER FOR VIDEOS
export const getMovieVideos = async (req, res) => {
  try { res.json(await tmdbService.fetchMovieVideos(req.params.id)); }
  catch (e) { res.status(404).json({ message: 'Videos not found' }); }
};
