import api from "@/lib/axios";


export const liveOperationsService = {
    getLiveOperations: async () => {
        const response = await api.get("/live-operations");
        return response.data 
    },
}