// FILE: client/src/components/MovieCard.jsx
// =======================================================
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  return (
    <div className="bg-ruby-darkest rounded-lg shadow-lg overflow-hidden relative group border-2 border-ruby-dark transition-all duration-300 hover:border-ruby-bright hover:scale-105">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/500x750/2b0e0e/ffffff?text=No+Image'}
          alt={movie.title}
          className="w-full h-auto object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
          <h3 className="text-lg font-bold text-text-light">{movie.title}</h3>
          <p className="text-sm mt-2 line-clamp-4 text-text-muted">{movie.overview}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;