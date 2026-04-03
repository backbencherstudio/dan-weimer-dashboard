"use client";
import * as React from "react";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils"; // Using standard shadcn utility for classes
import { Button } from "../ui/button";
import { XIcon } from "lucide-react";

interface ReusableModalProps extends React.ComponentProps<typeof Dialog> {
    onClose?: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
    hideCloseButton?: boolean; 
    customCloseButton?: boolean;
}

export default function CustomModal({
    open,
    onOpenChange,
    onClose,
    title,
    children,
    className,
    hideCloseButton = false, // Changed to false to show by default
    customCloseButton = true, // Design usually expects a close 'X'
}: ReusableModalProps) {
    
    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen && onClose) {
            onClose();
        }
        onOpenChange?.(newOpen);
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent
                className={cn(
                    // flex + max-height so the body can scroll on short viewports (mobile)
                    "flex max-h-[min(90dvh,calc(100dvh-2rem))] flex-col gap-0 overflow-hidden p-0 sm:max-w-[920px]",
                    "bg-[#F9FAFB] border-none rounded-lg shadow-sm",
                    className
                )}
            >
                {/* Header Section */}

                {title && (
                    <div className="flex shrink-0 justify-between items-center border bg-[#F6F8FA] p-6">
                        <h3 className="text-[color:var(--B,#070707)]  text-xl font-semibold leading-[130%] tracking-[0.1px]">
                            {title}
                        </h3>
                    </div>
                )}
                {/* <div className="flex justify-between items-center px-8 py-6 bg-[#F9FAFB]">
                    {title && (
                        <h3 className="text-[#09090B] font-semibold text-[22px] tracking-tight">
                            {title}
                        </h3>
                    )}
                                              
               
                </div> */}

                {/* Main Content Area — min-h-0 lets flex child shrink so overflow-y-auto works */}
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pt-6 pb-8 [-webkit-overflow-scrolling:touch]">
                    {children}
                </div>
            </DialogContent>
        </Dialog>
    );
}