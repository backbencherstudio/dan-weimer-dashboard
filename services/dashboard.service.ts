import api from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard.types";

export const dashboardService = {
    getDashboardStats: async () => {
        const response = await api.get("/dashboard");
        return response.data as DashboardResponse;
    },
}