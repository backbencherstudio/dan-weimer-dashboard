import { StatsIcons } from "@/components/icons/StatsIcon";
import StatsCard from "@/components/reusable/StatsCard";
import React from "react";

export default function DashboardStatsSection({ data }: { data: any }) {
  const { monthly_revenue, monthly_orders, total_supplier, total_contractors, total_runners } = data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatsCard
        title="Monthly Revenue"
        value={monthly_revenue}
        prefix="$"
        icon={<StatsIcons.Revenue />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Monthly Orders"
        value={monthly_orders}
        prefix="$"
        // icon={<StatsIcons.Orders />}
        icon={<StatsIcons.Orders />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Total Supplier     "
        value={total_supplier}
        prefix="$"
        icon={<StatsIcons.Supplier />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Total Contractors "
        value={total_contractors}
        prefix="$"
        icon={<StatsIcons.Contractors />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Total Runners"
          value={total_runners}
        prefix="$"
        icon={<StatsIcons.Runner />}
        iconBg="bg-[#FCE6E6]"
      />
    </div>
  );
}
