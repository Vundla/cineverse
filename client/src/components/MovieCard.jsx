// FILE: client/src/components/MovieCard.jsx (NEW - With Trailer Logic)
// =======================================================
import React from 'react';

const MovieCard = ({ movie, onPlayTrailer }) => {
  const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div 
        className="bg-brand-card rounded-lg shadow-lg overflow-hidden group transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
        onClick={() => onPlayTrailer(movie.id)}
    >
        <div className="relative">
          <img
            src={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : 'https://placehold.co/500x750/1E293B/E2E8F0?text=No+Image'}
            alt={movie.title}
            className="w-full h-auto object-cover aspect-[2/3]"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white/80" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
           </div>
        </div>
        <div className="p-4">
          <h3 className="text-md font-bold text-text-light truncate group-hover:text-brand-purple transition-colors">{movie.title}</h3>
          <p className="text-sm text-text-muted">{releaseYear}</p>
        </div>
    </div>
  );
};

export default MovieCard;
