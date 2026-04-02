"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LogOut, X } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { SidebarIcons } from "@/components/icons/SidebarIcons";
import path from "path";

// ── Types ────────────────────────────────────────────────────────────────────
type SidebarIconType = ComponentType<
  SVGProps<SVGSVGElement> & {
    className?: string;
    fillColor?: string;
    strokeColor?: string;
    size?: number | string;
  }
>;

interface NavItem {
  label: string;
  href: string;
  icon: SidebarIconType;
}

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  navItems?: NavItem[];
  onLogout?: () => void;
}

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: SidebarIconType;
  isActive?: boolean;
  className?: string;
}

// ── Nav Items ────────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/", icon: SidebarIcons.Dashboard },
  {
    label: "Live Operations",
    href: "/live-operations",
    icon: SidebarIcons.Live,
  },
  { label: "Orders management", href: "/orders", icon: SidebarIcons.Order },
  {
    label: "Contractors management",
    href: "/contractors",
    icon: SidebarIcons.Contractors,
  },
  {
    label: "Runners management",
    href: "/runners",
    icon: SidebarIcons.Runners,
  },
  {
    label: "SupplyHouse management",
    href: "/supplyhouse",
    icon: SidebarIcons.SupplyHouse,
  },
  {
    label: "Payments & Finance",
    href: "/payments",
    icon: SidebarIcons.Payment,
  },
];

// ── NavLink Component ────────────────────────────────────────────────────────
function NavLink({
  href,
  label,
  icon: Icon,
  isActive = false,
  className = "",
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={[
        "group relative flex items-center gap-2 rounded-lg px-3 py-3 text-sm leading-[160%] tracking-[0.07px] transition-all duration-150",
        isActive
          ? "bg-[#FF4000] text-white shadow-md"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
        className,
      ].join(" ")}
    >
      <span
        className={[
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-lg transition-colors duration-150",
          isActive ? "text-white" : "text-[#070707] group-hover:text-[#FF4000]",
        ].join(" ")}
      >
        <Icon
          className="h-5 w-5"
          fillColor={isActive ? "white" : "none"}
          strokeColor={isActive ? "white" : "currentColor"}
        />
      </span>

      <span
        className={[
          "flex-1 text-sm font-normal leading-[160%] tracking-[0.07px]",
          isActive ? "text-white" : "text-[#4A4C56]",
        ].join(" ")}
      >
        {label}
      </span>
    </Link>
  );
}

// ── Sidebar Component ────────────────────────────────────────────────────────
export default function Sidebar({
  open,
  onClose,
  navItems = NAV_ITEMS,
  onLogout,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          "fixed z-50 flex h-full w-[248px] shrink-0 flex-col border-r border-slate-100 bg-white transition-transform duration-300 ease-in-out md:relative md:z-auto",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0 ",
        ].join(" ")}
      >
        <div className="flex items-center justify-between px-5 pb-5 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex h-[42px] w-[49px] shrink-0 items-center justify-center overflow-hidden">
              <Image
                src="/dan-logo.png"
                alt="Parts Runner Logo"
                width={49}
                height={42}
              />
            </div>

            <p className="text-center text-xl font-bold leading-[124%] tracking-[0.1px] text-[#070707] [font-family:Industry]">
              Parts Runner
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 md:hidden"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-3 overflow-y-auto px-3">
          {navItems.map((item) => {
            const isActive =
            item.href === "/"
              ? pathname === "/"                // exact match for home
              : pathname.startsWith(item.href); 

            return (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={isActive}
              />
            );
          })}
        </nav>

        <div>
          <div className="px-3 py-4 space-y-3">
            <NavLink
              href="/settings"
              label=" Settings"
              icon={SidebarIcons.Order}
              isActive={pathname === "/settings"}
            />
            <button
              type="button"
              onClick={onLogout}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-150 hover:bg-red-50 hover:text-red-500"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 transition-colors group-hover:bg-red-100">
                <LogOut size={15} strokeWidth={1.8} />
              </span>
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
