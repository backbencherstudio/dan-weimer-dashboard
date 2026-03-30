"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { EyeClosed, EyeIcon, CheckCircle } from "lucide-react";
import { Input } from "../ui/input";
import PrimaryButton from "../reusable/CustomButton";
import AuthFormHeader from "./AuthFormHeader";

// Validation schema
const setNewPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SetNewPasswordFormData = z.infer<typeof setNewPasswordSchema>;

interface SetNewPasswordFormProps {
  email?: string;
  otp?: string;
}

export default function SetNewPasswordForm({
  email = "user@example.com",
  otp = "",
}: SetNewPasswordFormProps) {
  const router = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetNewPasswordFormData>({
    resolver: zodResolver(setNewPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: SetNewPasswordFormData) => {
    setIsLoading(true);

    try {
      console.log("Setting new password for:", email);
      console.log("New password:", data.newPassword);
      console.log("OTP:", otp);

      // Example API call:
      // const response = await fetch("/api/auth/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     email,
      //     otp,
      //     newPassword: data.newPassword
      //   }),
      // });

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setIsSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      console.error("Password reset error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="auth-container">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Password Reset Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset. Redirecting you to login...
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-[#FF4000] font-semibold hover:underline"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <AuthFormHeader
        title="Set New Password"
        description={`Create a new password for ${email}`}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5 w-full">
        <div>
          <label className="auth-input-label">New Password</label>
          <div className="relative mt-1">
            <Input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter new password"
              className={`auth-input ${errors.newPassword ? "border-red-500" : ""}`}
              {...register("newPassword")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showNewPassword ? (
                <EyeClosed className="w-4 md:w-6 h-4 md:h-6" />
              ) : (
                <EyeIcon className="w-4 md:w-6 h-4 md:h-6" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label className="auth-input-label">Confirm New Password</label>
          <div className="relative mt-1">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              className={`auth-input ${errors.confirmPassword ? "border-red-500" : ""}`}
              {...register("confirmPassword")}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showConfirmPassword ? (
                <EyeIcon className="w-4 md:w-6 h-4 md:h-6" />
              ) : (
                <EyeClosed className="w-4 md:w-6 h-4 md:h-6" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? "Resetting Password..." : "Reset Password"}
        </PrimaryButton>

        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF4000] transition-colors text-sm"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}