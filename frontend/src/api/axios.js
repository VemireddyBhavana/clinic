import axios from 'axios';

// In production (Vercel): set VITE_API_URL = https://your-app.onrender.com/api
// In development: defaults to http://localhost:5000/api
const baseURL = import.meta.env.VITE_API_URL ||
  (typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : '/api');

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
