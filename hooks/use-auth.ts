import { useAuthStore } from "@/store/auth.store";
import { cookie } from "@/lib/cookie";
import { authConfig } from "@/config/auth.config";

export function useAuth() {
  const user       = useAuthStore((s) => s.user);
  const isLoading  = useAuthStore((s) => s.isLoading);
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const login      = useAuthStore((s) => s.login);
  const logout     = useAuthStore((s) => s.logout);

  return {
    user,
    isLoading,
    isHydrated,
    login,
    logout,
    isAuthenticated: !!cookie.get(authConfig.cookieName),
    isAdmin: user?.type === "ADMIN",
  };
}