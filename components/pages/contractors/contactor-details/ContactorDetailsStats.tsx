import { StatsIcons } from "@/components/icons/StatsIcon";
import StatsCard from "@/components/reusable/StatsCard";
import React from "react";

export default function ContactorDetailsStats({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total Orders                    "
        value={stats?.total_orders}
        prefix="$"
        icon={<StatsIcons.Revenue />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard                        
        title="Lifetime Spend"
        value={stats?.lifetime_spend}
        prefix="$"
        // icon={<StatsIcons.Orders />}
        icon={<StatsIcons.Orders />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="In Transit Orders"
        value={stats?.in_transit_orders}
        prefix="$"
        icon={<StatsIcons.Supplier />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Completed Orders"
        value={stats?.completed_orders}
        prefix="$"
        icon={<StatsIcons.Contractors />}
        iconBg="bg-[#FCE6E6]"
      />
    
    </div>
  );
}
