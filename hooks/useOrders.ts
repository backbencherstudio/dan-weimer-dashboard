// import api from "@/lib/axios";

import { useQuery } from "@tanstack/react-query";
import { orderService } from "@/services/order.service";



export const useOrders = (page: number, limit: number) => {
    return useQuery({
        queryKey: ["orders", page, limit],
        queryFn: () => orderService.getOrders(page, limit),
    });
};

export const useOrderById = (id: string) => {
    return useQuery({
        queryKey: ["order", id],
        queryFn: () => orderService.getOrderById(id),
        enabled: !!id,
    });
};