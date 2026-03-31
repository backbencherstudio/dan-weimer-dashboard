"use client";

import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { ShipmentStatus, StatusBadge } from "@/components/reusable/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

// 2. Mock Data
const shipments: Shipment[] = [
  {
    id: "VTY7162E",
    productName: "Brake Pads Front",
    eta: "08-15-2026 14:30",
    weight: "12.4 kg",
    runner: { name: "Jenny Wilson", initials: "AB" },
    price: "$1,500",
    status: "En Route",
  },
  {
    id: "VTY7162E",
    productName: "Brake Pads Front",
    eta: "08-10-2026 09:00",
    weight: "10.0 kg",
    runner: {
      name: "John Dukes",
      initials: "JD",
      avatar: "https://github.com/shadcn.png",
    },
    price: "$1,500",
    status: "En Route",
  },
  {
    id: "VTY7162E",
    productName: "Brake Pads Front",
    eta: "08-20-2026 11:15",
    weight: "8.6 kg",
    runner: { name: "Brooklyn Simmons", initials: "BS" },
    price: "$1,500",
    status: "Delivered",
  },
  {
    id: "VTY7162E",
    productName: "Brake Pads Front",
    eta: "08-12-2026 16:45",
    weight: "16.3 kg",
    runner: { name: "Dennis Callis", initials: "DC" },
    price: "$1,500",
    status: "Picked Up",
  },
];

export default function RecentShipmentTable() {
  // 3. Define Columns with Custom Rendering
  const columns: Column<Shipment>[] = [
    {
      header: "Order No.",
      accessorKey: "id",
      render: (item) => <span className="text-slate-600">ID: {item.id}</span>,
    },
    { header: "Product Name", accessorKey: "productName" },
    { header: "ETA Date & Time", accessorKey: "eta" },
    { header: "Weight (kg)", accessorKey: "weight" },
    {
      header: "Runner name",
      accessorKey: "runner",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-orange-100">
            <AvatarImage src={item.runner.avatar} />
            <AvatarFallback className="bg-orange-50 text-orange-600 text-xs font-bold">
              {item.runner.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{item.runner.name}</span>
        </div>
      ),
    },
    { header: "Price", accessorKey: "price" },
    {
      header: "Status",
      accessorKey: "status",
      render: (item) => <StatusBadge status={item.status as ShipmentStatus} />,
    },
  ];

  return (
    <div className="">
      <div className="mx-auto space-y-6 rounded-2xl border-solid border  p-6 border-[#EDEDED]">
        <div className="flex items-center justify-between ">
          <h2 className="text-2xl font-bold text-[#1e293b] font-industry">
            Recent Shipment Activity
          </h2>
          <button className="bg-[#FF4D00] hover:bg-[#e64500] text-white px-6 py-2.5 rounded-xl font-bold transition-all font-industry">
            See All
          </button>
        </div>

        <GenericDataTable columns={columns} data={shipments} />

        <p>Paggination</p>
      </div>
    </div>
  );
}
