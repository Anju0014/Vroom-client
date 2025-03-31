"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../../types/authTypes";

interface AuthStateAdmin {
  user: IUser | null;
  accessToken: string | null;
  setAuthAdmin: (user: IUser, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStoreAdmin = create<AuthStateAdmin>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

    
      setAuthAdmin: (user, accessToken) => {
        set({ user, accessToken });
      },

      logout: () => {
        set({ user: null, accessToken: null });
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
