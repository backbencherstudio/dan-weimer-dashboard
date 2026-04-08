import axios, { AxiosRequestConfig } from "axios";
import { authConfig } from "@/config/auth.config";
import { cookie } from "@/lib/cookie";

const api = axios.create({
  baseURL:         process.env.NEXT_PUBLIC_API_URL,
  withCredentials: authConfig.httpOnly,
});

// ── Attach token ──────────────────────────────────────────────
api.interceptors.request.use((config) => {
  const token = cookie.get(authConfig.cookieName);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Handle 401 + refresh ──────────────────────────────────────
let isRefreshing = false;
let failedQueue: { resolve: Function; reject: Function }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => (error ? p.reject(error) : p.resolve(token)));
  failedQueue = [];
};

const clearAndRedirect = () => {
  cookie.remove(authConfig.cookieName);
  cookie.remove(authConfig.refreshCookie);
  window.location.href = "/login";
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config as AxiosRequestConfig & { _retry?: boolean };
    const status   = error.response?.status;

    if (status !== 401)    return Promise.reject(error);
    if (original._retry)   { clearAndRedirect(); return Promise.reject(error); }

    if (!authConfig.refreshEnabled) {
      clearAndRedirect();
      return Promise.reject(error);
    }

    const refreshToken = cookie.get(authConfig.refreshCookie);
    if (!refreshToken) { clearAndRedirect(); return Promise.reject(error); }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((newToken) => {
        original.headers = {
          ...original.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return api(original);
      }).catch(Promise.reject);
    }

    original._retry = true;
    isRefreshing    = true;

    try {
      // ── Your backend refresh response matches LoginResponse ──
      const data = await authService.refresh(refreshToken);

      const newAccessToken  = data.authorization.access_token;
      const newRefreshToken = data.authorization.refresh_token;

      cookie.set(authConfig.cookieName,    newAccessToken, 1);
      cookie.set(authConfig.refreshCookie, newRefreshToken, 7);

      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      original.headers = {
        ...original.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return api(original);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAndRedirect();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

// ── avoid circular import — inline the refresh call ───────────
const authService = {
  refresh: async (refreshToken: string) => {
    const { data } = await api.post("/auth/refresh", {
      refresh_token: refreshToken,
    });
    return data;
  },
};

export default api;


