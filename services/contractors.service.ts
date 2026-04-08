import api from "@/lib/axios";

export const contractorsService = {
    getContractors: async (page: number, limit: number) => {
        const response = await api.get(`/admin/contractor?page=${page}&limit=${limit}`);
        return response.data 
    },

    getContractorById: async (id: string) => {
        const response = await api.get(`/admin/contractor/${id}`);
        return response.data 
    },

    suspendContractor: async (id: string) => {
        const response = await api.post(`/admin/contractor/${id}/suspend`);
        return response.data 
    },

    activateContractor: async (id: string) => {
        const response = await api.post(`/admin/contractor/${id}/active`);
        return response.data 
    },
}