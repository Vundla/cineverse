// FILE: server/src/controllers/movieController.js
// =======================================================
import { fetchPopularMoviesFromTMDB, searchMoviesOnTMDB, fetchMovieDetailsFromTMDB } from '../services/tmdbService.js';
import { getAiMovieRecommendations } from '../services/aiService.js';
import Favorite from '../models/favoriteModel.js';

export const getPopularMovies = async (req, res) => {
  try { res.json(await fetchPopularMoviesFromTMDB()); } 
  catch (e) { res.status(500).json({ message: 'Error fetching popular movies' }); }
};

export const searchMovies = async (req, res) => {
  try { res.json(await searchMoviesOnTMDB(req.query.query)); }
  catch (e) { res.status(500).json({ message: 'Error searching movies' }); }
};

export const getMovieDetails = async (req, res) => {
  try { res.json(await fetchMovieDetailsFromTMDB(req.params.id)); }
  catch (e) { res.status(404).json({ message: 'Movie not found' }); }
};

export const getRecommendations = async (req, res) => {
    try { res.json(await getAiMovieRecommendations(req.user.id)); }
    catch (e) { res.status(500).json({ message: 'Error fetching AI recommendations' }); }
};

export const addFavorite = async (req, res) => {
  const { movieId } = req.body;
  const userId = req.user.id;
  try {
    if (await Favorite.findOne({ where: { user_id: userId, movie_id: movieId } })) {
      return res.status(400).json({ message: 'Movie already in favorites' });
    }
    const favorite = await Favorite.create({ user_id: userId, movie_id: movieId });
    res.status(201).json(favorite);
  } catch (e) {
    res.status(500).json({ message: 'Error adding favorite' });
  }
};

export const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({ where: { user_id: req.user.id } });
    const movieDetails = await Promise.all(favorites.map(f => fetchMovieDetailsFromTMDB(f.movie_id)));
    res.json(movieDetails);
  } catch (e) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};

