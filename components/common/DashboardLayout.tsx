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

        <main className="flex-1 overflow-y-auto md:px-6 px-4 pt-4 md:pt-6 bg-[#F9FAFB] ">
          {children}

          <footer className="mt-16 -mx-4 md:-mx-6 flex justify-center items-center bg-white px-4 md:px-6 py-6 text-center border-t border-[#EDEDED] ">
            <p className="text-[color:var(--Gray-Black-300,#4B5563)] text-center text-sm font-normal leading-[160%] tracking-[0.07px]">
              &copy; 2026 Parts Runner. All rights reserved.
            </p>
          </footer>
        </main>


      </div>
    </div>
  );
}
