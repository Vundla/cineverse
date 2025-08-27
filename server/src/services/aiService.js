// FILE: server/src/services/aiService.js
// =======================================================
import axios from 'axios';
import Review from '../models/reviewModel.js';
import Favorite from '../models/favoriteModel.js';
import { Op } from 'sequelize';
import { fetchMovieDetailsFromTMDB } from './tmdbService.js';

const aiApi = axios.create({
  baseURL: "https://openrouter.ai/api/v1",
  headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` }
});

export const getAiUsernameSuggestion = async (prompt) => {
  const response = await aiApi.post("/chat/completions", {
    model: "mistralai/mistral-7b-instruct:free",
    messages: [{ role: "user", content: `Suggest 3 cool, short, one-word usernames based on the theme: "${prompt}". Respond with just the usernames, separated by commas, and nothing else.` }],
  });
  return response.data.choices[0].message.content.split(',').map(u => u.trim());
};

export const getAiMovieRecommendations = async (userId) => {
  // 1. Fetch user's taste profile: favorites and high-rated movies
  const favorites = await Favorite.findAll({ where: { user_id: userId }, limit: 5 });
  const highRatedReviews = await Review.findAll({ where: { user_id: userId, rating: { [Op.gte]: 4 } }, limit: 5 });
  
  const favoriteIds = favorites.map(f => f.movie_id);
  const highRatedIds = highRatedReviews.map(r => r.movie_id);
  const seedMovieIds = [...new Set([...favoriteIds, ...highRatedIds])];

  if (seedMovieIds.length === 0) {
    return []; // Cannot generate recommendations without data
  }

  // 2. Fetch details for these seed movies to create a rich prompt
  const seedMovieDetails = await Promise.all(seedMovieIds.map(id => fetchMovieDetailsFromTMDB(id)));
  
  const userProfile = seedMovieDetails.map(m => `${m.title} (${m.genres.map(g => g.name).join('/')})`).join(', ');

  // 3. Construct a powerful prompt for the AI
  const prompt = `Based on a user who likes these movies: ${userProfile}. Please recommend 5 other movies they might enjoy. For each movie, provide only the title and the year of release in parenthesis. Respond with a comma-separated list and nothing else. Example: Inception (2010), The Dark Knight (2008)`;

  // 4. Call the AI
  const response = await aiApi.post("/chat/completions", {
    model: "mistralai/mistral-7b-instruct:free",
    messages: [{ role: "user", content: prompt }],
  });

  // 5. The AI will return movie titles. We'd then need to search TMDB for these titles to get their full details.
  // This is a simplified version. A production system would parse the names and then search TMDB for each one.
  const recommendedTitles = response.data.choices[0].message.content.split(',').map(t => t.trim());
  
  // For now, we just return the titles as a proof of concept.
  return recommendedTitles;
};

