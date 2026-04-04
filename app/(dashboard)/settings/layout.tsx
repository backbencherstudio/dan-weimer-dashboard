import SettingsSidebar from "@/components/pages/settings/SettingsSidebar";
import { ReactNode } from "react";

export default function SettingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 md:space-y-5 border bg-white p-4 md:p-6 rounded-2xl border-[#EAECF0]">
      
      <h2 className="text-xl md:text-2xl font-bold text-[#070707] font-industry">
        Settings
      </h2>

      <section className="flex flex-col lg:flex-row gap-4 md:gap-6">
        
        {/* Sidebar - becomes tabs on mobile */}
        <div className="w-full lg:w-[280px] xl:w-[300px] shrink-0">
          <SettingsSidebar />
        </div>

        {/* Content */}
        <div className="flex-1 w-full">
          {children}
        </div>

      </section>
    </div>
  );
}