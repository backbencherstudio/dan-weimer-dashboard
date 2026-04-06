import api from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard.types";

export const dashboardService = {
    getDashboard: async () => {
        const response = await api.get("/admin/dashboard");
        return response.data as DashboardResponse;
    },
}