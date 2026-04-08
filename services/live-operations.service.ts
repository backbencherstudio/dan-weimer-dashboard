import api from "@/lib/axios";


export const liveOperationsService = {
    getLiveOperations: async () => {
        const response = await api.get("/admin/order?status=EN_ROUTE");
        return response.data 
    },
}

