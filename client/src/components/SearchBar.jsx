// FILE: client/src/components/SearchBar.jsx
// =======================================================
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const handleSearch = (e) => { e.preventDefault(); if (query.trim()) { onSearch(query); } };
  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for a movie..." className="w-full p-3 rounded-l-full bg-ruby-darkest text-text-light border-2 border-ruby-primary focus:outline-none focus:ring-2 focus:ring-ruby-bright" />
      <button type="submit" className="bg-ruby-primary hover:bg-ruby-bright text-text-light font-bold py-3 px-6 rounded-r-full border-y-2 border-r-2 border-ruby-primary">Search</button>
    </form>
  );
};

export default SearchBar;

