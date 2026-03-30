"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

export default function PrimaryButton({
  children,
  className,
  isLoading,
  disabled,
  ...props
}: PrimaryButtonProps) {
  return (
    <Button
      disabled={disabled || isLoading}
      className={cn(
        "flex py-2.5 justify-center items-center gap-2 self-stretch w-full cursor-pointer",
        "bg-[#FF4000] hover:bg-[#e03a00] active:bg-[#c93500]",
        "px-0 py-3.5 rounded-lg transition-colors duration-200",
        "text-white text-center text-base font-bold leading-[124%] tracking-[0.08px]",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </Button>
  );
}
