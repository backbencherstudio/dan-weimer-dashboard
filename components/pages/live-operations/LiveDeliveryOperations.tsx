"use client";

// 1. Updated Data Type based on your actual API response
type Order = {
  id: string;
  contractorName: string;
  supplierName: string;
  runner: { 
    id: string;
    name: string; 
    avatar?: string; 
    initials: string;
    vehicleType?: string;
    vehicleModel?: string;
  };
  status: "EN_ROUTE" | "DELIVERED" | "PICKED_UP" | "AT_LOCATION";
  etaTime: string;
  price: string;
  packageName: string;
  weight: number;
  deliveryAddress: string;
  paymentStatus: "PAID" | "PENDING" | "FAILED";
  estimatedTimeMin: number;
  estimatedDistanceKm: number;
};

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { ShipmentStatus, StatusBadge } from "@/components/reusable/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TableActionsIcon } from "@/components/icons/TableActionsIcon";
import Link from "next/link";
import { useLiveOperations } from "@/hooks/useLiveOperations";
import { getInitials } from "@/lib/utils";

// Helper function to format status for display
const formatStatus = (status: Order["status"]): string => {
  switch(status) {
    case "EN_ROUTE": return "En Route";
    case "DELIVERED": return "Delivered";
    case "PICKED_UP": return "Picked Up";
    case "AT_LOCATION": return "At Location";
    default: return status;
  }
};

// Helper to get initials from runner name
// const getInitials = (name?: string): string => {
//   if (!name) return "NA";
//   return name.split(' ').map(n => n[0]).join('').toUpperCase();
// };

export default function OrderListTable() {
  const { data: liveOperationsData, isLoading: liveOperationsIsLoading, error: liveOperationsError } = useLiveOperations();
  
  const searchParams = useSearchParams();
  const [data, setData] = useState<Order[]>([]);
  const [meta, setMeta] = useState({ totalPages: 0, totalCount: 0 });
  // const [isLoading, setIsLoading] = useState(true);

  // Transform and set data from original API
  useEffect(() => {
    if (liveOperationsData && Array.isArray(liveOperationsData)) {
      const transformedData: Order[] = liveOperationsData.map((item: any) => ({
        id: item.id,
        contractorName: item.contractor?.company_name || "N/A",
        supplierName: item.supplier?.name || "N/A",
        runner: {
          id: item.runner?.id || "",
          name: item.runner?.name || "Unassigned",
          initials: getInitials(item.runner?.name),
          avatar: undefined, // You can add avatar URL if available
          vehicleType: item.runner?.vehicle_type,
          vehicleModel: item.runner?.vehicle_model
        },
        status: item.status,
        etaTime: item.estimated_time_min 
          ? `${item.estimated_time_min} mins` 
          : "N/A",
        price: `$${item.total_amount || "0"}`,
        packageName: item.package_name || "N/A",
        weight: item.weight || 0,
        deliveryAddress: item.delivery_address || "N/A",
        paymentStatus: item.payment_status,
        estimatedTimeMin: item.estimated_time_min || 0,
        estimatedDistanceKm: item.estimated_distance_km || 0
      }));
      
      setData(transformedData);
      setMeta({ 
        totalPages: Math.ceil(transformedData.length / 8), 
        totalCount: transformedData.length 
      });
      // setIsLoading(false);
    } else if (liveOperationsError) {
      console.error("Error fetching data:", liveOperationsError);
      // setIsLoading(false);
    }
  }, [liveOperationsData, liveOperationsError]);

  // Handle pagination
  const currentPage = Number(searchParams.get("page")) || 1;
  const paginatedData = data.slice((currentPage - 1) * 8, currentPage * 8);

  const columns: Column<Order>[] = [
    {
      header: "Order No.",
      accessorKey: "id",
      render: (item) => <span className="text-[#4A4C56] font-mono text-sm">{item.id.slice(0, 8)}...</span>,
    },
    { 
      header: "Contractor Name", 
      accessorKey: "contractorName",
      render: (item) => <span className="font-medium">{item.contractorName}</span>
    },
    { 
      header: "Supplier Name", 
      accessorKey: "supplierName",
      render: (item) => <span>{item.supplierName}</span>
    },
    {
      header: "Runner",
      accessorKey: "runner",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.runner.avatar} />
            <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-[10px] font-bold">
              {item.runner.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{item.runner.name}</span>
            {item.runner.vehicleModel && (
              <span className="text-xs text-gray-500">{item.runner.vehicleModel}</span>
            )}
          </div>
        </div>
      ),
    },
    {
      header: "Package",
      accessorKey: "packageName",
      render: (item) => (
        <div className="flex flex-col">
          <span className="text-sm">{item.packageName}</span>
          <span className="text-xs text-gray-500">{item.weight} kg</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (item) => <StatusBadge status={item.status as ShipmentStatus} />,
    },
    { 
      header: "ETA", 
      accessorKey: "etaTime",
      render: (item) => (
        <div className="flex flex-col">
          <span className="text-sm">{item.etaTime}</span>
          <span className="text-xs text-gray-500">{item.estimatedDistanceKm} km</span>
        </div>
      )
    },
    { 
      header: "Price", 
      accessorKey: "price",
      render: (item) => <span className="font-semibold text-[#1E293B]">{item.price}</span>
    },
    {
      header: "Payment",
      accessorKey: "paymentStatus",
      render: (item) => (
        <span className={cn(
          "px-2 py-1 rounded-full text-xs font-medium",
          item.paymentStatus === "PAID" ? "bg-green-100 text-green-700" : 
          item.paymentStatus === "PENDING" ? "bg-yellow-100 text-yellow-700" : 
          "bg-red-100 text-red-700"
        )}>
          {item.paymentStatus}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      render: (item) => (
        <Link href={`/dashboard/live-operations/${item.id}`} className="flex items-center gap-3 hover:text-[#FF4D00]">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <TableActionsIcon.View className="h-4 w-4" />
          </Button>
        </Link>
      ),
    }
  ];

  // Show loading state
  if (liveOperationsIsLoading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1E293B]">Live Delivery Operations</h2>
        </div>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-gray-500">Loading orders...</div>
        </div>
      </div>
    );
  }

  // Show error state
  if (liveOperationsError) {
    return (
      <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-[#1E293B]">Live Delivery Operations</h2>
        </div>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-red-500">Error loading orders: {liveOperationsError.message}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-[#1E293B]">Live Delivery Operations</h2>
        <div className="text-sm text-gray-500">
          Total Orders: {meta.totalCount}
        </div>
      </div>

      <div className="min-h-[400px]">
        <GenericDataTable
          columns={columns}
          data={paginatedData}
          isLoading={false}
        />
      </div>

      {paginatedData.length > 0 && (
        <div className="mt-6 border-t border-[#F1F5F9] pt-2">
          <ReusablePagination
            totalPages={meta.totalPages}
            totalEntries={meta.totalCount}
          />
        </div>
      )}
    </div>
  );
}