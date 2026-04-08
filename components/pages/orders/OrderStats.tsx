import { StatsIcons } from "@/components/icons/StatsIcon";
import StatsCard from "@/components/reusable/StatsCard";
import React from "react";
import { useOrders } from "@/hooks/useOrders";

export default function OrderStatsSection() {
  const { data: orders } = useOrders(1, 10);

  const statsSummary = orders?.summary;
  console.log("statsSummary", statsSummary);
  return (
    <div className="grid grid-cols-2 md:grid-cols-4  gap-4">
      <StatsCard
        title="Total Orders"
        value={statsSummary?.total_orders}
        prefix="$"
        icon={<StatsIcons.Revenue />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="In Transit Orders"
        value={statsSummary?.in_transit_orders}
        prefix="$"
        // icon={<StatsIcons.Orders />}
        icon={<StatsIcons.Orders />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Delayed Orders"
        value={statsSummary?.cancelled_orders}
        prefix="$"
        icon={<StatsIcons.Supplier />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Completed Orders"
        value={statsSummary?.completed_orders}
        prefix="$"
        icon={<StatsIcons.Contractors />}
        iconBg="bg-[#FCE6E6]"
      />
      
    </div>
  );
}
