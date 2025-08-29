// ...existing code...
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// --- Enhanced CORS Configuration for Production ---
// Use FRONTEND_URL env var in Render (example: https://your-frontend.onrender.com).
// For quick testing you can set FRONTEND_URL='*' but prefer an exact origin in production.
const corsOrigin = process.env.FRONTEND_URL || '*';
const corsOptions = {
  origin: corsOrigin,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
};
app.use(cors(corsOptions));
console.log('CORS allowed origin:', corsOrigin);

// Middleware
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);

// Start Server and Test DB Connection
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`🚀 Server is running on port ${PORT} (listening on 0.0.0.0)`);
  try {
    await sequelize.authenticate();
    console.log('✅ Database Connection has been established successfully.');
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
});
// ...existing code...