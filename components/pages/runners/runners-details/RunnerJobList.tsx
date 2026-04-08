"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { ShipmentStatus, StatusBadge } from "@/components/reusable/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { CustomSelect } from "@/components/reusable/CustomSelect";
import { cn } from "@/lib/utils";

// Updated type to match actual API response
type Job = {
  id: string;
  package_name: string;
  supplier: {
    id: string;
    name: string;
    location: string;
    street: string;
    city: string;
    zip_code: string;
    orders_fulfilled: number;
  };
  delivery_address: string;
  pickup_date: string;
  status: "ACCEPTED" | "PICKED_UP" | "DELIVERED" | "EN_ROUTE" | "PENDING";
  payment_status: "PAID" | "PENDING" | "UNPAID";
  total_amount: string;
  is_available: boolean;
  created_at: string;
};

// Format date to readable format
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

// Format status for display
const formatStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    "ACCEPTED": "Accepted",
    "PICKED_UP": "Picked Up",
    "DELIVERED": "Delivered",
    "EN_ROUTE": "En Route",
    "PENDING": "Pending"
  };
  return statusMap[status] || status;
};

// Format payment status for display
const formatPaymentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    "PAID": "Paid",
    "PENDING": "Pending",
    "UNPAID": "Unpaid"
  };
  return statusMap[status] || status;
};

// Format amount to currency
const formatCurrency = (amount: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(amount));
};

export default function RunnerJobList({ jobList }: { jobList: Job[] }) {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Job[]>([]);
  const [filteredData, setFilteredData] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Process jobList data
  useEffect(() => {
    if (jobList && jobList.length > 0) {
      setData(jobList);
      setFilteredData(jobList);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [jobList]);

  // Apply status filter
  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredData(data);
    } else {
      setFilteredData(data.filter(job =>
        job.status.toLowerCase() === statusFilter.toLowerCase()
      ));
    }
  }, [statusFilter, data]);

  // Handle pagination
  const itemsPerPage = 5;
  const currentPage = Number(searchParams.get("page")) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const columns: Column<Job>[] = [
    {
      header: "Order No.",
      accessorKey: "id",
      render: (item) => (
        <span className="text-[#4A4C56] font-mono text-sm">
          {item.id.slice(-8).toUpperCase()}
        </span>
      ),
    },
    {
      header: "Product Name",
      accessorKey: "package_name",
      render: (item) => (
        <span className="font-medium text-[#1E293B]">{item.package_name}</span>
      )
    },
    {
      header: "Order Date",
      accessorKey: "created_at",
      render: (item) => <span>{formatDate(item.created_at)}</span>
    },
    // { 
    //   header: "Supplier", 
    //   accessorKey: "supplier",
    //   render: (item) => (
    //     <div>
    //       <p className="text-sm font-medium text-[#1E293B]">{item.supplier.name}</p>
    //       <p className="text-xs text-[#6B7280]">{item.supplier.location}</p>
    //     </div>
    //   )
    // },
    // { 
    //   header: "Delivery Address", 
    //   accessorKey: "delivery_address",
    //   render: (item) => (
    //     <span className="text-sm text-[#4A4C56]">{item.delivery_address}</span>
    //   )
    // },
    {
      header: "Amount",
      accessorKey: "total_amount",
      render: (item) => (
        <span className="font-semibold text-[#1E293B]">
          {formatCurrency(item.total_amount)}
        </span>
      )
    },
    {
      header: "Payment Status",
      accessorKey: "payment_status",
      render: (item) => (
        <span className={cn(
          "px-4 py-1 rounded-lg border text-xs font-semibold inline-block min-w-[75px] text-center",
          item.payment_status === "PAID"
            ? "bg-[#F0FDF4] text-[#22C55E] border-[#BBF7D0]"
            : item.payment_status === "PENDING"
              ? "bg-[#FEFCE8] text-[#EAB308] border-[#FEF08A]"
              : "bg-[#FEE2E2] text-[#EF4444] border-[#FECACA]"
        )}>
          {formatPaymentStatus(item.payment_status)}
        </span>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      render: (item) => {
        // Map status to StatusBadge compatible format
        const badgeStatus = item.status === "ACCEPTED" ? "Accepted" :
          item.status === "PICKED_UP" ? "Picked Up" :
            item.status === "EN_ROUTE" ? "En Route" :
              item.status === "DELIVERED" ? "Delivered" : "Pending";
        return <StatusBadge status={badgeStatus as ShipmentStatus} />;
      },
    },

  ];

  // Filter options based on available statuses in data
  const getFilterOptions = () => {
    const statuses = new Set(data.map(job => job.status.toLowerCase()));
    const options = [{ label: "All Status", value: "all" }];

    if (statuses.has("accepted")) options.push({ label: "Accepted", value: "accepted" });
    if (statuses.has("picked_up")) options.push({ label: "Picked Up", value: "picked_up" });
    if (statuses.has("en_route")) options.push({ label: "En Route", value: "en_route" });
    if (statuses.has("delivered")) options.push({ label: "Delivered", value: "delivered" });
    if (statuses.has("pending")) options.push({ label: "Pending", value: "pending" });

    return options;
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1E293B]">
          Order List
          {filteredData.length > 0 && (
            <span className="ml-2 text-sm font-normal text-[#6B7280]">
              ({filteredData.length} orders)
            </span>
          )}
        </h2>
        <CustomSelect
          options={getFilterOptions()}
          placeholder="Status"
          defaultValue={statusFilter}
          onValueChange={(value: string) => setStatusFilter(value)}
          className="w-[140px]"
        />
      </div>

      <div className="min-h-[400px]">
        <GenericDataTable
          columns={columns}
          data={paginatedData}
          isLoading={isLoading}
        />
      </div>

      {filteredData.length > 0 && (
        <div className="mt-6 border-t border-[#F1F5F9] pt-2">
          <ReusablePagination
            totalPages={totalPages}
            totalEntries={filteredData.length}
          />
        </div>
      )}

      {filteredData.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <p className="text-[#6B7280]">No orders found</p>
        </div>
      )}
    </div>
  );
}