// FILE: server/src/routes/authRoutes.js
// =======================================================
import express from 'express';
import { registerUser, loginUser, suggestUsername } from '../controllers/authController.js';

const router = express.Router();
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/suggest-username', suggestUsername);
export default router;
