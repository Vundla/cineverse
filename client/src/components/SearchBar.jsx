// FILE: client/src/components/SearchBar.jsx
// =======================================================
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const handleSearch = (e) => { e.preventDefault(); if (query.trim()) { onSearch(query); } };

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-xl mx-auto">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for any movie..." 
        className="w-full p-4 rounded-full bg-brand-card text-text-light border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-brand-purple" 
      />
    </form>
  );
};

export default SearchBar;

