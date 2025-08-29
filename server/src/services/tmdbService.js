// =======================================================
// FILE: server/src/services/tmdbService.js (Corrected Export)
// =======================================================
import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_KEY = process.env.TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  params: { api_key: TMDB_API_KEY },
});

const tmdbService = {
  fetchPopularMovies: async () => {
    const { data } = await tmdbApi.get('/movie/popular');
    return data.results;
  },
  searchMovies: async (query) => {
    const { data } = await tmdbApi.get('/search/movie', { params: { query } });
    return data.results;
  },
  fetchMoviesByGenre: async (genreId) => {
    const { data } = await tmdbApi.get('/discover/movie', { params: { with_genres: genreId } });
    return data.results;
  },
  fetchMovieDetails: async (tmdbId) => {
    const { data } = await tmdbApi.get(`/movie/${tmdbId}`);
    return data;
  },
  fetchMovieVideos: async (tmdbId) => {
    const { data } = await tmdbApi.get(`/movie/${tmdbId}/videos`);
    return data.results;
  },
};

export default tmdbService;
