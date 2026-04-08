import { cn } from "@/lib/utils";

// Define the available statuses as a type
export type ShipmentStatus = "En Route" | "Delivered" | "Picked Up" | "At Location" | "Active" | "Suspend" | "ONLINE" | "OFFLINE" | "Accepted" | "PENDING" | "PICKED_UP" | "DELIVERED" | "EN_ROUTE" | "PENDING" | "SUSPENDED" | "ACTIVE" | "RUNNER_NOT_FOUND"  ;

interface StatusBadgeProps {
  status: ShipmentStatus;
  className?: string;
}

const statusStyles: Record<ShipmentStatus, string> = {
  "En Route": "bg-[#EFFFEF] text-[#06AD06] border-[#06AD06]",
  Delivered: "bg-orange-50 text-orange-600 border-orange-200",
  "Picked Up": "bg-purple-50 text-purple-600 border-purple-200",
  "At Location": "bg-blue-50 text-blue-600 border-blue-200",
  Active: "bg-[#EFFFEF] text-[#06AD06] border-[#06AD06]",
  Suspend: "bg-[#FFE6E6] text-[#FF4D00] border-[#FF4D00]",
  ONLINE: "bg-[#EFFFEF] text-[#06AD06] border-[#06AD06]",
  OFFLINE: "bg-[#FFE6E6] text-[#FF4D00] border-[#FF4D00]",
  Accepted: "bg-[#EFFFEF] text-[#06AD06] border-[#06AD06]",
  PENDING: "bg-[#FFE6E6] text-[#FF4D00] border-[#FF4D00]",
  PICKED_UP: "bg-[#EFFFEF] text-[#06AD06] border-[#06AD06]",
  DELIVERED: "bg-orange-50 text-orange-600 border-orange-200",
  EN_ROUTE: "bg-purple-50 text-purple-600 border-purple-200",
  SUSPENDED: "bg-[#FFE6E6] text-[#FF4D00] border-[#FF4D00]",
  ACTIVE: "bg-[#EFFFEF] text-[#06AD06] border-[#06AD06]",
  RUNNER_NOT_FOUND: "bg-[#FFE6E6] text-[#FF4D00] border-[#FF4D00]",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-4 py-1.5 rounded-lg border text-xs font-semibold transition-colors",
        statusStyles[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
