import { authConfig } from "@/config/auth.config";
import { cookies } from "next/headers";
import { User, MeResponse } from "@/types/auth.types";

export const authServerService = {
    meServer: async (): Promise<User> => {
        const cookieStore = await cookies();
        const token = cookieStore.get(authConfig.cookieName)?.value;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data: MeResponse = await res.json();
        return data.data;
    },
};