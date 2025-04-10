"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../../types/authTypes";

interface AuthStateAdmin {
  user: IUser | null;
  accessTokenAdmin: string | null;
  setAuthAdmin: (user: IUser, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStoreAdmin = create<AuthStateAdmin>()(
  persist(
    (set) => ({
      user: null,
      accessTokenAdmin: null,

    
      setAuthAdmin: (user, accessTokenAdmin) => {
        set({ user, accessTokenAdmin });
      },

      logout: () => {
        set({ user: null, accessTokenAdmin: null });
        localStorage.removeItem("authStoreAdmin");
        sessionStorage.removeItem("provider");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("role");
        window.location.href = "/admin/login";
      },
    }),
    { name: "authStoreAdmin" }
  )
);
