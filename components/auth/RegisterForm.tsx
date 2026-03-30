"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { EyeClosed, EyeIcon } from "lucide-react";
import { Input } from "../ui/input";
import PrimaryButton from "../reusable/CustomButton";
import AuthFormHeader from "./AuthFormHeader";

// Validation schema
const registerSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  email: z.string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")

    // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    // .regex(/[0-9]/, "Password must contain at least one number")
    // .regex(/[@$!%*?&]/, "Password must contain at least one special character (@$!%*?&)"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    
    try {
      // Make your API call here
      console.log("Registration data:", data);
      
      // Example API call:
      // const response = await fetch("/api/auth/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message || "Registration failed");
      // }
      
      // const result = await response.json();
      
      // Handle success (redirect to login, show toast, etc.)
      console.log("Registration successful!");
      reset(); // Reset form on success
      
    } catch (error) {
      console.error("Registration error:", error);
      // Handle error (show error message)
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <AuthFormHeader
        title={"Create an Account"}
        description="Sign up to get started with your account."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5 w-full">
        {/* USERNAME */}
        <div>
          <label className="auth-input-label">Username</label>
          <Input
            type="text"
            placeholder="Choose a username"
            className={`auth-input ${errors.username ? "border-red-500" : ""}`}
            {...register("username")}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
          )}
        </div>

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
              placeholder="Create a password"
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
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
          
          {/* Password requirements hint */}
          {/* <div className="mt-2 text-xs text-gray-500 space-y-1">
            <p>Password must contain:</p>
            <ul className="list-disc list-inside space-y-0.5">
              <li className={errors.password?.message?.includes("8") ? "text-red-500" : "text-green-600"}>
                At least 8 characters
              </li>
              <li className={errors.password?.message?.includes("uppercase") ? "text-red-500" : "text-green-600"}>
                One uppercase letter
              </li>
              <li className={errors.password?.message?.includes("lowercase") ? "text-red-500" : "text-green-600"}>
                One lowercase letter
              </li>
              <li className={errors.password?.message?.includes("number") ? "text-red-500" : "text-green-600"}>
                One number
              </li>
              <li className={errors.password?.message?.includes("special") ? "text-red-500" : "text-green-600"}>
                One special character (@$!%*?&)
              </li>
            </ul>
          </div> */}
        </div>

        {/* BUTTON */}
        <PrimaryButton type="submit" disabled={isLoading} className="mt-4">
          {isLoading ? "Creating account..." : "Sign Up"}
        </PrimaryButton>

        {/* LOGIN LINK */}
        <p className="text-[color:var(--Primary-Black,#070707)] text-center text-base font-normal leading-[160%] tracking-[0.08px]">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-[color:var(--primary-orange-orange-500-main,#FF4000)] [font-family:Industry] text-base font-bold leading-[124%] tracking-[0.08px]"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
}