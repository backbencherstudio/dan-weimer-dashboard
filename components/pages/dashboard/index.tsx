import CalenderIcon from "@/components/icons/CalenderIcon";
import { Stats } from "fs";
import React from "react";
import DashboardStatsSection from "./StatsCard";
import RecentActivity from "./RecentActivity";
import ShipmentPerformance from "./ShipmentPerformance";
import RecentShipmentTable from "./RecentShipmentTable";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* title */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="self-stretch text-[#070707] font-industry text-2xl font-bold leading-[124%] tracking-[0.12px] ">
            Dashboard
          </h3>
          <p className="self-stretch text-[#4A4C56]  text-base font-normal leading-[100%] tracking-[0.08px]        mt-1.5                    ">
            Track and manage all delivery transactions.
          </p>
        </div>

        <div>
          <button
            type="button"
            className="flex justify-center items-center gap-2 border border-[#D2D2D5] pl-4 pr-3 py-2.5 rounded-[10px] border-solid"
          >
            <CalenderIcon />
            <span className="text-[#777980] text-center  text-sm font-medium leading-[160%] tracking-[0.07px]">
              February 2026
            </span>
          </button>
        </div>
      </div>

      {/* stats card section */}

      <DashboardStatsSection />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 ">
          <ShipmentPerformance />
        </div>

        <div className="lg:min-w-[560px]">
          <RecentActivity />
        </div>
      </div>


    <RecentShipmentTable />    




    </div>
  );
}
