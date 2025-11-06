import axios from 'axios';
import { store } from '../app/store';
import { clearToken } from '@/features/authSlice';
import saveToken from '@/constants/saveToken';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const stored = localStorage.getItem('token');
  if (!stored) return config;

  const { token } = JSON.parse(stored);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.config && error.config.url.includes('/refresh-token')) {
      store.dispatch(clearToken());
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token');
      if (!refreshToken) {
        store.dispatch(clearToken());
        return Promise.reject(error);
      }
      const refreshResponse = await axios.post(
        `${import.meta.env.VITE_API_URL}/refresh-token`,
        { fcm_token: refreshToken, platform: 'web' }
      );
      if (refreshResponse.status === 200) {
        const newToken = refreshResponse.data.data.accessToken;
        const newRefreshToken = refreshResponse.data.data.refreshToken;
        saveToken(newToken, 3600, newRefreshToken);
        error.config.headers['Authorization'] = `Bearer ${newToken}`;
        return apiClient.request(error.config);
      }
    }
    return Promise.reject(error);
  }
);


export default apiClient;





// import axios from 'axios';
// // import { store } from '../app/store';

// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use((config) => {
//   const stored = localStorage.getItem('token');
//   if(!stored) return config;
//   const {token} = stored ? JSON.parse(stored) : null;
//   if (token && token !== null) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default apiClient;
