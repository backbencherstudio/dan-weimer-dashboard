import api from "@/lib/axios";

export const paymentsService = {
    getPayments: async () => {
        const response = await api.get(`/admin/payment-transaction`);
        return response.data 
    },

    getPaymentById: async (id: string) => {
        const response = await api.get(`/admin/payment-transaction/${id}`);
        return response.data 
    },

    deletePayment: async (id: string) => {
        const response = await api.delete(`/admin/payment-transaction/${id}`);
        return response.data 
    },
}