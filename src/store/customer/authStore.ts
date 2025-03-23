"use client";  

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../../types/authTypes";

interface AuthState {
  user: IUser | null;
  accessToken: string | null;
  setAuth: (user: IUser, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      

      setAuth: (user, accessToken) => {
        set({ user, accessToken });
      },

      logout: () => {
        set({ user: null, accessToken: null });
        localStorage.removeItem("authStore"); 
        sessionStorage.removeItem("provider");  
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("role");
        window.location.href = "/login";
      },
    }),
    { name: "authStore" }
  )
);
