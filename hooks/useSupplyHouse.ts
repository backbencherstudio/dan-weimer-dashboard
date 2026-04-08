"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supplyHouseService } from "@/services/supply-house.service";
import { Supplier } from "@/types/supplier.types";

export const useSupplyHouses = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["supply-houses", page, limit],
    queryFn: () => supplyHouseService.getSupplyHouses(page, limit),
  });
};

export const useSupplyHouseById = (id: string) => {
  return useQuery({
    queryKey: ["supply-house", id],
    queryFn: () => supplyHouseService.getSupplyHouseById(id),
    enabled: !!id,
  });
};

export const useCreateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (supplier: Supplier) =>
      supplyHouseService.createSupplier(supplier),

    onSuccess: (response) => {
      toast.success(response?.message || "Supplier created successfully");
      queryClient.invalidateQueries({ queryKey: ["supply-houses"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create supplier"
      );
    },
  });
};

export const useUpdateSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, supplier }: { id: string; supplier: Supplier }) =>
      supplyHouseService.updateSupplier(id, supplier),

    onSuccess: (response, variables) => {
      toast.success(response?.message || "Supplier updated successfully");
      queryClient.invalidateQueries({ queryKey: ["supply-houses"] });
      queryClient.invalidateQueries({
        queryKey: ["supply-house", variables.id],
      });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update supplier"
      );
    },
  });
};

export const useDeleteSupplier = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => supplyHouseService.deleteSupplier(id),

    onSuccess: (response) => {
      toast.success(response?.message || "Supplier deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["supply-houses"] });
    },

    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete supplier"
      );
    },
  });
};