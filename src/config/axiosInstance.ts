// import { useAuthStore } from "@/store/customer/authStore";
// import axios from "axios";

// const axiosInstance = () => {
  
//   const refreshEndpoint ="/refreshToken";

//   const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//     withCredentials: true,
//   });

//   let isRefreshing = false;
//   let refreshPromise: Promise<string>|null = null;



//   instance.interceptors.request.use(
//     (config) => {
//       const accessToken = useAuthStore.getState().accessToken
//           if(accessToken){
//               config.headers["Authorization"] = `Bearer ${accessToken}`;
//           }
//           return config
     
//     },
//     (error) => Promise.reject(error)
//   );
  
  

//   instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       if ((error.response?.status === 401|| error.response?.status === 403) && !originalRequest._retry) {
        
//           console.log("Access token expired, refreshing...");
//         originalRequest._retry = true;

//         if (!isRefreshing) {
//           isRefreshing = true;
//           refreshPromise = instance
//             .post(refreshEndpoint,{},{withCredentials:true})
//             .then((res) => {
//               console.log(res.data)
//               const newAccessToken = res.data.accessToken;
//               console.log('accessToken after new',newAccessToken)
//               console.log("existing user",useAuthStore.getState().user)
//               useAuthStore.getState().setAuth(useAuthStore.getState().user!, newAccessToken);
//               console.log("changed access",useAuthStore.getState().accessToken)
//               localStorage.setItem('accessToken', newAccessToken);
//               isRefreshing = false;
//               return newAccessToken;
//             })
//             .catch((refreshError) => {
//               console.error("Refresh token expired or invalid", refreshError);
//               isRefreshing = false;
//               useAuthStore.getState().logout();
//               localStorage.removeItem('accessToken');
//               window.location.href = "/login";
//               return Promise.reject(refreshError);
//             });
//         }

//         const newAccessToken = await refreshPromise;
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return instance(originalRequest);
//       }

//       return Promise.reject(error);
//     }
//   );

//   return instance;
// };

// export default axiosInstance;



