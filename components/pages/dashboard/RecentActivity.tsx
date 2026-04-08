import React from "react";
import {
  CreditCard,
  MessageSquare,
  Package,
  Star,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import type { RecentActivityItem } from "@/types/dashboard.types";

type RecentActivityProps = {
  data: { data?: RecentActivityItem[] };
};

function getActivityVisual(type: string | undefined): {
  Icon: LucideIcon;
  iconColor: string;
  iconBg: string;
} {
  const t = (type || "").toLowerCase();
  if (t.includes("payment") || t.includes("invoice")) {
    return {
      Icon: CreditCard,
      iconColor: "text-cyan-600",
      iconBg: "bg-cyan-50",
    };
  }
  if (t.includes("delivery") || t.includes("shipment")) {
    return {
      Icon: Package,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    };
  }
  if (t.includes("runner") || t.includes("job") || t.includes("complete")) {
    return {
      Icon: Trophy,
      iconColor: "text-emerald-500",
      iconBg: "bg-emerald-50",
    };
  }
  if (t.includes("message") || t.includes("chat")) {
    return {
      Icon: MessageSquare,
      iconColor: "text-orange-500",
      iconBg: "bg-orange-50",
    };
  }
  return {
    Icon: Star,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50",
  };
}

function ActivityRow({
  title,
  refLabel,
  time,
  icon: Icon,
  iconColor,
  iconBg,
  isLast = false,
}: {
  title: string;
  refLabel: string;
  time: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  isLast?: boolean;
}) {
  return (
    <div
      className={`flex items-start justify-between gap-4 py-5 w-full ${
        !isLast ? "border-b border-[#F2DDDA]" : ""
      }`}
    >
      <div className="flex min-w-0 items-start gap-4">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] ${iconBg}`}
        >
          <Icon className={`h-6 w-6 ${iconColor}`} strokeWidth={2} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[18px] font-medium leading-[140%] text-[#111111]">
            {title}
          </h3>
          <p className="mt-1 text-[15px] font-normal leading-[150%] text-[#7B7B7B]">
            {refLabel}
          </p>
        </div>
      </div>

      <div className="shrink-0 pt-1 text-right text-[18px] font-normal leading-[140%] text-[#222222]">
        {time}
      </div>
    </div>
  );
}

function RecentActivities({ items }: { items: RecentActivityItem[] }) {
  if (items.length === 0) {
    return (
      <p className="py-8 text-center text-[15px] text-[#7B7B7B]">
        No recent activity yet.
      </p>
    );
  }

  return (
    <div className="w-full rounded-2xl bg-white">
      {items?.slice(0, 4).map((item, index) => {
        const { Icon, iconColor, iconBg } = getActivityVisual(item.type);
        const title = item.title?.trim() || "Activity";
        const refLabel = item.ref?.trim() ? item.ref : "—";
        const time =
          item.time_ago?.trim() ||
          (item.created_at
            ? new Date(item.created_at).toLocaleString()
            : "—");

        return (
          <ActivityRow
            key={`${item.ref ?? "activity"}-${item.created_at ?? index}`}
            title={title}
            refLabel={refLabel}
            time={time}
            icon={Icon}
            iconColor={iconColor}
            iconBg={iconBg}
            isLast={index === items.length - 1}
          />
        );
      })}
    </div>
  );
}

export default function RecentActivity({ data }: RecentActivityProps) {
  const activities = data?.data ?? [];

  return (
    <div className="min-h-[361px] flex flex-col items-start flex-[1_0_0] border [background:var(--W,#FFF)] p-4 rounded-2xl border-solid border-[#EDEDED] gap-7">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-[color:var(--B,#070707)] [font-family:Industry] text-xl font-bold leading-[132%] tracking-[0.1px]">
          Recent Activity
        </h3>

        <button
          type="button"
          className="flex w-[86px] justify-center items-center gap-1 [background:var(--primary-orange-orange-500-main,#FF4000)] px-[18px] py-3 rounded-[7.809px] text-[color:var(--W,#FFF)] [font-family:Industry] text-sm font-bold leading-[116%] tracking-[0.07px]"
        >
          See All
        </button>
      </div>

      <div className="w-full">
        <RecentActivities items={activities} />
      </div>
    </div>
  );
}
