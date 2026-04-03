"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Column, GenericDataTable } from "@/components/reusable/DataTable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomSelect } from "@/components/reusable/CustomSelect";
import { ReusablePagination } from "@/components/reusable/ReusablePagination";
import { cn } from "@/lib/utils";
import { Eye, } from "lucide-react";
import Link from "next/link";


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
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRunners = async () => {
            setIsLoading(true);
            await new Promise((res) => setTimeout(res, 600));

            // Mocking data from image_43058e.png
            const mockRunners: RunnerData[] = [
                { id: "1", name: "Jenny Wilson", initials: "AB", acceptRate: "94%", completeRate: "98%", earnings: "$1,500.10", currentBalance: "$1,500", liveStatus: "Online", accountStatus: "Active" },
                { id: "2", name: "John Dukes", avatar: "https://github.com/shadcn.png", initials: "JD", acceptRate: "88%", completeRate: "92%", earnings: "$2,147.20", currentBalance: "$2,147.20", liveStatus: "Online", accountStatus: "Active" },
                { id: "3", name: "Brooklyn Simmons", initials: "BS", acceptRate: "82%", completeRate: "88%", earnings: "$5,080.59", currentBalance: "$5,080.59", liveStatus: "Offline", accountStatus: "Active" },
                { id: "4", name: "Dennis Callis", initials: "BS", acceptRate: "91%", completeRate: "97%", earnings: "$888.60", currentBalance: "$888.60", liveStatus: "Online", accountStatus: "Suspend" },
            ];

            setData(mockRunners);
            setIsLoading(false);
        };
        fetchRunners();
    }, [searchParams]);

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
            render: (item) => (
                <CustomSelect
                    defaultValue={item.accountStatus.toLowerCase()}
                    options={[
                        { label: "Active", value: "active" },
                        { label: "Suspend", value: "suspend" },
                    ]}
                    className={cn(
                        "w-[110px] max-h-[32px] text-sm",
                        item.accountStatus === "Active"
                            ? "text-[#22C55E] border-[#BBF7D0] bg-[#F0FDF4]"
                            : "text-[#EA580C] border-[#FFC4B0] bg-[#FFF7ED]"
                    )}
                />
            ),
        },
        {
            header: "Action",
            accessorKey: "action",
            render: (item) => (
                <Link href={`/runners/${item.id}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer inline-flex items-center justify-center">
                    <Eye className="h-5 w-5 text-slate-400" />
                </Link>
            ),
        }
    ];

    return (
        <div className="w-full bg-white rounded-2xl border border-[#EDEDED] p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Runners List</h2>

            <div className="min-h-[350px]">
                <GenericDataTable columns={columns} data={data} isLoading={isLoading} />
            </div>

            {!isLoading && (
                <div className="mt-6 border-t pt-2">
                    <ReusablePagination totalPages={5} totalEntries={20} />
                </div>
            )}
        </div>
    );
}