import { cn } from "@/lib/utils"

// Define the available statuses as a type
export type ShipmentStatus = "En Route" | "Delivered" | "Picked Up";

interface StatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

const statusStyles: Record<ShipmentStatus, string> = {
  "En Route": "bg-green-50 text-green-600 border-green-200",
  "Delivered": "bg-orange-50 text-orange-600 border-orange-200",
  "Picked Up": "bg-purple-50 text-purple-600 border-purple-200",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-4 py-1.5 rounded-lg border text-xs font-semibold transition-colors",
        statusStyles[status],
        className
      )}
    >
      {status}
    </span>
  );
}