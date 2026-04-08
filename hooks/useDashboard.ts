import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";


export const useDashboard = () => {
  return useQuery<any, Error>({
    queryKey:  ["dashboard"],
    queryFn:   async () => {
      const res = await dashboardService.getDashboard();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,   // 5 min — dashboard data doesn't change every second
    retry:     1,
  });
};