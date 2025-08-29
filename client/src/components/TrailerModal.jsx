// =======================================================
// FILE: client/src/components/TrailerModal.jsx
// =======================================================
import React from 'react';

const TrailerModal = ({ trailerKey, onClose }) => {
    if (!trailerKey) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="modal-close-button">&times;</button>
                <iframe 
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                    frameBorder="0" 
                    allow="autoplay; encrypted-media" 
                    allowFullScreen
                    title="Movie Trailer"
                    className="trailer-iframe"
                ></iframe>
            </div>
        </div>
    );
};

export default TrailerModal;