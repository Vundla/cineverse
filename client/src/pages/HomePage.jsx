// FILE: client/src/pages/HomePage.jsx
// =======================================================
import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Navbar from '../components/Navbar';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pageTitle, setPageTitle] = useState('Popular Movies');

  const fetchMovies = async (endpoint, title) => {
    try {
      setLoading(true);
      setPageTitle(title);
      const { data } = await api.get(endpoint);
      setMovies(data);
      setError(null);
    } catch (err) {
      setError(`Failed to fetch movies.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMovies('/movies/popular', 'Popular Movies'); }, []);

  const renderContent = () => {
    if (loading) return <p className="text-center text-ruby-bright animate-pulse">Loading data...</p>;
    if (error) return <p className="text-center text-ruby-bright">{error}</p>;
    if (movies.length === 0) return <p className="text-center text-text-muted">No movies found.</p>;
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-8 bg-ruby-darkest min-h-screen">
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className="mb-8"><SearchBar onSearch={(query) => fetchMovies(`/movies/search?query=${query}`, `Search Results for "${query}"`)} /></div>
        <h2 className="text-3xl font-bold text-ruby-bright mb-6">{pageTitle}</h2>
        <main>{renderContent()}</main>
      </div>
    </div>
  );
};

export default HomePage;