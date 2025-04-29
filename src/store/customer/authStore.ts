// "use client";  

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { IUser } from "../../types/authTypes";

// interface AuthState {
//   user: IUser | null;
//   accessToken: string | null;
//   setAuth: (user: IUser, accessToken: string) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       user: null,
//       accessToken: null,
      

//       setAuth: (user, accessToken) => {
//         set({ user, accessToken });
//       },

//       logout: () => {
//         set({ user: null, accessToken: null });
//         localStorage.removeItem("authStore"); 
//         sessionStorage.removeItem("provider");  
//         sessionStorage.removeItem("userEmail");
//         sessionStorage.removeItem("role");
//         window.location.href = "/login";
//       },
//     }),
//     { name: "authStore" }
//   )
// );


'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IUser } from '../../types/authTypes';
// import { deleteCookie } from 'cookies-next';

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
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('provider');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('googleLoginRole');
        // deleteCookie('customerAccessToken');
        console.log('Logged out, cookies and sessionStorage cleared');
      },
    }),
    {
      name: 'authStore',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
