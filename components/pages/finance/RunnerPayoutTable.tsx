"use client";

import { useEffect, useState } from "react";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { cn } from "@/lib/utils";
import { PayoutData } from "@/types/payout.types";

export default function RunnerPayouts() {
  const [data, setData] = useState<PayoutData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayouts = async () => {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 500));
      
      const mockPayouts: PayoutData[] = [
        { id: "1", orderNo: "VTY7162E", runnerName: "Jenny Wilson", initials: "AB", productName: "Brake Pads Front", amount: "$1,500", paymentStatus: "Paid", paymentDate: "08-15-2026" },
        { id: "2", orderNo: "VTY7162E", runnerName: "John Dukes", avatar: "https://github.com/shadcn.png", initials: "JD", productName: "Brake Pads Front", amount: "$1,500", paymentStatus: "Paid", paymentDate: "08-10-2026" },
        { id: "3", orderNo: "VTY7162E", runnerName: "Brooklyn Simmons", initials: "BS", productName: "Brake Pads Front", amount: "$1,500", paymentStatus: "Failed", paymentDate: "-" },
        { id: "4", orderNo: "VTY7162E", runnerName: "Dennis Callis", initials: "BS", productName: "Brake Pads", amount: "$1,500", paymentStatus: "Pending", paymentDate: "08-12-2026" },
      ];

      setData(mockPayouts);
      setIsLoading(false);
    };
    fetchPayouts();
  }, []);

  const columns: Column<PayoutData>[] = [
    {
      header: "Runner name",
      accessorKey: "runnerName",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={item.avatar} />
            <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-xs font-bold">
              {item.initials}
            </AvatarFallback>
          </Avatar>
          <span className="font-medium text-[#1E293B]">{item.runnerName}</span>
        </div>
      ),
    },
    {
      header: "Order No.",
      accessorKey: "orderNo",
      render: (item) => <span className="text-[#4A4C56]">ID: {item.orderNo}</span>,
    },
    { header: "Product Name", accessorKey: "productName" },
    { header: "Amount", accessorKey: "amount" },
    {
      header: "Payment Status",
      accessorKey: "paymentStatus",
      render: (item) => (
        <span className={cn(
          "px-4 py-1.5 rounded-lg border text-xs font-semibold inline-block min-w-[85px] text-center",
          item.paymentStatus === "Paid" && "bg-[#F0FDF4] text-[#22C55E] border-[#BBF7D0]",
          item.paymentStatus === "Failed" && "bg-[#FFF1F0] text-[#FF4D4F] border-[#FFA39E]",
          item.paymentStatus === "Pending" && "bg-[#FEFCE8] text-[#EAB308] border-[#FEF08A]"
        )}>
          {item.paymentStatus}
        </span>
      ),
    },
    { 
      header: "Payment Date", 
      accessorKey: "paymentDate",
      render: (item) => (
        <span className={item.paymentDate === "-" ? "text-slate-400 pl-4" : "text-[#1E293B]"}>
          {item.paymentDate}
        </span>
      )
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Runner Payouts</h2>
      
      <div className="min-h-[350px]">
        <GenericDataTable columns={columns} data={data} isLoading={isLoading} />
      </div>

      {!isLoading && (
        <div className="mt-6 border-t pt-2">
          <ReusablePagination totalPages={5} totalEntries={20} />
        </div>
      )}
    </div>
  );
}   