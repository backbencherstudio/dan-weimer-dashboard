"use client"


import { useState } from "react";
import Sidebar from "./Sidebar";
import { Topbar } from "./Topbar";

export default function DashboardLayoutComp({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const name = 'Admin';
  const panelLabel = 'Admin Panel';

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        // navItems={NAV_ITEMS}
        onLogout={() => { }}
      />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar
          name={name}
          onMenuClick={() => setSidebarOpen(prev => !prev)}
        />

        <main className="flex-1 overflow-y-auto md:px-6 px-4 pt-4 md:pt-6  ">
          {children}
        </main>


        {/* <main className="flex-1 overflow-y-auto md:p-6 p-4 bg-black">
          {children}
        </main> */}
      </div>
    </div>
  );
}