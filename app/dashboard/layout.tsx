import DashboardLayoutComp from "@/components/common/DashboardLayout";
import { ZustandHydrator } from "@/components/zustand-hydrator";
import { authServerService } from "@/services/auth.server";
import React from "react";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/query-provider";
import { redirect } from "next/navigation";

export default async function layout({ children }: { children: React.ReactNode }) {
  try {
    const user = await authServerService.meServer();

    return (
      <div>
        <QueryProvider>
          <Toaster />
          <ZustandHydrator user={user} />
          <DashboardLayoutComp>{children}</DashboardLayoutComp>
        </QueryProvider>
      </div>
    );
  } catch (error) {
    redirect("/login");
  }
}