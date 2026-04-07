"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { ShipmentStatus, StatusBadge } from "@/components/reusable/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { CustomSelect } from "@/components/reusable/CustomSelect";
import { cn } from "@/lib/utils";
import { useOrders } from "@/hooks/useOrders";
import {
  formatCurrency,
  formatDate,
  getInitials,
  parsePaginatedListMeta,
} from "@/lib/utils";

// Updated Data Type for transformed orders
type Order = {
    id: string;
    productName: string;
    orderDate: string;
    contractorName: string;
    runner: { name: string; avatar?: string; initials: string };
    price: string;
    paymentStatus: "Paid" | "Pending";
    status: "En Route" | "Delivered" | "Picked Up" | "Runner Not Found" | "Accepted";
};


const formatPaymentStatus = (status: string): "Paid" | "Pending" => {
    return status === "PAID" ? "Paid" : "Pending";
};

const formatOrderStatus = (status: string): Order["status"] => {
    const statusMap: Record<string, Order["status"]> = {
        "DELIVERED": "Delivered",
        "EN_ROUTE": "En Route",
        "PICKED_UP": "Picked Up",
        "RUNNER_NOT_FOUND": "Runner Not Found",
        "ACCEPTED": "Accepted"
    };
    return statusMap[status] || "Pending";
};

// Transform API order to table format
const transformOrder = (apiOrder: any): Order => ({
    id: apiOrder.id?.slice(-8).toUpperCase() || "N/A",
    productName: apiOrder.package_name || "N/A",
    orderDate: formatDate(apiOrder.created_at),
    contractorName: apiOrder.contractor?.company_name || "N/A",
    runner: {
        name: apiOrder.runner?.name || "Unassigned",
        initials: getInitials(apiOrder.runner?.name || "Unassigned"),
        avatar: undefined // Add avatar logic if needed
    },
    price: formatCurrency(apiOrder.total_amount),
    paymentStatus: formatPaymentStatus(apiOrder.payment_status),
    status: formatOrderStatus(apiOrder.status)
});


//  main component
export default function OrderListTable() {
    const searchParams = useSearchParams();
    const [statusFilter, setStatusFilter] = useState<string>("all");
    
    // Get current page from URL
    const currentPage = Number(searchParams.get("page")) || 1;
    const itemsPerPage = 3; // Match your design
    
    // Fetch orders from API
    const { data: ordersResponse, isLoading: isOrdersLoading } = useOrders(currentPage, itemsPerPage);
    
    // Transform API data to table format
    const transformedOrders = useMemo(() => {
        if (!ordersResponse?.data) return [];
        return ordersResponse?.data?.map(transformOrder);
    }, [ordersResponse]);
    
    // Apply status filter (current API page only — full-list filter would need a query param)
    const filteredOrders = useMemo(() => {
        if (statusFilter === "all") return transformedOrders;
        return transformedOrders.filter((order: Order) =>
            order.status.toLowerCase() === statusFilter.toLowerCase()
        );
    }, [transformedOrders, statusFilter]);

    const { totalEntries, totalPages } = parsePaginatedListMeta(
        ordersResponse,
        itemsPerPage,
        transformedOrders.length,
        currentPage
    );

    // Get unique statuses for filter options
    const filterOptions = useMemo(() => {
        const statuses = new Set(transformedOrders.map((order: Order) => order.status.toLowerCase()));
        const options = [{ label: "All Status", value: "all" }];

        if (statuses.has("delivered")) options.push({ label: "Delivered", value: "delivered" });
        if (statuses.has("en route")) options.push({ label: "En Route", value: "en route" });
        if (statuses.has("picked up")) options.push({ label: "Picked Up", value: "picked up" });
        if (statuses.has("runner not found")) options.push({ label: "Runner Not Found", value: "runner not found" });
        if (statuses.has("accepted")) options.push({ label: "Accepted", value: "accepted" });

        return options;
    }, [transformedOrders]);

    const columns: Column<Order>[] = [
        {
            header: "Order No.",
            accessorKey: "id",
            render: (item) => <span className="text-[#4A4C56] font-mono">ID: {item.id}</span>,
        },
        { header: "Product Name", accessorKey: "productName" },
        { header: "Order Date", accessorKey: "orderDate" },
        { header: "Contractor Name", accessorKey: "contractorName" },
        {
            header: "Runner name",
            accessorKey: "runner",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={item.runner.avatar} />
                        <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-[10px] font-bold">
                            {item.runner.initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{item.runner.name}</span>
                </div>
            ),
        },
        { header: "Price", accessorKey: "price" },
        { 
            header: "Payment Status", 
            accessorKey: "paymentStatus",
            render: (item) => (
                <span className={cn(
                    "px-4 py-1 rounded-lg border text-xs font-semibold inline-block min-w-[75px] text-center",
                    item.paymentStatus === "Paid" 
                        ? "bg-[#F0FDF4] text-[#22C55E] border-[#BBF7D0]" 
                        : "bg-[#FEFCE8] text-[#EAB308] border-[#FEF08A]"
                )}>
                    {item.paymentStatus}
                </span>
            )
        },
        {
            header: "Status",
            accessorKey: "status",
            render: (item) => <StatusBadge status={item.status as ShipmentStatus} />,
        },
    ];

    return (
        <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1E293B]">
                    Order List
                    {filteredOrders.length > 0 && (
                        <span className="ml-2 text-sm font-normal text-[#6B7280]">
                            ({filteredOrders.length} orders)
                        </span>
                    )}
                </h2>
                <CustomSelect 
                    options={filterOptions}
                    placeholder="Status"
                    defaultValue={statusFilter}  
                    onValueChange={(value: string) => setStatusFilter(value)}
                    className="w-full md:w-[140px] h-10"
                />
            </div>

            <div className="min-h-[400px]">
                <GenericDataTable
                    columns={columns}
                    data={filteredOrders}
                    isLoading={isOrdersLoading}
                />
            </div>

            {totalEntries > 0 && !isOrdersLoading && (
                <div className="mt-6 border-t border-[#F1F5F9] pt-2">
                    <ReusablePagination
                        totalPages={totalPages}
                        totalEntries={totalEntries}
                        currentPage={currentPage}
                    />
                </div>
            )}

            {filteredOrders.length === 0 && !isOrdersLoading && (
                <div className="text-center py-12">
                    <p className="text-[#6B7280]">No orders found</p>
                </div>
            )}
        </div>
    );
}