import React from 'react';

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => setRating(star)} className={`cursor-pointer text-3xl transition-colors ${star <= rating ? 'text-yellow-400' : 'text-gray-500 hover:text-yellow-600'}`}>★</span>
      ))}
    </div>
  );
};

export default StarRating;