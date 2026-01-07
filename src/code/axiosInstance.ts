import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/store/customer/authStore';
import { useAuthStoreAdmin } from '@/store/admin/authStore';
import { useAuthStoreOwner } from '@/store/carOwner/authStore';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// Helper to get refresh endpoint
const getRefreshEndpoint = (url: string) => {
  if (url.startsWith('/admin')) return '/admin/refreshToken';
  if (url.startsWith('/owner') || url.startsWith('/carOwner')) return '/owner/refreshToken';
  return '/refreshToken'; // customer
};

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

// Request interceptor to attach token dynamically
instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const url = config.url || '';
  let token: string | null = null;

  if (url.startsWith('/admin')) token = useAuthStoreAdmin.getState().accessTokenAdmin;
  else if (url.startsWith('/owner') || url.startsWith('/carOwner')) token = useAuthStoreOwner.getState().accessTokenOwner;
  else token = useAuthStore.getState().accessToken;

  if (token) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// Response interceptor to handle refresh token
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = instance.post(getRefreshEndpoint(originalRequest.url), {}, { withCredentials: true })
          .then((res) => {
            const newAccessToken = res.data.accessToken;

           if (originalRequest.url.startsWith('/admin')) {
          const adminUser = useAuthStoreAdmin.getState().user;
          if (adminUser) {
            useAuthStoreAdmin.getState().setAuthAdmin(adminUser, newAccessToken);
          }
        } else if (originalRequest.url.startsWith('/owner') || originalRequest.url.startsWith('/carOwner')) {
          const ownerUser = useAuthStoreOwner.getState().user;
          if (ownerUser) {
            useAuthStoreOwner.getState().setAuthOwner(ownerUser, newAccessToken);
          }
        } else {
          const customerUser = useAuthStore.getState().user;
          if (customerUser) {
            useAuthStore.getState().setAuth(customerUser, newAccessToken);
          }
        }
            // if (originalRequest.url.startsWith('/admin')) useAuthStoreAdmin.getState().setAuthAdmin(useAuthStoreAdmin.getState().user, newAccessToken);
            // else if (originalRequest.url.startsWith('/owner') || originalRequest.url.startsWith('/carOwner')) useAuthStoreOwner.getState().setAuthOwner(useAuthStoreOwner.getState().user, newAccessToken);
            // else useAuthStore.getState().setAuth(useAuthStore.getState().user, newAccessToken);

            isRefreshing = false;
            return newAccessToken;
          })
          .catch((refreshError) => {
            console.error('Refresh token expired or invalid', refreshError);

            // Logout all stores if refresh fails
            useAuthStore.getState().logout();
            useAuthStoreOwner.getState().logout();
            useAuthStoreAdmin.getState().logout();

            isRefreshing = false;
            if (typeof window !== 'undefined') window.location.href = '/login';
            return Promise.reject(refreshError);
          });
      }

      try {
        const newAccessToken = await refreshPromise!;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
