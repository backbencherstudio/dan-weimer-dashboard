"use client";

type Contractor = {
    id: string;
    companyName: string;
    address: string;
    joinDate: string;
    inTransitOrders: number;
    lifetimeSpend: string;
    accountStatus: "Active" | "Suspend";
  };





import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CustomSelect } from "@/components/reusable/CustomSelect";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { TableSkeleton } from "@/components/reusable/TableSkeleton";
import { Eye,  } from "lucide-react"; // Install lucide-react if not present
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ContractorsList() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Contractor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState({ totalPages: 0, totalCount: 0 });

  useEffect(() => {
    const fetchContractors = async () => {
      setIsLoading(true);
      // Simulate API delay
      await new Promise((res) => setTimeout(res, 800));
      
      const page = Number(searchParams.get("page")) || 1;
      // Mocking the data based on image_3480ef.png
      const mockData: Contractor[] = [
        { id: "1", companyName: "Cala Foods", address: "4517 Washington Ave. Manchest...", joinDate: "08-15-2026", inTransitOrders: 22, lifetimeSpend: "$410.73", accountStatus: "Active" },
        { id: "2", companyName: "Pacific Stereo", address: "2118 Thornridge Cir. Syracuse, C...", joinDate: "08-10-2026", inTransitOrders: 10, lifetimeSpend: "$2,147.20", accountStatus: "Active" },
        { id: "3", companyName: "Total Network Development", address: "8502 Preston Rd. Inglewood, M...", joinDate: "08-20-2026", inTransitOrders: 8, lifetimeSpend: "$5,080.59", accountStatus: "Active" },
        { id: "4", companyName: "Finast", address: "3891 Ranchview Dr. Richardson,...", joinDate: "08-12-2026", inTransitOrders: 16, lifetimeSpend: "$888.60", accountStatus: "Suspend" },
      ];

      setData(mockData);
      setMeta({ totalPages: 8, totalCount: 40 }); // Matches pagination in image_265ec6.png
      setIsLoading(false);
    };
    fetchContractors();
  }, [searchParams]);

  const columns: Column<Contractor>[] = [
    {
      header: "Company Name & Address",
      accessorKey: "companyName",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-xs font-bold">BS</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-[#1E293B]">{item.companyName}</span>
            <span className="text-xs text-slate-400 truncate w-48">{item.address}</span>
          </div>
        </div>
      ),
    },
    { header: "Join Date", accessorKey: "joinDate" },
    { header: "In Transit Orders", accessorKey: "inTransitOrders" },
    { header: "Lifetime Spend", accessorKey: "lifetimeSpend" },
    {
      header: "Account Status",
      accessorKey: "accountStatus",
      render: (item) => (
        <CustomSelect
          defaultValue={item.accountStatus.toLowerCase()}
          options={[
            { label: "Active", value: "active" },
            { label: "Suspend", value: "suspend" },
          ]}
          className={cn(
            "w-[110px] h-[36px] rounded-lg border",
            item.accountStatus === "Active" 
              ? "text-[#22C55E] border-[#BBF7D0] bg-[#F0FDF4]" 
              : "text-[#EA580C] border-[#FFC4B0] bg-[#FFF7ED]"
          )}
        />
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      render: (item : Contractor) => (
        <Link href={`/contractors/${item.id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center">
          <Eye className="h-5 w-5 text-slate-400" />
        </Link>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Contractors List</h2>
      
      <div className="min-h-[400px]">
        {isLoading ? (
          <TableSkeleton columnCount={6} rowCount={4} />
        ) : (
          <GenericDataTable columns={columns} data={data} />
        )}
      </div>

      {!isLoading && (
        <div className="mt-6 border-t pt-2">
          <ReusablePagination totalPages={meta.totalPages} totalEntries={meta.totalCount} />
        </div>
      )}
    </div>
  );
}