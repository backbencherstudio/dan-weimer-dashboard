import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InboxIcon, Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { TableSkeleton } from "./TableSkeleton";

export interface Column<T> {
  header: string;
  accessorKey: keyof T | string;
  render?: (item: T) => ReactNode;
}

interface GenericDataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  noDataMessage?: string;
}

export function GenericDataTable<T>({ columns, data, isLoading, noDataMessage = "No Data Found" }: GenericDataTableProps<T>) {

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">

        {/* Icon Container */}
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-orange-50 mb-4">
          <InboxIcon className="w-10 h-10 text-orange-600/60" />
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium text-gray-800/50 !">
          {noDataMessage} !
        </h3>

        {/* Description */}
        {/* <p className="text-sm text-gray-500 mt-1 max-w-sm">
          There is currently no data available here. Once data is added, it will appear in this section.
        </p> */}
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <TableSkeleton columnCount={columns.length} />
      </div>
    );
  }
  return (
    <div className="  bg-white overflow-hidden ">
      <Table>
        <TableHeader className="bg-[#F1F5F9]">
          <TableRow className="hover:bg-transparent border-none">
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className="font-bold text-[#070707)] py-4 first:pl-4 last:pr-4 font-industry"
              >
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, rowIndex) => (
            <TableRow key={rowIndex} className="border-b last:border-0 border-slate-100 hover:bg-slate-50/50 transition-colors">
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className="py-5 first:pl-6 last:pr-6">
                  {column.render
                    ? column.render(item)
                    : (item[column.accessorKey as keyof T] as ReactNode)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}