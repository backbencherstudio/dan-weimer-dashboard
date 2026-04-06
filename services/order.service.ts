import api from "@/lib/axios";

export const orderService = {
    getOrders: async (page: number, limit: number) => {
        const response = await api.get(`/admin/order?page=${page}&limit=${limit}`);
        return response.data 
    },

    getOrderById: async (id: string) => {
        const response = await api.get(`/admin/order/${id}`);
        return response.data 
    },

 
    
    
}