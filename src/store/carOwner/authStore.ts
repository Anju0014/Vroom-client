"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../../types/authTypes";

interface AuthStateOwner {
  user: IUser | null;
  accessToken: string | null;
  setAuthOwner: (accessToken: string, user: IUser) => void;
  logout: () => void;
}

export const useAuthStoreOwner = create<AuthStateOwner>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

      setAuthOwner: (accessToken, user) => {
        set({ user, accessToken });
      },

      logout: () => {
        set({ user: null, accessToken: null });
        localStorage.removeItem("authStoreOwner");
     
      },
    }),
    { name: "authStoreOwner" }
  )
);
