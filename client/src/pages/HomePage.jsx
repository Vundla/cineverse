// FILE: client/src/pages/HomePage.jsx (Updated with Trailer Logic)
// =======================================================
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import GenreFilter from '../components/GenreFilter';
import TrailerModal from '../components/TrailerModal';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState('Popular Movies');
  const [activeGenre, setActiveGenre] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const fetchMovies = async (endpoint, title, genreName = null) => {
    try {
      setLoading(true);
      setPageTitle(title);
      setActiveGenre(genreName);
      const { data } = await api.get(endpoint);
      setMovies(data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch movies. Please check if your backend server is running and the TMDB API key is correct.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies('/movies/popular', 'Popular Movies'); }, []);

  const handleSearch = (query) => {
    fetchMovies(`/movies/search?query=${query}`, `Search Results: "${query}"`);
  };

  const handleGenreSelect = (genreId, genreName) => {
    fetchMovies(`/movies/genre/${genreId}`, `${genreName} Movies`, genreName);
  };

  const handlePlayTrailer = async (movieId) => {
    try {
      const { data: videos } = await api.get(`/movies/videos/${movieId}`);
      const officialTrailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
      if (officialTrailer) {
        setTrailerKey(officialTrailer.key);
      } else {
        alert('No official trailer found for this movie.');
      }
    } catch (error) {
      alert('Could not fetch trailer.');
    }
  };

  const renderContent = () => {
    if (loading) return <p className="text-center text-brand-purple text-xl animate-pulse">Loading movies...</p>;
    if (error) return <p className="text-center text-red-400 text-xl">{error}</p>;
    if (movies.length === 0) return <p className="text-center text-text-muted text-xl">No movies found.</p>;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} onPlayTrailer={handlePlayTrailer} />)}
      </div>
    );
  };

  return (
    <>
      <TrailerModal trailerKey={trailerKey} onClose={() => setTrailerKey(null)} />
      <div className="p-4 sm:p-8 bg-brand-dark min-h-screen">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl font-black text-text-light my-8 tracking-tighter">CINEVERSE</h1>
          <SearchBar onSearch={handleSearch} />
          <GenreFilter onGenreSelect={handleGenreSelect} activeGenre={activeGenre} />
          <h2 className="text-2xl font-bold text-text-light mb-6 text-left">{pageTitle}</h2>
          <main>{renderContent()}</main>
        </div>
      </div>
    </>
  );
};

export default HomePage;