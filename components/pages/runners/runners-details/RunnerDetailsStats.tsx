import { StatsIcons } from "@/components/icons/StatsIcon";
import StatsCard from "@/components/reusable/StatsCard";
import React from "react";

export default function RunnerDetailsStats({ runnerStats }: { runnerStats: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <StatsCard
        title="Total Jobs"
        value={runnerStats?.total_job}
        prefix="$"
        icon={<StatsIcons.Revenue />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Total Earnings"
        value={runnerStats?.total_earning}
        prefix="$"
        // icon={<StatsIcons.Orders />}
        icon={<StatsIcons.Orders />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="In Transit Orders"
        value={runnerStats?.in_transit_job}
        prefix="$"
        icon={<StatsIcons.Supplier />}
        iconBg="bg-[#FCE6E6]"
      />
      <StatsCard
        title="Completed Orders"
        value={runnerStats?.complete_job}
        prefix="$"
        icon={<StatsIcons.Contractors />}
        iconBg="bg-[#FCE6E6]"
      />

    </div>
  );
}
