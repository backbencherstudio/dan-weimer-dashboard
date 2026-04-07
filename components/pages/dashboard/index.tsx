"use client";
import CalenderIcon from "@/components/icons/CalenderIcon";
import { Stats } from "fs";
import React from "react";
import DashboardStatsSection from "./StatsCard";
import RecentActivity from "./RecentActivity";
import ShipmentPerformance from "./ShipmentPerformance";
import RecentShipmentTable from "./RecentShipmentTable";
import { useDashboard } from "@/hooks/useDashboard";
import { Loader } from "lucide-react";

export default function DashboardPage() {
  const { data: dashboardData, isLoading } = useDashboard();
  console.log("dashboardData", dashboardData);
  // Dashboard Stats Data
  const shipmentPerformanceData = {
    chart: dashboardData?.shipment_performance?.chart || []
  }

  // Recent Activity Data
  const recentActivityData = {
    data: dashboardData?.recent_activity || [],
  }

  // Recent Shipment Activity Data
  const recentShipmentActivityData = {
    data: dashboardData?.recent_shipment_activity || [],
  }

  // Dashboard Stats Data
  const statsData = {
    monthly_revenue: dashboardData?.summary?.monthly_revenue || 0,
    monthly_orders: dashboardData?.summary?.monthly_orders || 0,
    total_supplier: dashboardData?.summary?.total_supplier || 0,
    total_contractors: dashboardData?.summary?.total_contractors || 0,
    total_runners: dashboardData?.summary?.total_runners || 0,
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">
      <Loader className="w-10 h-10 text-orange-500 animate-spin" />
    </div>
  }

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

      <DashboardStatsSection data={statsData} />

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 max-w-[1260px]">
          <ShipmentPerformance data={shipmentPerformanceData} />
        </div>

        <div className="lg:max-w-[560px] flex-1">
          <RecentActivity data={recentActivityData} />
        </div>
      </div>


      <RecentShipmentTable data={recentShipmentActivityData} />




    </div>
  );
}
