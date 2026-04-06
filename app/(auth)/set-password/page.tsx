"use client";

import SetNewPasswordForm from "@/components/auth/SetNewPasswordForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

 function SetPasswordPageWithoutSuspense() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const otp = searchParams.get("otp");
  return (
    <div>
      <SetNewPasswordForm email={email || ""} otp={otp || ""} />
     </div>
  );
}


export default function SetPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}> <SetPasswordPageWithoutSuspense /> </Suspense>

  );
}