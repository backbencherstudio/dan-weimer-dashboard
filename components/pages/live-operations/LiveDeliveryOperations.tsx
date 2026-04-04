"use client";

// 1. Updated Data Type
type Order = {
  id: string;
  contractorName: string;
  supplierName: string;
  runner: { name: string; avatar?: string; initials: string };
  status: "En Route" | "Delivered" | "Picked Up" | "At Location";
  etaTime: string;
  price: string;

};

// Inside your component, update getFakeData:
const getFakeData = (page: number) => {
  const allItems: Order[] = Array.from({ length: 50 }).map((_, i) => ({
    id: `VTY7${1000 + i}E`,
    contractorName: i % 2 === 0 ? "Sofa Express" : "Mostow Co.",
    supplierName: i % 2 === 0 ? "Sofa Express" : "Mostow Co.",
    etaTime: "08-15-2026 14:30",
    runner: {
      name: i % 3 === 0 ? "Jenny Wilson" : "John Dukes",
      initials: i % 3 === 0 ? "AB" : "JD",
      avatar: i === 1 ? "https://github.com/shadcn.png" : undefined
    },
    price: "$1,500",
    status: i % 3 === 0 ? "Delivered" : i % 3 === 1 ? "En Route" : "Picked Up",
  }));
  // ... rest of pagination logic
  const limit = 8;
  const start = (page - 1) * limit;
  return {
    items: allItems.slice(start, start + limit),
    totalPages: Math.ceil(allItems.length / limit),
    totalCount: allItems.length
  };
};




import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { StatusBadge } from "@/components/reusable/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { CustomSelect } from "@/components/reusable/CustomSelect";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TableActionsIcon } from "@/components/icons/TableActionsIcon";
import Link from "next/link";

export default function OrderListTable() {
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
    { header: "Contractor Name", accessorKey: "contractorName" },
    { header: "Supplier Name", accessorKey: "supplierName" },
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
    {
      header: "Status",
      accessorKey: "status",
      render: (item) => <StatusBadge status={item.status} />,
    },
    { header: "ETA Time", accessorKey: "etaTime" },
    { header: "Price", accessorKey: "price" },
    {
      header: "Action",
      accessorKey: "action",
      render: (item) => (
        <Link href={`/live-operations/${item.id}`} className="flex items-center gap-3 hover:text-[#FF4D00]">
          <Button variant="outline" size="icon">
            <TableActionsIcon.View className="h-5 w-5 text-white" />
          </Button>
        </Link>
      ),
    }


  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
      {/* Header with Filter */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1E293B]">Live Delivery Operations</h2>
        {/* <CustomSelect
          options={[
            { label: "All Status", value: "all" },
            { label: "Delivered", value: "delivered" },
            { label: "En Route", value: "en-route" },
          ]}
          placeholder="Status"
          className="w-full md:w-[128px] h-10!"
        /> */}
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