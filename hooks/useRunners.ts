"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supplyHouseService } from "@/services/supply-house.service";
import { runnersService } from "@/services/runners.service";




export const useRunners = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["runners", page, limit],
        queryFn: () => runnersService.getRunners(page, limit),
    });
};

export const useRunnerById = (id: string) => {
    return useQuery({
        queryKey: ["runner", id],
        queryFn: () => runnersService.getRunnerById(id),
        enabled: !!id,
    });
};

export const useSuspendRunner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => runnersService.suspendRunner(id),
        onSuccess: (response) => {
            toast.success(response?.message || "Runner suspended successfully");
            queryClient.invalidateQueries({ queryKey: ["runners"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to suspend runner");
        },
    });
};


export const useActivateRunner = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => runnersService.activateRunner(id),
        onSuccess: (response) => {
            toast.success(response?.message || "Runner activated successfully");
            queryClient.invalidateQueries({ queryKey: ["runners"] });
        },
    });
};


// export const useDeleteSupplier = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => supplyHouseService.deleteSupplier(id),

//     onSuccess: (response) => {
//       toast.success(response?.message || "Supplier deleted successfully");
//       queryClient.invalidateQueries({ queryKey: ["supply-houses"] });
//     },

//     onError: (error: any) => {
//       toast.error(
//         error?.response?.data?.message || "Failed to delete supplier"
//       );
//     },
//   });
// };