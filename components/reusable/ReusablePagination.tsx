// components/reusable/ReusablePagination.tsx
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  totalPages: number;
  totalEntries: number;
  className?: string;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  /** When false, page changes only flow through onPageChange (no ?page= in URL). */
  syncUrl?: boolean;
}

export function ReusablePagination({
  totalPages,
  totalEntries,
  className,
  currentPage = 1,
  onPageChange,
  syncUrl = true,
}: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handlePageChange = (page: number) => {
    if (syncUrl) {
      const params = new URLSearchParams(searchParams);
      params.set("page", page.toString());
      replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
    onPageChange?.(page);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisible = 2;

    for (let i = 1; i <= totalPages; i++) {
      if (i <= maxVisible || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={cn(
              "w-10 h-10 rounded-lg border text-sm font-semibold transition-all",
              currentPage === i
                ? "bg-[#FF4D00] border-[#FF4D00] text-white"
                : "border-slate-200 text-slate-400 hover:bg-slate-50"
            )}
          >
            {i}
          </button>
        );
      } else if (i === maxVisible + 1) {
        buttons.push(<span key="dots" className="px-1 text-slate-300">...</span>);
      }
    }
    return buttons;
  };

  return (
    <div className={cn("flex items-center justify-between w-full py-4", className)}>
      <span className="text-sm text-[#64748b]">Showing {totalEntries} entries</span>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-2 text-slate-900 disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {renderPageButtons()}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-2 text-slate-900 disabled:opacity-30"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}