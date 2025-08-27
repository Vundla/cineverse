// FILE: server/src/controllers/authController.js
// =======================================================
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { getAiUsernameSuggestion } from '../services/aiService.js';

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (await User.findOne({ where: { email } })) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ username, email, password_hash: password });
    if (user) {
      res.status(201).json({ id: user.id, username: user.username, email: user.email, token: generateToken(user.id) });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (user && (await user.matchPassword(password))) {
      res.json({ id: user.id, username: user.username, email: user.email, token: generateToken(user.id) });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

export const suggestUsername = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ message: 'Prompt is required' });
  try {
    const suggestions = await getAiUsernameSuggestion(prompt);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get AI suggestion' });
  }
};
