"use client";


type Supplier = {
    id: string;
    name: string;
    address: string;
    contactNo: string;
    contactPerson: string;
    ordersFulfilled: number;
    status: "Active" | "Inactive";
  };
// modal state type — clean and explicit
type ModalState = {
    type: "view" | "edit" | "delete" | null;
    supplier: Supplier | null;
  };

import { useEffect, useState } from "react";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { Plus } from "lucide-react"; 
import { cn } from "@/lib/utils";
import { TableActionsIcon } from "@/components/icons/TableActionsIcon";

export default function SuppliersList() {
  const [data, setData] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [modal, setModal] = useState<ModalState>({
    type: null,
    supplier: null,

  })

  useEffect(() => {
    const fetchSuppliers = async () => {
      setIsLoading(true);
      await new Promise((res) => setTimeout(res, 700));
      
      const mockSuppliers: Supplier[] = [
        { id: "1", name: "Sofa Express", address: "4267 Cherry Tree Drive, Jacksonville, FL 32216", contactNo: "(303) 420-4261", contactPerson: "Daniel Hamilton", ordersFulfilled: 150, status: "Active" },
        { id: "2", name: "Mostow Co.", address: "2900 Ritter Street, Huntsville, AL 35802", contactNo: "(814) 413-9191", contactPerson: "Lorri Warf", ordersFulfilled: 120, status: "Active" },
        { id: "3", name: "Ezhe Source", address: "199 Oakway Lane, Woodland Hills, CA 91303", contactNo: "(503) 338-2573", contactPerson: "Kathy Pacheco", ordersFulfilled: 90, status: "Inactive" },
        { id: "4", name: "J. Brannam", address: "3522 West Fork Street, Missoula, MT 59801", contactNo: "(818) 313-7673", contactPerson: "Dennis Callis", ordersFulfilled: 200, status: "Active" },
      ];

      setData(mockSuppliers);
      setIsLoading(false);
    };
    fetchSuppliers();
  }, []);

  const columns: Column<Supplier>[] = [
    { header: "Supplier Name", accessorKey: "name" },
    { 
      header: "Supplier Address", 
      accessorKey: "address",
      render: (item) => <span className="text-slate-500 text-sm inline-block max-w-[200px] truncate">{item.address}</span> 
    },
    { header: "Contact No.", accessorKey: "contactNo" },
    { header: "Contact Person Name", accessorKey: "contactPerson" },
    { header: "Orders Fulfilled", accessorKey: "ordersFulfilled" },
    {
      header: "Status",
      accessorKey: "status",
      render: (item) => (
        <span className={cn(
          "px-4 py-1 rounded-lg border text-xs font-semibold inline-block min-w-[80px] text-center",
          item.status === "Active" 
            ? "bg-[#F0FDF4] text-[#22C55E] border-[#BBF7D0]" 
            : "bg-[#FFF1F0] text-[#FF4D4F] border-[#FFA39E]"
        )}>
          {item.status}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      render: () => (
        <div className="flex items-center gap-3 text-slate-400">
            <TableActionsIcon.Edit className="h-4 w-4 cursor-pointer hover:text-slate-600 transition-colors" />
          <TableActionsIcon.View className="h-4 w-4 cursor-pointer hover:text-slate-600 transition-colors" />
            <TableActionsIcon.Delete className="h-4 w-4 cursor-pointer hover:text-red-500 transition-colors" />
        </div>
      ),
    },
  ];

  return (
    <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
      {/* Header with Add Button */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-[#1E293B]">Suppliers List</h2>
        <button className="flex items-center gap-2 bg-[#FF4D00] hover:bg-[#E64500] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-md">
          <Plus className="h-5 w-5" />
          Add Supplier
        </button>
      </div>

      <div className="min-h-[400px]">
        <GenericDataTable columns={columns} data={data} isLoading={isLoading} />
      </div>

      {!isLoading && (
        <div className="mt-6 border-t pt-2">
          <ReusablePagination totalPages={10} totalEntries={40} />
        </div>
      )}
    </div>
  );
}