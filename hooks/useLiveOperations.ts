import { liveOperationsService } from "@/services/live-operations.service";
import { useQuery } from "@tanstack/react-query";

export const useLiveOperations = () => {
    return useQuery({
        queryKey: ['live-operations'],
        queryFn: () => liveOperationsService.getLiveOperations(),
        select: (data) => data.data,
    });
}

