"use client";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Input } from "../ui/input";
import PrimaryButton from "../reusable/CustomButton";
import AuthFormHeader from "./AuthFormHeader";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordForm() {
    const router  = useRouter();    
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setMessage(null);
    
    try {
      // API call here
      console.log("Password reset requested:", data.email);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage({
        type: "success",
        text: "Password reset link sent! Check your email.",
      });
      reset();

      router.push("/verify-otp?email=" + encodeURIComponent(data.email));

      
      
    } catch (error) {
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <AuthFormHeader
        title={"Forgot Password?"}
        description="Enter your email to receive a password reset link."
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5 w-full">
        {/* MESSAGE */}
        {message && (
          <div className={`p-3 rounded-md ${
            message.type === "success" 
              ? "bg-green-50 border border-green-200 text-green-700" 
              : "bg-red-50 border border-red-200 text-red-700"
          }`}>
            {message.text}
          </div>
        )}

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

        {/* BUTTON */}
        <PrimaryButton type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Reset Link"}
        </PrimaryButton>

        {/* BACK TO LOGIN */}
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF4000] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}