"use client"

import { cn } from "@/lib/utils"
import { Controller, useFormContext } from "react-hook-form"

// =================== Simple Input ==================
interface SimpleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
    inputClassName?: string
    labelClassName?: string
    containerClassName?: string
}

export function SimpleInput({
    label,
    inputClassName,
    labelClassName,
    containerClassName,
    readOnly,
    ...props
}: SimpleInputProps) {
    return (
        <div className={cn("space-y-2", containerClassName)}>
            {label && (
                <label className={cn("text-sm font-semibold text-[#1E293B] block mb-2", labelClassName)}>
                    {label}
                </label>
            )}
            <input
                {...props}
                readOnly={readOnly}
                className={cn(
                    // Base heights and padding from your .read-only-input idea
                    "flex h-[54px] w-full items-center px-4 rounded-xl border border-solid transition-all outline-none",
                    "text-sm font-medium",
                    
                    // Conditional styling based on ReadOnly state
                    readOnly 
                        ? "bg-[#F9FAFB] border-[#EAECF0] text-[#111111] cursor-default focus:ring-0 focus:border-[#EAECF0]" 
                        : "bg-white border-[#D1D5DB] text-[#1E293B] focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00]/20",
                    
                    // Placeholder styling
                    "placeholder:text-slate-400 placeholder:font-normal",
                    
                    inputClassName
                )}
            />
        </div>
    )
}

// =============================== Form Input ===============================

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: string
    label?: string
    inputClassName?: string  
    labelClassName?: string
    containerClassName?: string
    
}

export default function FormInput({ name, label, labelClassName, containerClassName, ...props }: FormInputProps) {
    const context = useFormContext()
    
    if (!context) {
        throw new Error('FormInput must be used within a FormProvider')
    }
    
    const { control } = context

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className={cn("w-full", containerClassName)}>
                    {/* Passes field properties and props down to SimpleInput. 
                      Label logic is handled inside SimpleInput for consistency. 
                    */}
                    <SimpleInput 
                        {...field} 
                        {...props} 
                        label={label} 
                        labelClassName={labelClassName} 
                    />
                    
                    {fieldState.error && (
                        <p className="text-red-500 text-xs font-medium mt-1.5 ml-1">
                            {fieldState.error.message}
                        </p>
                    )}
                </div>
            )}
        />
    )
}