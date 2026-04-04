"use client";
import { use, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import PrimaryButton from "../reusable/CustomButton";
import AuthFormHeader from "./AuthFormHeader";
import { useRouter } from "next/navigation";

// Validation schema
const verifyOtpSchema = z.object({
  otp: z.string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

type VerifyOtpFormData = z.infer<typeof verifyOtpSchema>;

interface VerifyOtpFormProps {
  email?: string;
  onOtpVerified?: () => void;
}

export default function VerifyOtpForm({ email = "user@example.com", onOtpVerified }: VerifyOtpFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const otpValue = watch("otp");

  const onSubmit = async (data: VerifyOtpFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Make your API call here
      console.log("Verifying OTP:", data.otp);
      console.log("For email:", email);
      
      // Example API call:
      // const response = await fetch("/api/auth/verify-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, otp: data.otp }),
      // });
      
      // if (!response.ok) {
      //   const error = await response.json();
      //   throw new Error(error.message || "Invalid OTP");
      // }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Call success callback
      onOtpVerified?.();
      router.push("/set-password?email=" + encodeURIComponent(email) + "&otp=" + encodeURIComponent(data.otp));
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // API call to resend OTP
      console.log("Resending OTP to:", email);
      
      // const response = await fetch("/api/auth/resend-otp", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      
      // Show success message (optional)
      alert("Verification code resent successfully!");
      
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP change
  const handleOtpChange = (value: string) => {
    setValue("otp", value);
  };

  return (
    <div className="auth-container">
      <AuthFormHeader
        title={"Verify Your Email"}
        description={`We've sent a 6-digit verification code to ${email}`}
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6 w-full">
        {/* OTP INPUT */}
        <div className="space-y-2">
          <label className="auth-input-label text-center block">
            Enter Verification Code
          </label>
          
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otpValue}
              onChange={handleOtpChange}
              disabled={isLoading}
            >
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="!h-[56px] !w-[56px] md:!h-[45px] md:!w-[66px] rounded-[12px] border border-[#E5E7EB] bg-[#F9FAFB] text-[24px] font-semibold text-[#070707] focus:border-[#FF4000] focus:ring-0 data-[active=true]:border-[#FF4000] data-[active=true]:shadow-[0_0_0_4px_rgba(255,64,0,0.01)]"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          
          {errors.otp && (
            <p className="text-red-500 text-sm text-center mt-2">
              {errors.otp.message}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-sm text-center mt-2">
              {error}
            </p>
          )}
        </div>

        {/* RESEND SECTION */}
        <div className="text-center">
          <p className="self-stretch text-[color:var(--Primary-Black,#070707)] text-center text-base font-medium leading-[160%] tracking-[0.08px] mb-2">
            Haven't you got the OTP yet?
          </p>
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={isLoading}
            className="text-[color:var(--primary-orange-orange-500-main,#FF4000)] [font-family:Industry] text-base font-bold leading-[124%] tracking-[0.08px] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Resend Code
          </button>
        </div>

        {/* BUTTON */}
        <PrimaryButton type="submit" disabled={isLoading || otpValue?.length !== 6} className="py-5.5 w-full">
          {isLoading ? "Verifying..." : "Verify Code"}
        </PrimaryButton>

        {/* BACK TO LOGIN */}
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF4000] transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
}