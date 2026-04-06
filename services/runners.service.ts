import api from "@/lib/axios";

export const runnersService = {
    getRunners: async (page: number, limit: number) => {
        const response = await api.get(`/admin/runner?page=${page}&limit=${limit}`);
        return response.data 
    },

    getRunnerById: async (id: string) => {
        const response = await api.get(`/admin/runner/${id}`);
        return response.data 
    },

    suspendRunner: async (id: string) => {
        const response = await api.post(`/admin/runner/${id}/suspend`);
        return response.data 
    },
    
    activateRunner: async (id: string) => {
        const response = await api.post(`/admin/runner/${id}/active`);
        return response.data 
    },
}