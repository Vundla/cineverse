// FILE: client/src/components/GenreFilter.jsx (NEW - Expanded Genres)
// =======================================================
import React from 'react';

const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Sci-Fi' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' },
];

const GenreFilter = ({ onGenreSelect, activeGenre }) => {
    return (
        <div className="flex justify-center gap-2 sm:gap-4 my-8 flex-wrap">
            {genres.map(genre => (
                <button 
                    key={genre.id} 
                    onClick={() => onGenreSelect(genre.id, genre.name)}
                    className={`font-bold py-2 px-6 rounded-full transition-all duration-300 text-sm sm:text-base ${activeGenre === genre.name ? 'bg-brand-purple text-white scale-110 shadow-lg' : 'bg-brand-card text-text-muted hover:bg-brand-purple-hover hover:text-white'}`}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
};

export default GenreFilter;
