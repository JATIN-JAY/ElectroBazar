import axios from 'axios';

const raw = import.meta.env.VITE_API_URL || '';
const base = raw ? `${raw.replace(/\/$/, '')}/api` : '/api';

const api = axios.create({
  baseURL: base,
});

export default api;
