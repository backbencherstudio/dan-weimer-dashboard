"use client";

import { useEffect, useMemo, useState } from "react";

type UseClientPaginationOptions = {
  /** When this value changes, current page resets to 1 (e.g. filter key). */
  resetPageWhen?: unknown;
};

/**
 * Client-only pagination: slices `items` by page, clamps page when total pages shrink,
 * and optionally resets to page 1 when `resetPageWhen` changes.
 */
export function useClientPagination<T>(
  items: readonly T[],
  itemsPerPage: number,
  options?: UseClientPaginationOptions
) {
  const { resetPageWhen } = options ?? {};
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / itemsPerPage) || 1),
    [items.length, itemsPerPage]
  );

  useEffect(() => {
    setCurrentPage((p) => Math.min(p, totalPages));
  }, [totalPages]);

  useEffect(() => {
    setCurrentPage(1);
  }, [resetPageWhen]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return items.slice(start, start + itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  return {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData,
    totalEntries: items.length,
  };
}
