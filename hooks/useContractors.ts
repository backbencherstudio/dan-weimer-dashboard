    "use client";

import { contractorsService } from "@/services/contractors.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";





export const useContractors = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["contractors", page, limit],
        queryFn: () => contractorsService.getContractors(page, limit),
    });
};

export const useContractorById = (id: string) => {
    return useQuery({
        queryKey: ["contractor", id],
        queryFn: () => contractorsService.getContractorById(id),
        enabled: !!id,
    });
};

export const useSuspendContractor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => contractorsService.suspendContractor(id),
        onSuccess: (response) => {
            toast.success(response?.message || "Contractor suspended successfully");
            queryClient.invalidateQueries({ queryKey: ["contractors"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to suspend contractor");
        },
    });
};


export const useActivateContractor = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => contractorsService.activateContractor(id),
        onSuccess: (response) => {
            toast.success(response?.message || "Contractor activated successfully");
            queryClient.invalidateQueries({ queryKey: ["contractors"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Failed to activate contractor");
        },
    });
};


