import { createAxiosInstance } from "./createAxiosInstance";
import { useAuthStore } from "@/store/customer/authStore";

export const axiosCustomer = createAxiosInstance({
  refreshEndpoint: "/refreshToken",
  localStorageKey: "accessToken",
  getToken: () => useAuthStore.getState().accessToken,
  getUser: () => useAuthStore.getState().user,
  setAuth: (user, token) => useAuthStore.getState().setAuth(user, token),
  logout: () => useAuthStore.getState().logout(),
});