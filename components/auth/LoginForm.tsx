"use client";
import { useState } from "react";
import AuthFormHeader from "./AuthFormHeader";
import Link from "next/link";
import { EyeClosed, EyeIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import PrimaryButton from "../reusable/CustomButton";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="auth-container">
      <AuthFormHeader
        title={"Welcome Back"}
        description="Glad to see you again. Log in to your account."
      />

      <form className="mt-6 space-y-5 w-full">
        {/* EMAIL */}
        <div>
          <label className="auth-input-label">Email Address</label>
          <Input
            type="email"
            placeholder="Enter your email"
            className="auth-input"                         
          />
        </div>

        {/* PASSWORD */}
        <div>
          <label className="auth-input-label">Password</label>

          <div className="relative mt-1">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="auth-input"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? (
                <EyeClosed className="w-4 md:w-6 h-4 md:h-6" />
              ) : (
                <EyeIcon className="w-4 md:w-6 h-4 md:h-6" />
              )}
            </button>
          </div>
        </div>

        {/* REMEMBER + FORGOT */}
        <div className="flex items-center justify-between -mt-[9px]">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox className="accent-white data-checked:border-[#FF4000] data-checked:bg-[#FF4000] rounded-full h-5 w-5" />
            <span className="text-[#4B5563] leading-[160%] tracking-[0.07px] text-sm font-normal">
              Remember me
            </span>
          </label>

          <Link
            href="/"
            className="text-[#FF4000] font-industry text-sm font-bold leading-[116%] tracking-[0.07px]"
          >
            Forgot password?
          </Link>
        </div>

        {/* BUTTON */}
        <PrimaryButton>Log in</PrimaryButton>

        {/* REGISTER */}
        <p className="text-[color:var(--Primary-Black,#070707)] text-center text-base font-normal leading-[160%] tracking-[0.08px]">
          Don’t have an account?{" "}
          <Link
            href="/"
            className="text-[color:var(--primary-orange-orange-500-main,#FF4000)] [font-family:Industry] text-base font-bold leading-[124%] tracking-[0.08px]"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
