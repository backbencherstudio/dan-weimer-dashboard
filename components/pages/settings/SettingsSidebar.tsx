"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { useState, useEffect } from "react";

const links = [
  { label: "General", href: "/dashboard/settings/company-info", icon: SettingsIcon.Info },
  { label: "Delivery Fee Config", href: "/dashboard/settings/delivery-config", icon: SettingsIcon.Delivery },
  { label: "Password", href: "/dashboard/settings/password", icon: SettingsIcon.Password },
];

export default function SettingsSidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);                                            

  const baseCls =
    "flex items-center gap-2 w-full p-4 rounded-[10px] text-sm leading-[160%] tracking-[0.07px] transition-all";

  const inactiveCls =
    "border border-[#F6F8FA] text-[#4A4C56] font-normal hover:bg-slate-50";

  const activeCls =
    "border border-[#FFC4B0] bg-[#FFECE6] text-[#FF4000] font-medium";

  // Mobile tabs version
  if (isMobile) {
    return (
      <div className="flex overflow-x-auto gap-2 pb-2 -mx-1 px-1 scrollbar-hide">
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm whitespace-nowrap transition-all shrink-0",
                isActive 
                  ? "border border-[#FFC4B0] bg-[#FFECE6] text-[#FF4000] font-medium" 
                  : "border border-[#F6F8FA] text-[#4A4C56] font-normal hover:bg-slate-50"
              )}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    );
  }

  // Desktop sidebar version
  return (
    <nav className="flex min-h-[calc(100vh-220px)] w-[300px] flex-col gap-4 rounded-xl border border-slate-100/10 bg-white p-4 md:p-6">
      {links.map(({ label, href, icon: Icon }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={cn(baseCls, isActive ? activeCls : inactiveCls)}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}