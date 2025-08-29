// =======================================================
// FILE: server/src/services/aiService.js (Corrected Import)
// =======================================================
import axios from 'axios';
import Review from '../models/reviewModel.js';
import Favorite from '../models/favoriteModel.js';
import { Op } from 'sequelize';
import tmdbService from './tmdbService.js'; // <-- CORRECTED IMPORT

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
  const favorites = await Favorite.findAll({ where: { user_id: userId }, limit: 5 });
  const highRatedReviews = await Review.findAll({ where: { user_id: userId, rating: { [Op.gte]: 4 } }, limit: 5 });
  
  const favoriteIds = favorites.map(f => f.movie_id);
  const highRatedIds = highRatedReviews.map(r => r.movie_id);
  const seedMovieIds = [...new Set([...favoriteIds, ...highRatedIds])];

  if (seedMovieIds.length === 0) {
    return [];
  }

  // Use the corrected service object to call the method
  const seedMovieDetails = await Promise.all(seedMovieIds.map(id => tmdbService.fetchMovieDetails(id))); // <-- CORRECTED USAGE
  
  const userProfile = seedMovieDetails.map(m => `${m.title} (${m.genres.map(g => g.name).join('/')})`).join(', ');

  const prompt = `Based on a user who likes these movies: ${userProfile}. Please recommend 5 other movies they might enjoy. For each movie, provide only the title and the year of release in parenthesis. Respond with a comma-separated list and nothing else. Example: Inception (2010), The Dark Knight (2008)`;

  const response = await aiApi.post("/chat/completions", {
    model: "mistralai/mistral-7b-instruct:free",
    messages: [{ role: "user", content: prompt }],
  });

  const recommendedTitles = response.data.choices[0].message.content.split(',').map(t => t.trim());
  
  return recommendedTitles;
};

