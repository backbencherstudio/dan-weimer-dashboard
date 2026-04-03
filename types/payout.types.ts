type PayoutData = {
    id: string;
    orderNo: string;
    runnerName: string;
    avatar?: string;
    initials: string;
    productName: string;
    amount: string;
    paymentStatus: "Paid" | "Failed" | "Pending";
    paymentDate: string;
  };

export type { PayoutData };