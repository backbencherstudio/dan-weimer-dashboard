import { authConfig } from "@/config/auth.config";
import { cookie } from "@/lib/cookie";
import api from "@/lib/axios";
import { LoginDto, LoginResponse, MeResponse, User } from "@/types/auth.types";
// import { cookies } from "next/headers";

export const authService = {
    login: async (body: LoginDto): Promise<LoginResponse> => {
        const { data } = await api.post("/auth/login", body);
        return data;
    },
    // ── server side (layout, server components) ───────────────
    // meServer: async (): Promise<User> => {
    //     throw new Error("meServer not yet implemented");
        
    // },

    // ── client side (axios) ───────────────────────────────────
    meClient: async (): Promise<User> => {
        const { data } = await api.get("/auth/me");
        return data.data;
    },

    refresh: async (refreshToken: string) => {
        const { data } = await api.post("/auth/refresh", { refresh_token: refreshToken });
        return data as LoginResponse;
    },

    logout: async (): Promise<void> => {
        // await api.post("/auth/logout");
        cookie.remove(authConfig.cookieName);
        cookie.remove(authConfig.refreshCookie);
    },
};