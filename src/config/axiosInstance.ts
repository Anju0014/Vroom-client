import { useAuthStore } from "@/store/customer/authStore";
import axios from "axios";

const axiosInstance = () => {
  
  const refreshEndpoint ="/refreshToken";

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true,
  });

  let isRefreshing = false;
  let refreshPromise: Promise<string>|null = null;



  instance.interceptors.request.use(
    (config) => {
      const accessToken = useAuthStore.getState().accessToken
          if(accessToken){
              config.headers["Authorization"] = `Bearer ${accessToken}`;
          }
          return config
     
    },
    (error) => Promise.reject(error)
  );
  
  

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if ((error.response?.status === 401|| error.response?.status === 403) && !originalRequest._retry) {
        
          console.log("Access token expired, refreshing...");
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;
          refreshPromise = instance
            .post(refreshEndpoint,{},{withCredentials:true})
            .then((res) => {
              console.log(res.data)
              const newAccessToken = res.data.accessToken;
              useAuthStore.getState().setAuth(useAuthStore.getState().user!, newAccessToken);
              localStorage.setItem('accessToken', newAccessToken);
              isRefreshing = false;
              return newAccessToken;
            })
            .catch((refreshError) => {
              console.error("Refresh token expired or invalid", refreshError);
              isRefreshing = false;
              useAuthStore.getState().logout();
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















// import axios from "axios";

// const axiosInstance = (userType = "customer") => {
//   // console.log(userType)
//   // const accessTokenKey = userType === "carOwner" ? "carOwnerAccessToken" : "customerAccessToken";
//   const refreshEndpoint = userType === "carOwner" ? "/owner/refreshToken" : "/refreshToken";

//   const instance = axios.create({
//     baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
//     withCredentials: true,
//   });

//   let isRefreshing = false;
//   let refreshPromise: Promise<string>|null = null;

//   // instance.interceptors.request.use(
//   //   (config) => {
//   //     const accessToken =
//   //     typeof window !== "undefined"
//   //             ? localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
//   //             : null;

//   //     if (accessToken) {
//   //       config.headers["Authorization"] = `Bearer ${accessToken}`;
//   //     }
//   //     return config;
//   //   },
//   //   (error) => Promise.reject(error)
//   // );

//   instance.interceptors.request.use(
//     (config) => {
//       const accessToken =
//         typeof window !== "undefined"
//           ? localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken")
//           : null;
  
//       console.log("Access token being sent:", accessToken);
  
//       if (accessToken) {
//         config.headers["Authorization"] = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );
  
//   // instance.interceptors.request.use(
//   //   (config) => {
//   //     const accessToken = localStorage.getItem("accessToken");
//   //     // sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");
//   //     console.log("🔑 Access Token Being Sent:", accessToken);
//   //     return config;
//   //   },
//   //   (error) => Promise.reject(error)
//   // );


//   instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       if (error.response?.status === 401 && !originalRequest._retry) {
        
//           console.log("Access token expired, refreshing...");
//         originalRequest._retry = true;

//         if (!isRefreshing) {
//           isRefreshing = true;
//           refreshPromise = instance
//             .post(refreshEndpoint,{},{withCredentials:true})
//             .then((res) => {
//               const newAccessToken = res.data.accessToken;
//               localStorage.setItem('accessToken', newAccessToken);
//               isRefreshing = false;
//               return newAccessToken;
//             })
//             .catch((refreshError) => {
//               console.error("Refresh token expired or invalid", refreshError);
//               isRefreshing = false;
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
