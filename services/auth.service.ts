import { authConfig } from "@/config/auth.config";
import { cookie } from "@/lib/cookie";
import api from "@/lib/axios";
import { LoginDto, LoginResponse, MeResponse, User } from "@/types/auth.types";
import axios from "axios";
// import { cookies } from "next/headers";

export const authService = {
    login: async (body: LoginDto): Promise<LoginResponse> => {
        try {
            const { data } = await api.post("/auth/login", body);
            return data;
        } catch (error) {
            if (axios.isAxiosError(error) && !error.response) {
                throw new Error("Unable to reach server. Please check your connection.");
            }
            throw error;
        }
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



    // forgot password
    forgotPassword: async (email: string) => {
        const { data } = await api.post("/auth/forgot-password", { email });
        return data;
    },


    // reset password ()
    resetPassword: async (email: string, token: string, password: string) => {
        const { data } = await api.post("/auth/reset-password", { email, token, password });
        return data;
    },

   
};