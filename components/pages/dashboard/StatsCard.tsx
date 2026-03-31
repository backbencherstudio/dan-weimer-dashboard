import { StatsIcons } from "@/components/icons/StatsIcon";
import StatsCard from "@/components/reusable/StatsCard";
import React from "react";

export default function DashboardStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <StatsCard
        title="Monthly Revenue"
        value="13,245"
        prefix="$"
        icon={<StatsIcons.Revenue />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Monthly Orders"
        value="13,245"
        prefix="$"
        icon={<StatsIcons.Orders />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Total Supplier     "
        value="13,245"
        prefix="$"
        icon={<StatsIcons.Supplier />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Total Contractors "
        value="13,245"
        prefix="$"
        icon={<StatsIcons.Contractors />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Total Runners"
        value="13,245"
        prefix="$"
        icon={<StatsIcons.Runner />}
        iconBg="bg-[#FCE6E6]"
      />
    </div>
  );
}
