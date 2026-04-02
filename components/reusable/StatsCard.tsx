import React from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  prefix?: string;
  iconBg?: string;
  className?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  prefix = "",
  iconBg = "bg-[#FCE6E6]",
  className = "",
}: StatsCardProps) {
  return (
    <div
      className={`flex w-full min-w-[216px] items-start justify-start gap-3 self-stretch rounded-xl border border-solid border-[#EAECF0] bg-white px-4 py-[18px] ${className}`}
    >
      <div
        className={`flex items-center justify-center gap-[6.007px] rounded-[7.809px] p-[6.007px]  ${iconBg}`}
      >
        {icon}
      </div>

      <div>
        <p className="self-stretch text-base font-normal leading-[160%] tracking-[0.08px] text-[#4A4C56]">
          {title}
        </p>

        <p className="text-2xl font-bold leading-[124%] tracking-[0.12px] text-[#070707] [font-family:Industry] mt-1">
          {prefix && <span>{prefix} </span>}
          {value}
        </p>
      </div>
    </div>
  );
}