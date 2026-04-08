"use client";

import { useMemo, useState } from "react";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { ShipmentStatus, StatusBadge } from "@/components/reusable/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { CustomSelect } from "@/components/reusable/CustomSelect";
import { useClientPagination } from "@/hooks/useClientPagination";
import {
  cn,
  formatDate,
  formatDateTime,
  formatCurrency,
  formatPaymentStatus,
  getSupplierInitials,
} from "@/lib/utils";

// Updated type to match actual API response
type Order = {
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
  status: ShipmentStatus;
  payment_status: "PAID" | "PENDING" | "UNPAID";
  total_amount: string;
  is_available: boolean;
  created_at: string;
};



export default function ContractorOrderList({
  orderList,
  isLoading = false,
}: {
  orderList: Order[] | undefined;
  isLoading?: boolean;
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const orders = useMemo(() => orderList ?? [], [orderList]);

  const filteredData = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter(
      (order) =>
        order.status.toLowerCase() === statusFilter.toLowerCase()
    );
  }, [orders, statusFilter]);

  const itemsPerPage = 5;
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    totalEntries,
  } = useClientPagination(filteredData, itemsPerPage, {
    resetPageWhen: statusFilter,
  });

  // Get unique statuses for filter options
  const getFilterOptions = () => {
    const statuses = new Set(orders.map((order) => order.status.toLowerCase()));
    const options = [{ label: "All Status", value: "all" }];
    
    if (statuses.has("runner_not_found")) options.push({ label: "Runner Not Found", value: "runner_not_found" });
    if (statuses.has("accepted")) options.push({ label: "Accepted", value: "accepted" });
    if (statuses.has("picked_up")) options.push({ label: "Picked Up", value: "picked_up" });
    if (statuses.has("en_route")) options.push({ label: "En Route", value: "en_route" });
    if (statuses.has("delivered")) options.push({ label: "Delivered", value: "delivered" });
    if (statuses.has("pending")) options.push({ label: "Pending", value: "pending" });
    
    return options;
  };

  const columns: Column<Order>[] = [
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
    {
      header: "Supplier",
      accessorKey: "supplier",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={undefined} />
            <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-[10px] font-bold">
              {getSupplierInitials(item.supplier.name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#1E293B]">{item.supplier.name}</span>
            <span className="text-xs text-slate-400 truncate max-w-[150px]">
              {item.supplier.location}
            </span>
          </div>
        </div>
      ),
    },
    { 
      header: "Delivery Address", 
      accessorKey: "delivery_address",
      render: (item) => (
        <span className="text-sm text-[#4A4C56] max-w-[200px] block truncate">
          {item.delivery_address}
        </span>
      )
    },
    { 
      header: "Pickup Date", 
      accessorKey: "pickup_date",
      render: (item) => (
        <span className="text-sm text-[#4A4C56]">
          {formatDateTime(item.pickup_date)}
        </span>
      )
    },
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
        // Special handling for RUNNER_NOT_FOUND status
        if (item.status === "RUNNER_NOT_FOUND") {
          return (
            <span className={cn(
              "px-4 py-1 rounded-lg border text-xs font-semibold inline-block min-w-[110px] text-center",
              "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]"
            )}>
              Runner Not Found
            </span>
          );
        }
        return <StatusBadge status={item.status as ShipmentStatus} />;
      },
    },
  ];

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
            totalEntries={totalEntries}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            syncUrl={false}
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