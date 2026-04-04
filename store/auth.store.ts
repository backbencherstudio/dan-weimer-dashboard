import { create } from "zustand";
import { authConfig } from "@/config/auth.config";
import { cookie } from "@/lib/cookie";
import { authService } from "@/services/auth.service";
import { User } from "@/types/auth.types";

type AuthState = {
  user:       User | null;
  isLoading:  boolean;
  isHydrated: boolean;

  setUser: (user: User) => void;        // ← set from server
  login:   (email: string, password: string) => Promise<void>;
  logout:  () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user:       null,
  isLoading:  false,
  isHydrated: false,

  // ── called by ZustandHydrator from server data ────────────
  setUser: (user) => set({ user, isHydrated: true }),

  login: async (email, password) => {
    set({ isLoading: true });
    try {
      const res = await authService.login({ email, password });

      const { access_token, refresh_token } = res.authorization;
      cookie.set(authConfig.cookieName,    access_token, 1);
      cookie.set(authConfig.refreshCookie, refresh_token, 7);

      // fetch full profile after login
      const user = await authService.meClient();
      set({ user, isLoading: false, isHydrated: true });
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } finally {
      cookie.remove(authConfig.cookieName);
      cookie.remove(authConfig.refreshCookie);
      set({ user: null, isHydrated: false });
      window.location.href = "/login";
    }
  },
}));