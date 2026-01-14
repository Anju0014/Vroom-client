
// import { useAuthStoreOwner } from "@/store/carOwner/authStore";
// import axios from "axios";

// const axiosInstanceOwner = ()=> {

//   const refreshEndpoint ="/owner/refreshToken";

//   const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//     withCredentials: true,
//   });

//   let isRefreshing = false;
//   let refreshPromise: Promise<string>|null = null;

  
//   instance.interceptors.request.use(
//     (config) => {
  
//         console.log("we are sending accessToken")
//     const accessToken = useAuthStoreOwner.getState().accessTokenOwner
//     if(accessToken){
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config
//     },
//     (error) => Promise.reject(error)
//   );
  
  


//   instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       if ((error.response?.status === 401|| error.response?.status === 403)  && !originalRequest._retry) {
        
//           console.log("Access token expired, refreshing...");

//         originalRequest._retry = true;

//         if (!isRefreshing) {
//           isRefreshing = true;
//           refreshPromise = instance
//             .post(refreshEndpoint,{},{withCredentials:true})
//             .then((res) => {
//               const newAccessToken = res.data.accessToken;
//               useAuthStoreOwner.getState().setAuthOwner(useAuthStoreOwner.getState().user!, newAccessToken);
//               localStorage.setItem('ownerAccessToken', newAccessToken);
//               isRefreshing = false;
//               return newAccessToken;
//             })
//             .catch((refreshError) => {
//               console.error("Refresh token expired or invalid", refreshError);
//               isRefreshing = false;
//               useAuthStoreOwner.getState().logout();
//               localStorage.removeItem('ownerAccessToken');
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

// export default axiosInstanceOwner;


// import { useAuthStoreOwner } from "@/store/carOwner/authStore";
// import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

// const axiosInstanceOwner = () => {
//   const refreshEndpoint = "/owner/refreshToken";

//   const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//     withCredentials: true, // required for sending refresh token cookie
//   });

//   let isRefreshing = false;
//   let refreshPromise: Promise<string> | null = null;

//   // Attach accessToken to every request
//   instance.interceptors.request.use(
//     (config: InternalAxiosRequestConfig) => {
//       const accessToken = useAuthStoreOwner.getState().accessTokenOwner;
//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Handle expired token in responses
//   instance.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//       const originalRequest: any = error.config;

//       // If token expired and we haven’t retried yet
//       if ((error.response?.status === 401 || error.response?.status === 403) && !originalRequest._retry) {
//         originalRequest._retry = true;

//         if (!isRefreshing) {
//           isRefreshing = true;
//           refreshPromise = instance
//             .post(refreshEndpoint, {}, { withCredentials: true })
//             .then((res) => {
//               const newAccessToken = res.data.accessToken;

//               // Update Zustand store
//               useAuthStoreOwner.getState().setAuthOwner(
//                 useAuthStoreOwner.getState().user!,
//                 newAccessToken
//               );

//               isRefreshing = false;
//               return newAccessToken;
//             })
//             .catch((refreshError) => {
//               console.error("Refresh token expired or invalid", refreshError);
//               isRefreshing = false;

//               // Clear store + logout
//               useAuthStoreOwner.getState().logout();
//               if (typeof window !== "undefined") {
//                 window.location.href = "/login";
//               }

//               return Promise.reject(refreshError);
//             });
//         }

//         try {
//           const newAccessToken = await refreshPromise!;
//           originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//           return instance(originalRequest); // retry original request
//         } catch (err) {
//           return Promise.reject(err);
//         }
//       }

//       return Promise.reject(error);
//     }
//   );

//   return instance;
// };

// export default axiosInstanceOwner;
