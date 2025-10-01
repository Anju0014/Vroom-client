import { createAxiosInstance } from "./createAxiosInstance";
import { useAuthStoreOwner } from "@/store/carOwner/authStore";

export const axiosOwner = createAxiosInstance({
  refreshEndpoint: "/owner/refreshToken",
  localStorageKey: "ownerAccessToken",
  getToken: () => useAuthStoreOwner.getState().accessTokenOwner,
  getUser: () => useAuthStoreOwner.getState().user,
  setAuth: (user, token) => useAuthStoreOwner.getState().setAuthOwner(user, token),
  logout: () => useAuthStoreOwner.getState().logout(),
});