"use client";

import { useMemo } from "react";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { ShipmentStatus, StatusBadge } from "@/components/reusable/StatusBadge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatCurrency } from "@/lib/utils";


type Shipment = {
  id: string;
  productName: string;
  eta: string;
  weight: string;
  runner: { name: string; avatar?: string; initials: string };
  price: string;
  status: ShipmentStatus;
};

type ApiShipment = {
  order_no: string;
  product_name: string;
  eta_date_time: string;
  weight_kg: number;
  runner_name: string;
  price: number;
  status: string;
};

const formatStatus = (status: string): ShipmentStatus => {
  if (status === "ACCEPTED") return "Accepted";
  if (status === "PICKED_UP") return "PICKED_UP";
  if (status === "DELIVERED") return "DELIVERED";
  if (status === "EN_ROUTE") return "EN_ROUTE";
  if (status === "RUNNER_NOT_FOUND") return "RUNNER_NOT_FOUND";
  return "PENDING";
};

const formatEta = (isoDate: string) =>
  new Date(isoDate).toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const getInitials = (name: string) => {
  if (!name || name === "-") return "--";
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export default function RecentShipmentActivity({ data }: { data: { data?: ApiShipment[] } }) {
  const shipments = useMemo<Shipment[]>(
    () =>
      (data?.data ?? []).map((item) => ({
        id: item.order_no || "-",
        productName: item.product_name || "-",
        eta: formatEta(item.eta_date_time),
        weight: `${item.weight_kg ?? 0} kg`,
        runner: {
          name: item.runner_name || "-",
          initials: getInitials(item.runner_name || "-"),
          avatar: undefined,
        },
        price: formatCurrency(String(item.price ?? 0)),
        status: formatStatus(item.status),
      })),
    [data]
  );

  const columns: Column<Shipment>[] = [
    {
      header: "Order No.",
      accessorKey: "id",
      render: (item) => <span className="text-[#4A4C56] font-medium">{item.id}</span>,
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

      <div className="min-h-[200px]">
        <GenericDataTable
          noDataMessage="No Shipment Activity Found"
          columns={columns}
          data={shipments}
          isLoading={false}
        />
      </div>
    </div>
  );
}