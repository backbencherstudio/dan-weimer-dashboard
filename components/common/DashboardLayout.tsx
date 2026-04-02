"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Topbar } from "./Topbar";

export default function DashboardLayoutComp({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const name = "Admin";





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
          onMenuClick={() => setSidebarOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-y-auto bg-[#F9FAFB]">
          <div className="px-4 pt-4 md:px-6 md:pt-6 min-h-[calc(100vh-220px)]">
            {children}
          </div>

          <footer className="mt-16 border-t border-[#EDEDED] bg-white py-6 text-center">
            <p className="text-sm font-normal leading-[160%] tracking-[0.07px] text-[#4B5563]">
              &copy; 2026 Parts Runner. All rights reserved.
            </p>
          </footer>
        </main>


      </div>
    </div>
  );
}
