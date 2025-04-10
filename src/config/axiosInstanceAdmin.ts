
import axios from "axios";
import { useAuthStoreAdmin } from "@/store/admin/authStore";

const axiosInstanceAdmin = () => {
 
const refreshEndpoint =  "/admin/refreshToken";

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  });

  let isRefreshing = false;
  let refreshPromise: Promise<string>|null = null;

  instance.interceptors.request.use(
    (config) => {
        const accessToken = useAuthStoreAdmin.getState().accessTokenAdmin
        if(accessToken){
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config
        },
        (error) => Promise.reject(error)
    )
  
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if ((error.response?.status === 401|| error.response?.status === 403) && !originalRequest._retry) {
        
        console.log('AccessTokem from Admin Expired, Refreshing')
        //   console.log("Access token expired, refreshing...");
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = instance
            .post(refreshEndpoint,{},{withCredentials:true})
            .then((res) => {
              const newAccessToken = res.data.accessToken;
              localStorage.setItem('adminAccessToken', newAccessToken);
              useAuthStoreAdmin.getState().setAuthAdmin(useAuthStoreAdmin.getState().user!, newAccessToken)
              isRefreshing = false;
              return newAccessToken;
            })
            .catch((refreshError) => {
              console.error("Refresh token expired or invalid", refreshError);
              isRefreshing = false;
              useAuthStoreAdmin.getState().logout();
              localStorage.removeItem('adminAccessToken');
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

export default axiosInstanceAdmin;
