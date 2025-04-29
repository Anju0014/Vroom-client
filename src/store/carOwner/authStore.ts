
// "use client";

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { IUser } from "../../types/authTypes";
// import { deleteCookie } from 'cookies-next';

// interface AuthStateOwner {
//   user: IUser | null;
//   accessTokenOwner: string | null;
//   setAuthOwner: (user: IUser, accessToken: string) => void;
//   logout: () => void;
// }

// export const useAuthStoreOwner = create<AuthStateOwner>()(
//   persist(
//     (set) => ({
//       user: null,
//       accessTokenOwner: null,

    
//       setAuthOwner: (user, accessTokenOwner) => {
//         set({ user, accessTokenOwner });
//       },

//       logout: () => {
//         set({ user: null, accessTokenOwner: null });
//         localStorage.removeItem("authStoreOwner");
//         sessionStorage.removeItem("provider");
//         sessionStorage.removeItem("userEmail");
//         sessionStorage.removeItem("role");
//         deleteCookie('carOwnerAccessToken');
//         window.location.href = "/login";
//       },
//     }),
//     { name: "authStoreOwner" }
//   )
// );
'use client';

import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { IUser } from '../../types/authTypes';
// import { deleteCookie } from 'cookies-next';

interface AuthStateOwner {
  user: IUser | null;
  accessTokenOwner: string | null;
  setAuthOwner: (user: IUser, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStoreOwner = create<AuthStateOwner>()(
  persist(
    (set) => ({
      user: null,
      accessTokenOwner: null,
      setAuthOwner: (user, accessTokenOwner) => {
        set({ user, accessTokenOwner });
      },
      logout: () => {
        set({ user: null, accessTokenOwner: null });
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('provider');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('googleLoginRole');
        // deleteCookie('carOwnerAccessToken');
        console.log('Logged out, cookies and sessionStorage cleared');
      },
    }),
    {
      name: 'authStoreOwner',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);