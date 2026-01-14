// lib/axiosInstance.ts
import axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from 'axios';
import useAuthStore from '@/store/useAuthStore';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

/* ----------------------------------
   Main API instance
---------------------------------- */
const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* ----------------------------------
   Refresh-only instance
---------------------------------- */
const refreshApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

/* ----------------------------------
   Retry flag type
---------------------------------- */
interface AxiosRequestWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}

/* ----------------------------------
   Request interceptor
---------------------------------- */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().accessToken;

    if (token) {
      // Axios v1 safe
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ----------------------------------
   Response interceptor
---------------------------------- */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest =
      error.config as AxiosRequestWithRetry;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await refreshApi.post('/refresh');

        // Update Zustand
        useAuthStore
          .getState()
          .setAccessToken(data.accessToken);

        // ✅ Ensure headers exist
        if (!originalRequest.headers) {
          originalRequest.headers = {};
        }

        originalRequest.headers.Authorization =
          `Bearer ${data.accessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
