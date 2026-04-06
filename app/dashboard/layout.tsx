import DashboardLayoutComp from "@/components/common/DashboardLayout";
import { ZustandHydrator } from "@/components/zustand-hydrator";
import { authServerService } from "@/services/auth.server";
import React from "react";
import { User } from "@/types/auth.types";
import { Toaster } from "react-hot-toast";
import QueryProvider from "@/providers/query-provider";

export default async function layout({ children }: { children: React.ReactNode }) {

  const user = await authServerService.meServer();
  console.log("User:", user);
  return (
    <div>
      <QueryProvider>
      <Toaster />
      <ZustandHydrator user={user as User} />
      <DashboardLayoutComp>{children}</DashboardLayoutComp>
      </QueryProvider>
    </div>
  );
}
