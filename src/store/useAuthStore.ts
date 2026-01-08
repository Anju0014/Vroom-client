// stores/useAuthStore.ts
import { create } from 'zustand';
import jwtDecode from 'jwt-decode';
import type { UserPayload } from '@/types/authTypes'; // adjust path as needed

interface AuthState {
  accessToken: string | null;
  user: UserPayload | null;

  setAccessToken: (token: string | null) => void;
  logout: () => void;

  // Selectors
  isAuthenticated: () => boolean;
  hasRole: (role: string) => boolean;
  isAdmin: () => boolean;
  isOwner: () => boolean;
  isUser: () => boolean;
}

const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,

  setAccessToken: (token) => {
    if (token) {
      try {
        const decoded = jwtDecode<UserPayload>(token); // <-- Properly typed!
        set({ accessToken: token, user: decoded });
      } catch (error) {
        console.error('Invalid access token', error);
        set({ accessToken: null, user: null });
      }
    } else {
      set({ accessToken: null, user: null });
    }
  },

  logout: () => {
    set({ accessToken: null, user: null });
  },

  isAuthenticated: () => !!get().accessToken,

  hasRole: (role) => get().user?.roles?.includes(role) ?? false,

  isAdmin: () => get().hasRole('admin'),
  isOwner: () => get().hasRole('owner'),
  isUser: () => get().hasRole('user'),
}));

export default useAuthStore;