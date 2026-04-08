"use client";

import VerifyOtpForm from '@/components/auth/VerifyOtpForm'
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { Suspense } from 'react';

function VerifyOtpPageWithoutSuspense() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  return (
    <div>
      <VerifyOtpForm email={email || ""} />
    </div>
  )
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}> <VerifyOtpPageWithoutSuspense /> </Suspense>
  );
}
