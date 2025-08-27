// FILE: client/src/pages/MovieDetailsPage.jsx
// =======================================================
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const MovieDetailsPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                const [detailsRes, reviewsRes] = await Promise.all([
                    api.get(`/movies/details/${id}`),
                    api.get(`/reviews/${id}`)
                ]);
                setMovie(detailsRes.data);
                setReviews(reviewsRes.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch movie details.');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) return <p className="text-center text-ruby-bright animate-pulse p-10">Loading movie details...</p>;
    if (error) return <p className="text-center text-ruby-bright p-10">{error}</p>;
    if (!movie) return <p className="text-center text-text-muted p-10">Movie not found.</p>;

    return (
        <div className="bg-ruby-darkest min-h-screen p-4 sm:p-8">
            <div className="max-w-5xl mx-auto">
                <Link to="/" className="text-ruby-bright hover:underline mb-8 inline-block">&larr; Back to Home</Link>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <img src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} className="rounded-lg w-full shadow-lg border-2 border-ruby-primary" />
                    </div>
                    <div className="md:col-span-2">
                        <h1 className="text-4xl font-bold text-text-light">{movie.title}</h1>
                        <p className="text-text-muted mt-2">{movie.tagline}</p>
                        <div className="flex gap-4 my-4">
                            <span>Release: {movie.release_date}</span>
                            <span>Rating: {movie.vote_average.toFixed(1)} / 10</span>
                        </div>
                        <p>{movie.overview}</p>
                    </div>
                </div>
                
                <div className="mt-12">
                    <h2 className="text-3xl font-bold text-ruby-bright mb-6">User Reviews</h2>
                    <div className="space-y-6">
                        {reviews.length > 0 ? reviews.map(review => (
                            <div key={review.id} className="p-4 bg-ruby-darkest border-2 border-ruby-primary rounded-lg">
                                <p className="font-bold">{review.User.username} - <span className="text-yellow-400">{'★'.repeat(review.rating)}</span></p>
                                <p className="text-text-muted mt-2">{review.comment}</p>
                            </div>
                        )) : <p className="text-text-muted">No reviews yet for this movie.</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetailsPage;

