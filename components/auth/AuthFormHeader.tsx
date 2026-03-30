import React from "react";
import UserIcon from "../icons/UserIcon";

export default function AuthFormHeader({title, description}: {title: string, description: string}) {
  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      {/* Layered glow icon */}
      <div className="relative flex items-center justify-center">
        {/* Outer glow ring */}
        <div
          className="absolute w-20 h-20 rounded-full opacity-30 blur-md"
          style={{ background: "radial-gradient(circle, #FF4000 0%, transparent 70%)" }}
        />
        {/* Mid ring */}
        <div
          className="flex items-center justify-center w-16 h-16 rounded-full border"
          style={{
            background: "linear-gradient(180deg, rgba(254,236,237,0.6) 0%, rgba(254,236,237,0.0) 100%)",
            borderColor: "#FEECED",
          }}
        >
          {/* Inner button */}
          <div
            className="flex items-center justify-center w-12 h-12 rounded-full border shadow-sm bg-white"
            style={{ borderColor: "#FBC4C6" }}
          >
            <UserIcon  color="#FF4000" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="text-center">
        <h2
          className="text-2xl font-semibold tracking-tight text-[#070707] mb-1"
          
        >
            {title}
        </h2>
        <p className="text-sm text-[#6B7280] leading-relaxed tracking-wide">
          {description}
        </p>
      </div>
    </div>
  );
}