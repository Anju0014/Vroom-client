// import { createAxiosInstance } from "./createAxiosInstance";
// import { useAuthStoreAdmin } from "@/store/admin/authStore";

// export const axiosAdmin = createAxiosInstance({
//   refreshEndpoint: "/admin/refreshToken",
//   localStorageKey: "adminAccessToken",
//   getToken: () => useAuthStoreAdmin.getState().accessTokenAdmin,
//   getUser: () => useAuthStoreAdmin.getState().user,
//   setAuth: (user, token) => useAuthStoreAdmin.getState().setAuthAdmin(user, token),
//   logout: () => useAuthStoreAdmin.getState().logout(),
// });