// FILE: server/src/services/tmdbService.js
// =======================================================
import axios from 'axios';
import Movie from '../models/movieModel.js';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY },
});

// Fetches a movie from TMDB and caches it in our local database
export const getAndCacheMovie = async (tmdbId) => {
  let movie = await Movie.findOne({ where: { tmdb_id: tmdbId } });
  if (movie) {
    return movie;
  }

  const { data } = await tmdbApi.get(`/movie/${tmdbId}`);
  movie = await Movie.create({
    tmdb_id: data.id,
    title: data.title,
    overview: data.overview,
    release_date: data.release_date,
    poster_path: data.poster_path,
  });
  return movie;
};

export const fetchPopularMoviesFromTMDB = async () => {
  const { data } = await tmdbApi.get('/movie/popular');
  return data.results;
};

export const searchMoviesOnTMDB = async (query) => {
  const { data } = await tmdbApi.get('/search/movie', { params: { query } });
  return data.results;
};

export const fetchMovieDetailsFromTMDB = async (tmdbId) => {
    const { data } = await tmdbApi.get(`/movie/${tmdbId}`);
    return data;
};

export const fetchMovieRecommendationsFromTMDB = async (tmdbId) => {
    const { data } = await tmdbApi.get(`/movie/${tmdbId}/recommendations`);
    return data.results;
};
