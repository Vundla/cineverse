// FILE: server/src/models/genreModel.js
// =======================================================
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Genre = sequelize.define('Genre', {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { tableName: 'genres', timestamps: false });

export default Genre;