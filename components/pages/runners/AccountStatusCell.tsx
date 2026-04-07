import { CustomSelect } from "@/components/reusable/CustomSelect";
import { cn } from "@/lib/utils";
import { useState } from "react";

type AccountStatusCellProps = {
    runner: any;
    onStatusChange: (id: string, newStatus: string) => Promise<void>;
}

// Create a new component for better organization
export const AccountStatusCell = ({ runner, onStatusChange }: AccountStatusCellProps) => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(runner.accountStatus);

    const handleStatusChange = async (newValue: string) => {
        setIsUpdating(true);
        try {
            await onStatusChange(runner.id, newValue);
            setCurrentStatus(newValue === "active" ? "Active" : "Suspend");
        } catch (error) {
            console.error("Failed to update status:", error);
            // Optionally show error toast/notification
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="flex items-start justify-start" >
            <CustomSelect
                defaultValue={currentStatus.toLowerCase()}
                options={[
                    { label: "Active", value: "active" },
                    { label: "Suspend", value: "suspend" },
                ]}
                onValueChange={handleStatusChange}
                className={cn(
                    "w-fit max-w-[80px] max-h-[32px] text-sm ",
                    currentStatus === "Active"
                        ? "text-[#22C55E] border-[#BBF7D0] bg-[#F0FDF4]"
                        : "text-[#EA580C] border-[#FFC4B0] bg-[#FFF7ED]"
                )}
            />
        </div>
    );
};

