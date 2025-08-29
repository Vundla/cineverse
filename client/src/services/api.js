// ...existing code...
import axios from 'axios';

const DEFAULT_API = 'http://localhost:5001/api';
// use Vite env var when deployed (set VITE_API_URL=https://your-backend.onrender.com/api)
const API_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || DEFAULT_API;

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// helper to set/unset Authorization header
export const setAuthToken = (token) => {
  if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete api.defaults.headers.common['Authorization'];
};

// initialize auth header from localStorage if present
try {
  const stored = JSON.parse(localStorage.getItem('userInfo') || 'null');
  if (stored?.token) setAuthToken(stored.token);
} catch (e) {
  // ignore parse errors
}

// global response interceptor to handle 401 (optional)
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401) {
      localStorage.removeItem('userInfo');
      setAuthToken(null);
    }
    return Promise.reject(err);
  }
);

export default api;
// ...existing code...