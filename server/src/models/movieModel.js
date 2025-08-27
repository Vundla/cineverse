// FILE: server/src/models/movieModel.js
// =======================================================
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Movie = sequelize.define('Movie', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tmdb_id: { type: DataTypes.INTEGER, allowNull: false, unique: true },
  title: { type: DataTypes.STRING, allowNull: false },
  overview: { type: DataTypes.TEXT },
  release_date: { type: DataTypes.DATE },
  poster_path: { type: DataTypes.STRING }
}, { tableName: 'movies', timestamps: false });

export default Movie;