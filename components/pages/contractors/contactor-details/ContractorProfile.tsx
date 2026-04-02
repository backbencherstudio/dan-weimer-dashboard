"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/reusable/StatusBadge";
import { ShipmentStatus } from '@/components/reusable/StatusBadge';

export default function ContractorProfile() {
    // In a real app, these would be passed as props from the backend
    const contractor = {
        name: "Cala Foods",
        initials: "BS",
        mobile: "(208) 555-0112",
        email: "esther.h@demo.com",
        address: "4517 Washington Ave. Manchester, Kentucky 39495",
        status: "Active"
    };

    return (
        <section className='flex items-start gap-12 self-stretch border px-[38px] py-8 rounded-2xl border-solid border-[#EAECF0] bg-white'>
            {/* Sidebar Section */}
            <div className="flex flex-col items-center gap-4 min-w-[180px]">
                <Avatar className="h-[160px] w-[160px]">
                    <AvatarImage src="" /> {/* Replace with item.image if available */}
                    <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-5xl font-bold">
                        {contractor.initials}
                    </AvatarFallback>
                </Avatar>

                <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-[#1E293B]">{contractor.name}</h3>
                    <StatusBadge status={contractor.status as ShipmentStatus} />
                </div>
            </div>

            {/* Profile Details Grid */}
            <div className="flex-1 space-y-8">
                <h2 className="text-2xl font-bold text-[#1E293B]">Contractor Profile</h2>

                <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                    {/* Field 1: Name */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-[#1E293B]">Contractor Name:</Label>
                        <Input
                            readOnly
                            value={contractor.name}
                            className="read-only-input"
                        />
                    </div>

                    {/* Field 2: Mobile */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-[#1E293B]">Mobile Number:</Label>
                        <Input
                            readOnly
                            value={contractor.mobile}
                            className="read-only-input"
                        />
                    </div>               

                    {/* Field 3: Email */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-[#1E293B]">Email Address:</Label>
                        <Input
                            readOnly
                            value={contractor.email}
                            className="read-only-input"
                        />
                    </div>

                    {/* Field 4: Address */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-[#1E293B]">Address:</Label>
                        <Input
                            readOnly
                            value={contractor.address}
                            className="read-only-input"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}