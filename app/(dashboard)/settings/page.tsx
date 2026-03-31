import SettingsSidebar from "@/components/pages/settings/SettingsSidebar";
import { ReactNode } from "react";



export default function SettingLayout({ children }: { children: ReactNode }) {
    return (
      <div>
       
        <section className="flex  gap-4">
          <div className="shrink-0">
            <SettingsSidebar />
          </div>
          <div className="flex-1">{children}</div>
        </section>
      </div>
    );
  }