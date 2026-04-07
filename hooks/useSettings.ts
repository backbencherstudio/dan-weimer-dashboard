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


// password change
export type PasswordChangeBody = {
    old_password: string;
    new_password: string;
}

export const usePasswordChange = () => {
    return useMutation({
        mutationFn: (passwordChange: PasswordChangeBody) => api.post("/auth/change-password", passwordChange),
        onSuccess: (data: any) => {
            // toast.success("Password changed successfully");
            if (data?.success) {
                toast.success("Password changed successfully");
            } else {
                // If success is false, even if the status code is 200, show an error
                toast.error(data?.message || "Failed to change password");
            }
        },
        onError: (error: any) => {
            // Log the full error to understand its structure
            console.error(error);

            // Check if the error is coming from the response
            const errorMessage = error?.response?.data?.message || "Failed to change password";
            toast.error(errorMessage);
        },
    });
}

