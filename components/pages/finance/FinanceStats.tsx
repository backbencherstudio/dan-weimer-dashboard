import { StatsIcons } from "@/components/icons/StatsIcon";
import StatsCard from "@/components/reusable/StatsCard";
import React from "react";

export default function DashboardStatsSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
                title="Total Balance"
                value="13,245"
                prefix="$"
                icon={<StatsIcons.Revenue />}
                iconBg="bg-[#FCE6E6]"
            />
            <StatsCard
                title="Total Revenue "
                value="13,245"
                prefix="$"
                icon={<StatsIcons.Contractors />}
                iconBg="bg-[#FCE6E6]"
            />
            <StatsCard
                title="Total Due"
                value="13,245"
                prefix="$"
                icon={<StatsIcons.Runner />}
                iconBg="bg-[#FCE6E6]"
            />
        </div>
    );
}
