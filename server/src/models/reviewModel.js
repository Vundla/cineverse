// FILE: server/src/models/reviewModel.js (FIXED)
// =======================================================
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js';

const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  rating: { type: DataTypes.INTEGER, allowNull: false },
  comment: { type: DataTypes.TEXT },
  movie_id: { type: DataTypes.INTEGER, allowNull: false },
  user_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'reviews', createdAt: 'created_at', updatedAt: false });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

export default Review;