import DashboardLayoutComp from "@/components/pages/dashboard/DashboardLayout";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <div>

    <DashboardLayoutComp>
        {children}
    </DashboardLayoutComp>
  </div>;
}
