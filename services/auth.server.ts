import { authConfig } from "@/config/auth.config";
import { cookies } from "next/headers";
import { User, MeResponse } from "@/types/auth.types";

export const authServerService = {
    meServer: async (): Promise<User> => {
        const cookieStore = await cookies();
        const token = cookieStore.get(authConfig.cookieName)?.value;

        let res: Response;

        try {
            res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${token}` },
                cache: "no-store",
            });
        } catch (error) {
            throw new Error("Unable to reach authentication server. Please try again later.");
        }

        if (!res.ok) {
            if (res.status === 401) throw new Error("Unauthorized");
            throw new Error(`Auth server error: ${res.status}`);
        }

        const data: MeResponse = await res.json();
        return data.data;
    },
};