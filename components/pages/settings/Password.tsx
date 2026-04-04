"use client";

import { EyeClosed, EyeIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function ChangePassword() {


  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isDirty },
    reset,
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    reset(data);
  };

  return (
    <div className="w-full  border border-[color:var(--background-hover-50,#ECEFF3)] [background:#FFF] rounded-xl p-6 md:p-8">

      {/* Title */}
      <h2 className="mb-8 text-[28px] font-extrabold text-[#111827] font-industry">
        Change Password
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

        {/* Old Password */}
        <div>
          <label className="mb-3 block text-[18px] font-medium text-[#111827]">
            Old Password
          </label>
          <div className="relative">
            <input
            
              type={showOldPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("oldPassword")}
              className="h-[56px] w-full rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 pr-12 text-[18px] outline-none"
            />
            <span onClick={() => setShowOldPassword(!showOldPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showOldPassword ? <EyeIcon /> : <EyeClosed />}
            </span>
          </div>
        </div>

        {/* New Password */}
        <div>
          <label className="mb-3 block text-[18px] font-medium text-[#111827]">
            Create Password
          </label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("newPassword")}
              className="h-[56px] w-full rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 pr-12 text-[18px] outline-none"
            />
            <span onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showNewPassword ? <EyeIcon /> : <EyeClosed />}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="mb-3 block text-[18px] font-medium text-[#111827]">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("confirmPassword")}
              className="h-[56px] w-full rounded-xl border border-[#E5E7EB] bg-[#F3F4F6] px-4 pr-12 text-[18px] outline-none"
            />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              {showConfirmPassword ? <EyeIcon /> : <EyeClosed />}
            </span>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={!isDirty}
            className={`h-[52px] min-w-[178px] rounded-xl text-[20px] font-bold transition-all ${isDirty
                ? "bg-[#FF5A0A] text-white hover:bg-[#E94F05]"
                : "bg-[#FF5A0A]/60 text-white cursor-not-allowed"
              }`}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}