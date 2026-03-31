"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AuthFormHeader from "./AuthFormHeader";
import Link from "next/link";
import { EyeClosed, EyeIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import PrimaryButton from "../reusable/CustomButton";

// Validation schema
const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const rememberMe = watch("rememberMe");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // Handle remember me with localStorage
      if (typeof window !== "undefined") {
        if (data.rememberMe) {
          localStorage.setItem("rememberedEmail", data.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
      }

      // Make your API call here
      console.log("Login data:", data);

      // Example API call:
      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // const result = await response.json();

      // Handle success (redirect, show toast, etc.)
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (show error message)
    } finally {
      setIsLoading(false);
    }
  };

  // Load remembered email on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const rememberedEmail = localStorage.getItem("rememberedEmail");
      if (rememberedEmail) {
        setValue("email", rememberedEmail);
        setValue("rememberMe", true);
      }
    }
  }, [setValue]);

  return (
    <div className="auth-container">
      <AuthFormHeader
        title={"Welcome Back"}
        description="Glad to see you again. Log in to your account."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5 w-full">
        {/* EMAIL */}
        <div>
          <label className="auth-input-label">Email Address</label>
          <Input
            type="email"
            placeholder="Enter your email"
            className={`auth-input ${errors.email ? "border-red-500" : ""}`}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* PASSWORD */}
        <div>
          <label className="auth-input-label">Password</label>
          <div className="relative mt-1">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className={`auth-input ${errors.password ? "border-red-500" : ""}`}
              {...register("password")}
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
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* REMEMBER + FORGOT */}
        <div className="flex items-center justify-between -mt-[9px]">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              className="accent-white data-checked:border-[#FF4000] data-checked:bg-[#FF4000] rounded-full h-5 w-5"
              checked={rememberMe}
              onCheckedChange={(checked) =>
                setValue("rememberMe", checked as boolean)
              }
            />
            <span className="text-[#4B5563] leading-[160%] tracking-[0.07px] text-sm font-normal">
              Remember me
            </span>
          </label>

          <Link
            href="/forgot-password"
            className="text-[#FF4000] font-industry text-sm font-bold leading-[116%] tracking-[0.07px]"
          >
            Forgot password?
          </Link>
        </div>

        {/* BUTTON */}
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Log in"}
        </PrimaryButton>

        {/* REGISTER */}
        <p className="text-[color:var(--Primary-Black,#070707)] text-center text-base font-normal leading-[160%] tracking-[0.08px]">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[color:var(--primary-orange-orange-500-main,#FF4000)] [font-family:Industry] text-base font-bold leading-[124%] tracking-[0.08px]"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
