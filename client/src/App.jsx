// ...existing code...
import React, { useState, useEffect } from 'react';
import api from './services/api';
import TrailerModal from './components/TrailerModal';
import './App.css';

const genres = [
  { id: 28, name: 'Action' }, { id: 12, name: 'Adventure' }, { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' }, { id: 80, name: 'Crime' }, { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' }, { id: 10751, name: 'Family' }, { id: 14, name: 'Fantasy' },
  { id: 27, name: 'Horror' }, { id: 9648, name: 'Mystery' }, { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' }, { id: 53, name: 'Thriller' }
];

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState('Popular Movies');
  const [activeGenre, setActiveGenre] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

  const normalizeResponse = (data) => {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.results)) return data.results;
    if (Array.isArray(data.data)) return data.data;
    return [];
  };

  const fetchMovies = async (endpoint, title, genreName = null) => {
    try {
      setLoading(true);
      setPageTitle(title);
      setActiveGenre(genreName);
      setError(null);

      const res = await api.get(endpoint);
      const payload = res?.data;
      const list = normalizeResponse(payload);

      setMovies(list);
      // keep error null so UI shows "No movies found" when list is empty
      if (!Array.isArray(list) || list.length === 0) {
        setMovies([]);
      }
    } catch (err) {
      if (!err?.response) {
        setError('Failed to fetch. Possible causes: CORS not enabled, wrong API URL (VITE_API_URL), or server is down.');
        console.error('Fetch error (no response) - baseURL:', api.defaults?.baseURL, err);
      } else {
        setError(`Failed to fetch (${err.response.status}). Check backend logs and TMDB_API_KEY.`);
        console.error('Fetch error:', err.response?.data || err.message);
      }
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try { console.info('Using API baseURL:', api.defaults?.baseURL); } catch (e) {}
    fetchMovies('/movies/popular', 'Popular Movies');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchMovies(`/movies/search?query=${encodeURIComponent(searchQuery)}`, `Search Results: "${searchQuery}"`);
    }
  };

  const handleGenreSelect = (genreId, genreName) => {
    fetchMovies(`/movies/genre/${genreId}`, `${genreName} Movies`, genreName);
  };

  const handlePlayTrailer = async (movieId) => {
    try {
      const res = await api.get(`/movies/videos/${movieId}`);
      const videos = Array.isArray(res?.data) ? res.data : res?.data?.results ?? [];
      const officialTrailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
      if (officialTrailer) {
        setTrailerKey(officialTrailer.key);
      } else {
        alert('No official trailer found.');
      }
    } catch (error) {
      alert('Could not fetch trailer. Check backend and CORS.');
    }
  };

  const renderContent = () => {
    if (loading) return <p className="status-message">Loading movies...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!movies || movies.length === 0) return <p className="status-message">No movies found.</p>;

    return (
      <div className="movies-grid">
        {movies.map(movie => {
          const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
          return (
            <div key={movie.id} className="movie-card" onClick={() => handlePlayTrailer(movie.id)}>
              <div className="relative">
                <img
                  src={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/500x750/1E293B/E2E8F0?text=No+Image'}
                  alt={movie.title}
                  className="movie-poster"
                />
                <div className="play-icon-overlay">
                  <svg xmlns="http://www.w3.org/2000/svg" className="play-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-year">{releaseYear}</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">CINEVERSE</h1>
          <form className="search-container" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for a movie..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="genre-filter">
            {genres.map(genre => (
              <button
                key={genre.id}
                type="button"
                onClick={() => handleGenreSelect(genre.id, genre.name)}
                className={`genre-button ${activeGenre === genre.name ? 'active' : ''}`}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </header>

        <h2 className="page-title">{pageTitle}</h2>
        <main>
          {renderContent()}
        </main>
      </div>
    </>
  );
}

export default App;