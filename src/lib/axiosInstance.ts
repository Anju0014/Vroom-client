// lib/axiosInstance.js
import axios from 'axios';
import useAuthStore from '@/store/useAuthStore';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  withCredentials: true, // Required to send/receive httpOnly refreshToken cookie
});

// Request interceptor: Attach access token if available
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle 401 by refreshing token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Only retry once to prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // This calls backend /refresh — refreshToken cookie is sent automatically
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/refresh`,
          {},
          { withCredentials: true }
        );

        // Update store with new access token
        useAuthStore.getState().setAccessToken(data.accessToken);

        // Update the header and retry the original request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed → force logout
        useAuthStore.getState().logout();
        // Redirect to login (adjust path as needed)
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;