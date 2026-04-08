import api from "@/lib/axios";
import { DashboardResponse } from "@/types/dashboard.types";

export const dashboardService = {
    getDashboard: async () => {
        const response = await api.get("/admin/dashboard?year=2026&activity_limit=5&shipment_limit=8");
        return response.data as DashboardResponse;
    },
}

