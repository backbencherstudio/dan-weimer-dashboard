import { cn } from "@/lib/utils"
import { Controller, useFormContext } from "react-hook-form"



// =============================== Simple Input ===============================
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
    ...props
}: SimpleInputProps) {
    return (
        <div className={cn("space-y-2", containerClassName)}>
            {label && (
                <label className={cn("text-sm font-medium leading-none block mb-3", labelClassName)}>
                    {label}
                </label>
            )}
            <input
                {...props}
                className={cn(
                    "flex min-h-10 items-center gap-2 self-stretch border px-[15px] py-2.5 rounded-lg border-solid border-[rgba(255,255,255,0.10)] focus:border-[#F6D642]",
                    "placeholder:text-[#5B5B5B] placeholder:font-[Inter] placeholder:text-sm placeholder:font-normal placeholder:leading-5",
                    "bg-transparent text-white text-sm outline-none w-full",
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

export default function FormInput({ name, label, labelClassName,  containerClassName, ...props }: FormInputProps) {
    const { control } = useFormContext()

    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <div className={cn("space-y-1", containerClassName)}>
                    {label && (
                        <label className={cn("text-sm font-medium mb-3 block", labelClassName)}>{label}</label>
                    )}
                    <SimpleInput {...field} {...props} />
                    {fieldState.error && (
                        <p className="text-red-400/80 text-xs font-medium my-1.5">{fieldState.error.message}</p>
                    )}
                </div>
            )}
        />
    )
}