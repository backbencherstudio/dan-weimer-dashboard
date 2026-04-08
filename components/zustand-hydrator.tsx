"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth.store";
import { User } from "@/types/auth.types";

export function ZustandHydrator({ user }: { user: User }) {
    const setUser = useAuthStore((s) => s.setUser);

    useEffect(() => {
        if (user) {
            setUser(user);
        }
    }, [user, setUser]);

    return null;
}