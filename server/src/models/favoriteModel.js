// FILE: server/src/models/favoriteModel.js
// =======================================================
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './userModel.js';

const Favorite = sequelize.define('Favorite', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  user_id: { type: DataTypes.INTEGER, allowNull: false },
  movie_id: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'favorites', createdAt: 'created_at', updatedAt: false });

User.hasMany(Favorite, { foreignKey: 'user_id' });
Favorite.belongsTo(User, { foreignKey: 'user_id' });

export default Favorite;