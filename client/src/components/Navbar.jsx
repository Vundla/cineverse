// FILE: client/src/components/Navbar.jsx
// =======================================================
import React from 'react';
import { Link } from 'react-router-dom';

const DiamondIcon = () => (
  <svg className="w-10 h-10 text-ruby-bright filter drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path d="M50 0L100 50L50 100L0 50L50 0Z" stroke="white" strokeWidth="4" />
    <path d="M50 0L10 50L50 100L90 50L50 0Z" opacity="0.5" />
    <line x1="0" y1="50" x2="100" y2="50" stroke="white" strokeWidth="2" />
    <line x1="50" y1="0" x2="50" y2="100" stroke="white" strokeWidth="2" />
  </svg>
);

const Navbar = ({ children }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 p-4 bg-ruby-darkest border-2 border-ruby-primary rounded-lg">
      <Link to="/" className="flex items-center gap-3">
        <DiamondIcon />
        <h1 className="text-3xl font-bold text-ruby-bright">CINEVERSE</h1>
      </Link>
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {children}
      </div>
    </header>
  );
};

export default Navbar;
