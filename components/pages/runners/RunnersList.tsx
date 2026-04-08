"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomSelect } from "@/components/reusable/CustomSelect";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRunners } from "@/hooks/useRunners";
import { AccountStatusCell } from "./AccountStatusCell";
import { toast } from "react-hot-toast";
import { runnersService } from "@/services/runners.service";

// Updated to match actual API response
type ApiRunnerResponse = {
    id: string;
    user_id: string;
    stripe_account_id: string | null;
    vehicle_type: string;
    vehicle_model: string;
    vehicle_identification_number: string;
    availability: "ONLINE" | "OFFLINE";
    total_deliveries: number;
    wallet_balance: string;
    total_earned: string;
    created_at: string;
    updated_at: string;
    user: {
        id: string;
        name: string;
        email: string;
        phone_number: string;
        status: "ACTIVE" | "SUSPEND";
    };
    accept_percent: number;
    complete_percent: number;
    earnings: number;
    current_balance: number;
};

type RunnerData = {
    id: string;
    name: string;
    avatar?: string;
    initials: string;
    acceptRate: string;
    completeRate: string;
    earnings: string;
    currentBalance: string;
    liveStatus: "Online" | "Offline";
    accountStatus: "Active" | "Suspend";
};

export default function RunnersList() {
    const searchParams = useSearchParams();
    const [data, setData] = useState<RunnerData[]>([]);


    const { data: runners, isLoading: isRunnersLoading } = useRunners(
        Number(searchParams.get("page")) || 1,
        Number(searchParams.get("limit")) || 10
    );

    // Transform API data to component format
    useEffect(() => {
        if (runners && !isRunnersLoading) {
            const transformedData: RunnerData[] = runners?.data?.map((runner: ApiRunnerResponse) => ({
                id: runner?.id,
                name: runner?.user?.name,
                initials: getInitials(runner?.user?.name),
                acceptRate: `${runner?.accept_percent}%`,
                completeRate: `${runner?.complete_percent}%`,
                earnings: formatCurrency(runner?.earnings),
                currentBalance: formatCurrency(runner?.current_balance),
                liveStatus: runner?.availability === "ONLINE" ? "Online" : "Offline",
                accountStatus: runner?.user?.status === "ACTIVE" ? "Active" : "Suspend",
            }));
            setData(transformedData);

        }
    }, [runners?.data]);



    const updateRunnerStatus = async (id: string, newStatus: string) => {
        if (newStatus === "suspend") {
            const response = await runnersService.suspendRunner(id);
            toast.success(response?.message || "Runner suspended successfully");
        } else if (newStatus === "active") {
            const response = await runnersService.activateRunner(id);
            toast.success(response?.message || "Runner activated successfully");
        } else {
            toast.error("Invalid status");
        }
    };

    // Helper function to get initials from name
    const getInitials = (name: string): string => {
        return name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase()
            .slice(0, 2);
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

    const columns: Column<RunnerData>[] = [
        {
            header: "Runner name",
            accessorKey: "name",
            render: (item) => (
                <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-xs font-bold">
                            {item.initials}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-[#1E293B]">{item.name}</span>
                </div>
            ),
        },
        { header: "Accept %", accessorKey: "acceptRate" },
        { header: "Complete %", accessorKey: "completeRate" },
        { header: "Earnings", accessorKey: "earnings" },
        { header: "Current Balance", accessorKey: "currentBalance" },
        {
            header: "Status",
            accessorKey: "liveStatus",
            render: (item) => (
                <span className={cn(
                    "px-4 py-1.5 rounded-lg border text-xs font-semibold inline-block min-w-[85px] text-center",
                    item.liveStatus === "Online"
                        ? "bg-[#F0FDF4] text-[#22C55E] border-[#BBF7D0]"
                        : "bg-[#FFF7ED] text-[#EA580C] border-[#FFC4B0]"
                )}>
                    {item.liveStatus}
                </span>
            ),
        },
        {
            header: "Account Status",
            accessorKey: "accountStatus",
            render: (item: any) => (
                <AccountStatusCell runner={item} onStatusChange={updateRunnerStatus} />
            ),
        },
        {
            header: "Action",
            accessorKey: "action",
            render: (item) => (
                <Link href={`/dashboard/runners/${item.id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center">
                    <Eye className="h-5 w-5 text-slate-400" />
                </Link>
            ),
        }
    ];

    return (
        <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Runners List</h2>

            <div className="min-h-[350px]">
                <GenericDataTable columns={columns} data={data} isLoading={isRunnersLoading} />
            </div>

            {!isRunnersLoading && (
                <div className="mt-6 border-t pt-2">
                    <ReusablePagination totalPages={5} totalEntries={20} />
                </div>
            )}
        </div>
    );
}