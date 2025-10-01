import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface AxiosOptions {
  refreshEndpoint: string;
  localStorageKey: string;
  getToken: () => string | null | undefined;
  getUser: () => any;
  setAuth: (user: any, token: string) => void;
  logout: () => void;
}

export const createAxiosInstance = (options: AxiosOptions) => {
  const {
    refreshEndpoint,
    localStorageKey,
    getToken,
    getUser,
    setAuth,
    logout,
  } = options;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  });

  let isRefreshing = false;
  let refreshPromise: Promise<string> | null = null;

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const accessToken = getToken();
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = instance
            .post(refreshEndpoint, {}, { withCredentials: true })
            .then((res) => {
              const newAccessToken = res.data.accessToken;
              setAuth(getUser(), newAccessToken);
              if (typeof window !== "undefined") {
                localStorage.setItem(localStorageKey, newAccessToken);
              }
              isRefreshing = false;
              return newAccessToken;
            })
            .catch((refreshError) => {
              console.error("Refresh token expired or invalid", refreshError);
              isRefreshing = false;
              logout();
              if (typeof window !== "undefined") {
                localStorage.removeItem(localStorageKey);
                window.location.href = "/login";
              }
              return Promise.reject(refreshError);
            });
        }

        try {
          const newAccessToken = await refreshPromise!;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return instance(originalRequest);
        } catch (err) {
          return Promise.reject(err);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};