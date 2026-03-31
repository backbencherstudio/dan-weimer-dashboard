"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Assuming you have the standard Shadcn cn utility

const links = [
  { label: "General", href: "/settings/general" },
  { label: "Password", href: "/settings/password" },
  { label: "Notification", href: "/settings/notification" },
];

export default function SettingsSidebar() {
  const pathname = usePathname();

  // Defined styles based on your design variables
  const normalCls = "flex items-center self-stretch border border-[#F6F8FA] p-4 rounded-[10px] text-[#4A4C56] text-sm font-normal leading-[160%] tracking-[0.07px] transition-all hover:bg-slate-50";
  
  const activeCls = "flex items-center self-stretch border border-[#FFC4B0] bg-[#FFECE6] p-4 rounded-[10px] text-[#FF4000] text-sm font-medium leading-[160%] tracking-[0.07px]";

  return (
    <nav className="flex min-h-[calc(100vh-220px)] w-[300px] flex-col items-start gap-4 rounded-xl border border-solid border-slate-100 bg-white p-4 md:p-6 shadow-sm">
      {links.map((link) => {
        const isActive = pathname === link.href;
        
        return (
          <Link
            key={link.href}
            href={link.href}
            className={isActive ? activeCls : normalCls}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}