import api from "@/lib/axios";
import { Supplier } from "@/types/supplier.types";

export const supplyHouseService = {
    getSupplyHouses: async (page: number, limit: number) => {
        const response = await api.get(`/admin/supplier?page=${page}&limit=${limit}`);
        return response.data
    },

    getSupplyHouseById: async (id: string) => {
        const response = await api.get(`/admin/supplier/${id}`);
        return response.data
    },

    createSupplier: async (supplier: Supplier) => {
        const response = await api.post(`/admin/supplier`, supplier);
        return response.data
    },
    updateSupplier: async (id: string, supplier: Supplier) => {
        const response = await api.patch(`/admin/supplier/${id}`, supplier);
        return response.data
    },
    deleteSupplier: async (id: string) => {
        const response = await api.delete(`/admin/supplier/${id}`);
        return response.data
    },
}