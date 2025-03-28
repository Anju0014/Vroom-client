// "use client";

// import { create } from "zustand";
// import { persist,createJSONStorage } from "zustand/middleware";
// import { IUser } from "../../types/authTypes";

// interface AuthStateOwner {
//   user: IUser | null;
//   accessToken: string | null;
//   setAuthOwner: (accessToken: string, user: IUser) => void;
//   logout: () => void;
// }

// export const useAuthStoreOwner = create<AuthStateOwner>()(
//   persist(
//     (set) => ({
//       user: null,
//       accessToken: null,

//       setAuthOwner: (user,accessToken) => {
//         set({ user, accessToken });
//       },

//       logout: () => {
//         set({ user: null, accessToken: null });
//         localStorage.removeItem("authStoreOwner");
     
//       },
//     }),
//     {
//         name: "authStoreOwner",
//         storage: createJSONStorage(() => localStorage),  // Ensures proper storage handling
//         // onRehydrateStorage: () => (state) => {
//         //   console.log("Rehydrating Zustand Store:", state);
//         // }
//     }
//   )
// );

"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUser } from "../../types/authTypes";

interface AuthStateOwner {
  user: IUser | null;
  accessToken: string | null;
  setAuthOwner: (user: IUser, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStoreOwner = create<AuthStateOwner>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,

    
      setAuthOwner: (user, accessToken) => {
        set({ user, accessToken });
      },

      logout: () => {
        set({ user: null, accessToken: null });
        localStorage.removeItem("authStoreOwner");
        sessionStorage.removeItem("provider");
        sessionStorage.removeItem("userEmail");
        sessionStorage.removeItem("role");
        window.location.href = "/login";
      },
    }),
    { name: "authStoreOwner" }
  )
);
