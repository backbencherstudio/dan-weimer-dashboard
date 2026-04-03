import { Column } from "@/components/reusable/DataTable";
import { TableActionsIcon } from "@/components/icons/TableActionsIcon";
import { Supplier } from "@/types/supplier.types";
import { cn } from "@/lib/utils";




type Props = {
  onView: (supplier: Supplier) => void;
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
};

export const useSupplierColumns = ({
  onView,
  onEdit,
  onDelete,
}: Props): Column<Supplier>[] => [
    { header: "Supplier Name", accessorKey: "name" },
    { header: "Supplier Address", accessorKey: "address" },
    { header: "Contact No.", accessorKey: "contactNo" },
    { header: "Contact Person", accessorKey: "contactPerson" },
    { header: "Orders Fulfilled", accessorKey: "ordersFulfilled", render: (item) => (
      <span className="text-sm font-medium">{item.ordersFulfilled}</span>
    ) },
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
      render: (item) => (
        <div className="flex items-center gap-3 text-slate-400">
          <button onClick={() => onEdit(item)}>
            <TableActionsIcon.Edit className="h-4 w-4 cursor-pointer hover:text-slate-600 transition-colors" />
          </button>
          <button onClick={() => onView(item)}>
            <TableActionsIcon.View
              className="h-4 w-4 cursor-pointer hover:text-slate-600 transition-colors"
            />
          </button>
          

          <button onClick={() => onDelete(item)}>
            <TableActionsIcon.Delete
              className="h-4 w-4 cursor-pointer hover:text-red-500 transition-colors"
            />
          </button>
        </div>
      ),
    },
  ];