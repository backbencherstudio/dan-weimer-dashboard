import SettingsSidebar from "@/components/pages/settings/SettingsSidebar";
import { ReactNode } from "react";



export default function SettingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-5  border [background:var(--White,#FFF)] p-6 rounded-2xl border-solid border-[#EAECF0]">

      <h2 className="text-2xl font-bold text-[#070707] font-industry">Settings</h2>
      <section className="flex  gap-6">
        <div className="shrink-0">
          <SettingsSidebar />
        </div>
        <div className="flex-1">{children}</div>
      </section>
    </div>
  );              
}