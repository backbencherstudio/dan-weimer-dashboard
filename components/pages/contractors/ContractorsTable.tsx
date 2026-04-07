"use client";

type Contractor = {
  id: string;
  company_name: string;
  business_address: string;
  created_at: string;
  in_transit_orders: number;
  lifetime_spend: number;
  user: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    status: "ACTIVE" | "SUSPEND";
  };
};

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { CustomSelect } from "@/components/reusable/CustomSelect";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { TableSkeleton } from "@/components/reusable/TableSkeleton";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useActivateContractor, useContractors, useSuspendContractor } from "@/hooks/useContractors";
import toast from "react-hot-toast";


// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Helper function to get initials from company name
const getInitials = (companyName: string): string => {
  return companyName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// API function to update contractor status
const updateContractorStatus = async (contractorId: string, newStatus: string): Promise<void> => {
  const status = newStatus.toUpperCase();

  const response = await fetch(`/api/contractors/${contractorId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to update status");
  }
};

export default function ContractorsList() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<Contractor[]>([]);
  const [meta, setMeta] = useState({ totalPages: 0, totalCount: 0 });
  const { mutate: suspendContractor } = useSuspendContractor();
  const { mutate: activateContractor } = useActivateContractor();
  const { data: contractorsData, isLoading: isContractorsLoading, refetch } = useContractors(
    Number(searchParams.get("page")) || 1,
    Number(searchParams.get("limit")) || 10
  );

  // Transform API data to component format
  useEffect(() => {
    if (contractorsData && !isContractorsLoading) {
      // Check if contractorsData has data property (paginated response)
      const contractors = Array.isArray(contractorsData) ? contractorsData : contractorsData.data || [];
      const totalCount = contractorsData.total || contractorsData.totalCount || contractors.length;
      const totalPages = contractorsData.totalPages || Math.ceil(totalCount / 10);

      setData(contractors);
      setMeta({
        totalPages: totalPages,
        totalCount: totalCount
      });

    }
  }, [contractorsData, isContractorsLoading]);

  const handleStatusChange = async (contractorId: string, newStatus: string) => {
    if (newStatus === "ACTIVE") {
      activateContractor(contractorId);
    } else if (newStatus === "SUSPENDED") {
      suspendContractor(contractorId);
    }
    else {
      toast.error("Invalid status");
    }
  };

  const columns: Column<Contractor>[] = [
    {
      header: "Company Name & Address",
      accessorKey: "company_name",
      render: (item) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-xs font-bold">
              {getInitials(item.company_name)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-bold text-[#1E293B]">{item.company_name}</span>
            <span className="text-xs text-slate-400 truncate w-48">
              {item.business_address}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Contact Person",
      accessorKey: "user",
      render: (item) => (
        <div className="flex flex-col">
          <span className="text-sm font-medium text-[#1E293B]">{item.user.name}</span>
          <span className="text-xs text-slate-400">{item.user.email}</span>
        </div>
      )
    },
    {
      header: "Join Date",
      accessorKey: "created_at",
      render: (item) => <span>{formatDate(item.created_at)}</span>
    },
    {
      header: "In Transit Orders",
      accessorKey: "in_transit_orders",
      render: (item) => (
        <span className="font-semibold text-[#1E293B]">{item.in_transit_orders}</span>
      )
    },
    {
      header: "Lifetime Spend",
      accessorKey: "lifetime_spend",
      render: (item) => (
        <span className="font-semibold text-[#1E293B]">
          {formatCurrency(item.lifetime_spend)}
        </span>
      )
    },
    {
      header: "Account Status",
      accessorKey: "user.status",
      render: (item) => (
        <CustomSelect
          defaultValue={item.user.status as string | "ACTIVE" | "SUSPENDED"}
          options={[
            { label: "Active", value: "ACTIVE" },
            { label: "Suspend", value: "SUSPENDED" },
          ]}
          onValueChange={(newValue: string) => handleStatusChange(item.id, newValue)}
          className={cn(
            "w-[110px] h-[36px] rounded-lg border",
            item.user.status === "ACTIVE"
              ? "text-[#22C55E] border-[#BBF7D0] bg-[#F0FDF4]"
              : "text-[#EA580C] border-[#FFC4B0] bg-[#FFF7ED]"
          )}
        />
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      render: (item: Contractor) => (
        <Link
          href={`/dashboard/contractors/${item.id}`}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center border border-[#EDEDED] px-4 py-2"
        >
          <Eye className="h-5 w-5 text-slate-400" />
        </Link>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
      <h2 className="text-2xl font-bold text-[#1E293B] mb-6">
        Contractors List
        {data.length > 0 && (
          <span className="ml-2 text-sm font-normal text-[#6B7280]">
            ({meta.totalCount} total)
          </span>
        )}
      </h2>

      <div className="min-h-[400px]">
        {isContractorsLoading ? (
          <TableSkeleton columnCount={6} rowCount={4} />
        ) : (
          <GenericDataTable columns={columns} data={data} />
        )}
      </div>

      {!isContractorsLoading && data.length > 0 && (
        <div className="mt-6 border-t pt-2">
          <ReusablePagination
            totalPages={meta.totalPages}
            totalEntries={meta.totalCount}
          />
        </div>
      )}

      {!isContractorsLoading && data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#6B7280]">No contractors found</p>
        </div>
      )}
    </div>
  );
}