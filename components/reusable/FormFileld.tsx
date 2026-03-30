"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

// =============================== Simple Input ===============================

interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
  error?: string;
}

export function SimpleInput({
  label,
  inputClassName,
  labelClassName,
  containerClassName,
  error,
  ...props
}: SimpleInputProps) {
  return (
    <div className={cn("space-y-1", containerClassName)}>
      {label && (
        <label className={cn("auth-input-label", labelClassName)}>
          {label}
        </label>
      )}
      <Input
        {...props}
        className={cn(
          "auth-input",
          error && "border-red-400 focus-visible:border-red-400 focus-visible:shadow-[0_0_0_4px_rgba(248,113,113,0.12)]",
          inputClassName
        )}
      />
      {error && (
        <p className="text-red-400/80 text-xs font-medium mt-1">{error}</p>
      )}
    </div>
  );
}

// =============================== Form Input ===============================

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export default function FormInput({
  name,
  label,
  labelClassName,
  containerClassName,
  inputClassName,
  ...props
}: FormInputProps) {
  const context = useFormContext();

  // Fallback — renders without validation if used outside FormProvider
  if (!context) {
    return (
      <SimpleInput
        label={label}
        labelClassName={labelClassName}
        containerClassName={containerClassName}
        inputClassName={inputClassName}
        {...props}
      />
    );
  }

  const { control } = context;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <SimpleInput
          {...field}
          {...props}
          label={label}
          labelClassName={labelClassName}
          containerClassName={containerClassName}
          inputClassName={inputClassName}
          error={fieldState.error?.message}
        />
      )}
    />
  );
}