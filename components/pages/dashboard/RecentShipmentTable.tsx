"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { StatusBadge } from "@/components/reusable/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";

// 1. Define your Data Type
type Shipment = {
  id: string;
  productName: string;
  eta: string;
  weight: string;
  runner: { name: string; avatar?: string; initials: string };
  price: string;
  status: "En Route" | "Delivered" | "Picked Up";
};

export default function RecentShipmentActivity() {
  const searchParams = useSearchParams();
  
  // States
  const [data, setData] = useState<Shipment[]>([]);
  const [meta, setMeta] = useState({ totalPages: 0, totalCount: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // 2. Mock Data Generator (Simulates your Backend API)
  const getFakeData = (page: number) => {
    const allItems: Shipment[] = Array.from({ length: 50 }).map((_, i) => ({
      id: `VTY${7000 + i}E`,
      productName: i % 2 === 0 ? "Brake Pads Front" : "Oil Filter Premium",
      eta: "08-15-2026 14:30",
      weight: `${(Math.random() * 20).toFixed(1)} kg`,
      runner: { 
        name: i % 3 === 0 ? "Jenny Wilson" : "John Dukes", 
        initials: "JW",
        avatar: i % 3 === 1 ? "https://github.com/shadcn.png" : undefined
      },
      price: `$${(1000 + i * 10).toLocaleString()}`,
      status: i % 3 === 0 ? "En Route" : i % 3 === 1 ? "Delivered" : "Picked Up",
    }));

    const limit = 5;
    const start = (page - 1) * limit;
    return {
      items: allItems.slice(start, start + limit),
      totalPages: Math.ceil(allItems.length / limit),
      totalCount: allItems.length
    };
  };

  // 3. Effect to "Fetch" Data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      
      // Simulating network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const page = Number(searchParams.get("page")) || 1;
      const { items, totalPages, totalCount } = getFakeData(page);

      /* LATER: Replace the lines above with your real API:
         const res = await fetch(`/api/admin/runner?page=${page}`);
         const { data, totalPages, totalCount } = await res.json();
      */

      setData(items);
      setMeta({ totalPages, totalCount });
      setIsLoading(false);
    };

    fetchData();
  }, [searchParams]);

  // 4. Columns Configuration
  const columns: Column<Shipment>[] = [
    {
      header: "Order No.",
      accessorKey: "id",
      render: (item) => <span className="text-[#4A4C56] font-medium">ID: {item.id}</span>,
    },
    { header: "Product Name", accessorKey: "productName" },
    { header: "ETA Date & Time", accessorKey: "eta" },
    { header: "Weight (kg)", accessorKey: "weight" },
    {
      header: "Runner name",
      accessorKey: "runner",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8 border border-orange-100">
            <AvatarImage src={item.runner.avatar} />
            <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-[10px] font-bold">
              {item.runner.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium text-[#1E293B]">{item.runner.name}</span>
        </div>
      ),
    },
    { header: "Price", accessorKey: "price" },
    {
      header: "Status",
      accessorKey: "status",
      render: (item) => <StatusBadge status={item.status} />,
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#1E293B] tracking-tight">
          Recent Shipment Activity
        </h2>
        <button className="bg-[#FF4D00] hover:bg-[#E64500] text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all shadow-md shadow-orange-100">
          See All
        </button>
      </div>

      <div className="min-h-[400px]">
        <GenericDataTable 
          columns={columns} 
          data={data} 
          isLoading={isLoading} 
        />
      </div>

      <div className="mt-6 border-t border-[#F1F5F9] pt-2">
        <ReusablePagination 
          totalPages={meta.totalPages} 
          totalEntries={meta.totalCount} 
        />
      </div>
    </div>
  );
}