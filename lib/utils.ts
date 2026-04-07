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