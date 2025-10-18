import axios from 'axios';
// import { store } from '../app/store';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const stored = localStorage.getItem('token');
  if(!stored) return config;
  const {token, expire} = stored ? JSON.parse(stored) : null;
  if (token && token !== null) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
