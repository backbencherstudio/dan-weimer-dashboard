import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Helper function to format date
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

// Helper function to format datetime
export const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Helper function to format currency
export const formatCurrency = (amount: string): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(parseFloat(amount));
};

// Helper function to format payment status for display
export const formatPaymentStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    "PAID": "Paid",
    "PENDING": "Pending",
    "UNPAID": "Unpaid"
  };
  return statusMap[status] || status;
};

// Helper function to format order status for display
export const formatOrderStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    "RUNNER_NOT_FOUND": "Runner Not Found",
    "ACCEPTED": "Accepted",
    "PICKED_UP": "Picked Up",
    "DELIVERED": "Delivered",
    "EN_ROUTE": "En Route",
    "PENDING": "Pending"
  };
  return statusMap[status] || status;
};

// Get supplier initials for avatar
export const getSupplierInitials = (supplierName: string): string => {
  return supplierName
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};


// Helper function to get initials
export const getInitials = (name: string): string => {
  if (!name || name === "N/A") return "N/A";
  return name
      .split(" ")
      .map(word => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
};

function pickPositiveInt(obj: unknown, keys: string[]): number | undefined {
  if (!obj || typeof obj !== "object") return undefined;
  const o = obj as Record<string, unknown>;
  for (const k of keys) {
    const v = o[k];
    if (typeof v === "number" && Number.isFinite(v) && v >= 0) return Math.floor(v);
  }
  return undefined;
}

/**
 * Reads total count / page count from common paginated API shapes (camelCase + snake_case, meta, pagination).
 */
export function parsePaginatedListMeta(
  response: unknown,
  itemsPerPage: number,
  pageItemCount: number,
  currentPage: number
): { totalEntries: number; totalPages: number } {
  if (!response || typeof response !== "object") {
    return { totalEntries: pageItemCount, totalPages: 1 };
  }
  const r = response as Record<string, unknown>;
  const meta =
    r.meta && typeof r.meta === "object"
      ? (r.meta as Record<string, unknown>)
      : {};
  const pagination =
    r.pagination && typeof r.pagination === "object"
      ? (r.pagination as Record<string, unknown>)
      : {};
  const nested =
    r.data && typeof r.data === "object" && !Array.isArray(r.data)
      ? (r.data as Record<string, unknown>)
      : {};

  const total =
    pickPositiveInt(r, ["total", "totalCount", "total_count", "count", "recordsTotal"]) ??
    pickPositiveInt(meta, ["total", "totalCount", "total_count", "count"]) ??
    pickPositiveInt(pagination, ["total", "totalCount", "total_count"]) ??
    pickPositiveInt(nested, ["total", "totalCount", "total_count"]);

  let totalPages =
    pickPositiveInt(r, [
      "totalPages",
      "total_pages",
      "lastPage",
      "last_page",
      "pageCount",
      "page_count",
    ]) ??
    pickPositiveInt(meta, ["totalPages", "total_pages", "lastPage", "last_page"]) ??
    pickPositiveInt(pagination, ["totalPages", "total_pages"]);

  const hasNext =
    r.hasNext === true ||
    r.has_next === true ||
    pagination.hasNext === true ||
    meta.hasNext === true;

  if (total !== undefined && total > 0) {
    const pages = Math.max(1, Math.ceil(total / itemsPerPage));
    return { totalEntries: total, totalPages: pages };
  }

  if (totalPages !== undefined && totalPages >= 1) {
    const estimatedTotal = Math.max(
      pageItemCount,
      (totalPages - 1) * itemsPerPage + pageItemCount
    );
    return { totalEntries: estimatedTotal, totalPages };
  }

  if (hasNext) {
    return {
      totalEntries: Math.max(pageItemCount, (currentPage + 1) * itemsPerPage),
      totalPages: Math.max(currentPage + 1, 2),
    };
  }

  return { totalEntries: pageItemCount, totalPages: 1 };
}
