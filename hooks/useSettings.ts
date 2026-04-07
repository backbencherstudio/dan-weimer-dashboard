import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";



export type DeliveryFeeBody = {
    base_delivery_fee: number;
    per_kg_weight_rate: number;
    per_km_rate: number;
}


type DeliveryFeeFull = {
    id: number;
    base_delivery_fee: number;
    per_kg_weight_rate: number;
    per_km_rate: number;
    created_at: string;
    updated_at: string;
}

export type DeliveryFee = Pick<DeliveryFeeFull, 'base_delivery_fee' | 'per_kg_weight_rate' | 'per_km_rate'>;

export const useDeliveryFee = () => {
    return useQuery({
        queryKey: ["delivery-fee"],
        queryFn: async () => await api.get("/admin/delivery-fee-config"),
        select: (data) => {
            const fullData = data?.data?.data as DeliveryFeeFull;
            // Return only the fee configuration
            return {
                base_delivery_fee: fullData.base_delivery_fee,
                per_kg_weight_rate: fullData.per_kg_weight_rate,
                per_km_rate: fullData.per_km_rate,
            } as DeliveryFee;
        },
    });
}

export  const useSetDeliveryFee = () => {
    return useMutation({
        mutationFn: (deliveryFee: DeliveryFee) => api.put("/admin/delivery-fee-config", deliveryFee),
        onSuccess: () => {
            toast.success("Delivery fee set successfully");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message?.message || "Failed to set delivery fee");
        },
    });
};  


