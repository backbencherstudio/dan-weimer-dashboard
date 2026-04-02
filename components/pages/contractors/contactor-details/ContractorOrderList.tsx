"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { StatusBadge } from "@/components/reusable/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { CustomSelect } from "@/components/reusable/CustomSelect";
import { cn } from "@/lib/utils";

// Updated Data Type to match image_420625.png
type Order = {
  id: string;
  productName: string;
  orderDate: string;
  runner: { name: string; avatar?: string; initials: string };
  amount: string; // Changed from price to amount
  paymentStatus: "Paid" | "Pending";
  status: "En Route" | "Delivered" | "Picked Up";
};

const getFakeData = (page: number) => {
  const allItems: Order[] = Array.from({ length: 40 }).map((_, i) => ({
    id: `VTY7162E`, // Static ID per design mockup
    productName: "Brake Pads Front",
    orderDate: "08-15-2026",
    runner: { 
      name: i % 3 === 0 ? "Jenny Wilson" : i % 3 === 1 ? "John Dukes" : "Kurt Bates", 
      initials: i % 3 === 0 ? "AB" : "JD",
      avatar: i === 1 ? "https://github.com/shadcn.png" : undefined
    },
    amount: "$1,500",
    paymentStatus: i % 3 === 2 ? "Pending" : "Paid",
    status: i % 3 === 0 ? "Delivered" : i % 3 === 1 ? "En Route" : "Picked Up",
  }));
  
  const limit = 5; // Design shows 5 entries per view
  const start = (page - 1) * limit;
  return {
    items: allItems.slice(start, start + limit),
    totalPages: Math.ceil(allItems.length / limit),
    totalCount: allItems.length
  };
};

export default function ContractorOrderList() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Order[]>([]);
  const [meta, setMeta] = useState({ totalPages: 0, totalCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      const page = Number(searchParams.get("page")) || 1;
      const { items, totalPages, totalCount } = getFakeData(page);
      setData(items);
      setMeta({ totalPages, totalCount });
      setIsLoading(false);
    };
    fetchData();
  }, [searchParams]);

  const columns: Column<Order>[] = [
    {
      header: "Order No.",
      accessorKey: "id",
      render: (item) => <span className="text-[#4A4C56]">ID: {item.id}</span>,
    },
    { header: "Product Name", accessorKey: "productName" },
    { header: "Order Date", accessorKey: "orderDate" },
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
    { header: "Amount", accessorKey: "amount" }, // Matches image_420625.png
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
      render: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1E293B]">Order List</h2>
        <CustomSelect 
          options={[
            { label: "All Status", value: "all" },
            { label: "Delivered", value: "delivered" },
            { label: "En Route", value: "en-route" },
          ]} 
          placeholder="Status"
          className="w-[120px]" // Matches button size in design
        />
      </div>

      <div className="min-h-[400px]">
        <GenericDataTable
          columns={columns}
          data={data}
          isLoading={isLoading}
        />
      </div>

      {data.length > 0 && (
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