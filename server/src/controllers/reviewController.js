// FILE: server/src/controllers/reviewController.js
// =======================================================
import Review from '../models/reviewModel.js';
import User from '../models/userModel.js';

export const getMovieReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { movie_id: req.params.movieId },
      include: { model: User, attributes: ['username'] },
      order: [['created_at', 'DESC']],
    });
    res.json(reviews);
  } catch (e) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
};

export const createReview = async (req, res) => {
  const { movieId, rating, comment } = req.body;
  try {
    const review = await Review.create({ movie_id: movieId, rating, comment, user_id: req.user.id });
    res.status(201).json(review);
  } catch (e) {
    res.status(500).json({ message: 'Error creating review' });
  }
};
