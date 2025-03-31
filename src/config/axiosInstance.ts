

import axios from "axios";

const axiosInstance = (userType = "customer") => {
  // const accessTokenKey = userType === "carOwner" ? "carOwnerAccessToken" : "customerAccessToken";
  const refreshEndpoint = userType === "carOwner" ? "/owner/refreshToken" : "/refreshToken";

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  });

  let isRefreshing = false;
  let refreshPromise: Promise<string>|null = null;

  
  instance.interceptors.request.use(
    (config) => {
      const accessToken =
      typeof window !== "undefined"
              ? localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
              : null;

      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = instance
            .post(refreshEndpoint,{},{withCredentials:true})
            .then((res) => {
              const newAccessToken = res.data.accessToken;
              localStorage.setItem('accessToken', newAccessToken);
              isRefreshing = false;
              return newAccessToken;
            })
            .catch((refreshError) => {
              console.error("Refresh token expired or invalid", refreshError);
              isRefreshing = false;
              localStorage.removeItem('accessToken');
              window.location.href = "/login";
              return Promise.reject(refreshError);
            });
        }

        const newAccessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return instance(originalRequest);
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default axiosInstance;
