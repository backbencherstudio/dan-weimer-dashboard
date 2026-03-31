import React from "react";

export default function RecentActivity() {
  return (
    <div className="min-h-[361px] flex flex-col items-start  flex-[1_0_0] border [background:var(--W,#FFF)] p-4 rounded-2xl border-solid border-[#EDEDED] gap-7">

      <div className="flex items-center justify-between  w-full">
        <h3 className="text-[color:var(--B,#070707)] [font-family:Industry] text-xl font-bold leading-[132%] tracking-[0.1px]">
          Recent Activity
        </h3>

        <button className="flex w-[86px] justify-center items-center gap-1 [background:var(--primary-orange-orange-500-main,#FF4000)] px-[18px] py-3 rounded-[7.809px] text-[color:var(--W,#FFF)] [font-family:Industry] text-sm font-bold leading-[116%] tracking-[0.07px]"> See All</button>
      </div>

      <div>
         <RecentActivities />
      </div>
    </div>
  );
}



import { Star, Trophy, CreditCard, MessageSquare } from "lucide-react";

type ActivityItem = {
  id: number;
  title: string;
  orderId?: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
};

const activities: ActivityItem[] = [
  {
    id: 1,
    title: "Runner Alex accepted Job",
    orderId: "VTY7162E",
    time: "2 min ago",
    icon: Star,
    iconColor: "text-sky-500",
    iconBg: "bg-sky-50",
  },
  {
    id: 2,
    title: "Delivery completed in 27 mins",
    orderId: "VTY7162E",
    time: "15 min ago",
    icon: Trophy,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    id: 3,
    title: "Invoice paid by Acme HVAC",
    orderId: "VTY7162E",
    time: "20 min ago",
    icon: CreditCard,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50",
  },
  {
    id: 4,
    title: "Runner Sarah Chen went online",
    orderId: "-",
    time: "30 min ago",
    icon: MessageSquare,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
];

function ActivityRow({
  title,
  orderId,
  time,
  icon: Icon,
  iconColor,
  iconBg,
  isLast = false,
}: ActivityItem & { isLast?: boolean }) {
  return (
    <div
      className={`flex items-start justify-between gap-4 py-5 ${
        !isLast ? "border-b border-[#F2DDDA]" : "border-b border-[#F2DDDA]"
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
            ID: {orderId || "-"}
          </p>
        </div>
      </div>

      <div className="shrink-0 pt-1 text-right text-[18px] font-normal leading-[140%] text-[#222222]">
        {time}
      </div>
    </div>
  );
}

function RecentActivities() {
  return (
    <div className="w-full md:min-w-[560px]  rounded-2xl bg-white ">
      {activities.map((item, index) => (
        <ActivityRow
          key={item.id}
          {...item}
          isLast={index === activities.length - 1}
        />
      ))}
    </div>
  );
}