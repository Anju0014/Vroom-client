// store/useAuthStore.ts
import { create } from 'zustand';
import {jwtDecode} from 'jwt-decode';
import type { UserPayload } from '@/types/authTypes';

interface AuthState {
  accessToken: string | null;
  user: UserPayload | null;

  setAccessToken: (token: string | null) => void;
  logout: () => void;

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
    if (!token) {
      set({ accessToken: null, user: null });
      return;
    }

    try {
      const decoded = jwtDecode<UserPayload>(token);

      set({
        accessToken: token,
        user: decoded,
      });
    } catch (error) {
      console.error('JWT decode failed', error);
      set({ accessToken: null, user: null });
    }
  },

  logout: () => {
    set({ accessToken: null, user: null });
  },

  isAuthenticated: () => {
    const user = get().user;
    if (!user?.exp) return false;
    return user.exp * 1000 > Date.now();
  },

  hasRole: (role) => {
    return get().user?.roles?.includes(role) ?? false;
  },

  isAdmin: () => get().hasRole('admin'),
  isOwner: () => get().hasRole('owner'),
  isUser: () => get().hasRole('user'),
}));

export default useAuthStore;
