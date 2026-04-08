"use client";

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { StatusBadge } from "@/components/reusable/StatusBadge";
import { ShipmentStatus } from '@/components/reusable/StatusBadge';

export default function RunnerProfile({ runnerProfile }: { runnerProfile: any }) {
 


    console.log(runnerProfile);
    return (
        <section className='flex items-start gap-12 self-stretch border px-[38px] py-8 rounded-2xl border-solid border-[#EAECF0] bg-white'>
            {/* Sidebar Section */}
            <div className="flex flex-col items-center gap-4 min-w-[180px]">
            <Avatar className="h-[160px] w-[160px]">
    <AvatarImage src="" /> {/* Replace with item.image if available */}
    <AvatarFallback className="bg-[#FFECE6] text-[#FF4D00] text-5xl font-bold">
        {(() => {
            const name = runnerProfile?.user?.name || "";
            const nameParts = name.trim().split(" ");
            
            if (nameParts.length === 1) {
                // Single name: take first two characters or just first character
                return nameParts[0].slice(0, 2).toUpperCase();
            } else {
                // Multiple names: take first character of first and last name
                return (nameParts[0]?.charAt(0) + nameParts[nameParts.length - 1]?.charAt(0)).toUpperCase();
            }
        })()}
    </AvatarFallback>
</Avatar>

                <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-[#1E293B]">{runnerProfile?.user?.name}</h3>
                    <StatusBadge status={runnerProfile?.availability as ShipmentStatus} />
                </div>
            </div>

            {/* Profile Details Grid */}
            <div className="flex-1 space-y-8">
                <h2 className="text-2xl font-bold text-[#1E293B]">Runner Profile</h2>

                <div className="grid grid-cols-2 gap-x-6 gap-y-6">
                    {/* Field 1: Name */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-[#1E293B]">Contractor Name:</Label>
                        <Input
                            readOnly
                            value={runnerProfile?.user?.name}
                            className="read-only-input"
                        />
                    </div>

                    {/* Field 2: Mobile */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-[#1E293B]">Mobile Number:</Label>
                        <Input
                            readOnly
                            value={runnerProfile?.user?.phone_number}
                            className="read-only-input"
                        />
                    </div>

                    {/* Field 3: Email */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-[#1E293B]">Email Address:</Label>
                        <Input
                            readOnly
                            value={runnerProfile?.user?.email}
                            className="read-only-input"
                        />
                    </div>

                    {/* Field 4: Address */}
                    <div className="space-y-2">
                        <Label className="text-sm font-semibold text-[#1E293B]">Address:</Label>
                        <Input
                            readOnly
                            value={runnerProfile?.user?.address}
                            className="read-only-input"
                        />
                    </div>
                </div>

                <div>
                    <Label className="text-sm font-semibold text-[#1E293B] mb-4 block">Vehicle Information:</Label>


                    <div className="grid grid-cols-3 gap-x-6 gap-y-6">
                        <div className="space-y-2">
                            <Label className="font-semibold text-[#1E293B]">Vehicle Type:</Label>
                            <Input readOnly value={runnerProfile?.vehicle_type} className="read-only-input" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-[#1E293B]">Vehicle Model:</Label>
                            <Input readOnly value={runnerProfile?.vehicle_model} className="read-only-input" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-sm font-semibold text-[#1E293B]">Vehicle Identification Number:</Label>
                            <Input readOnly value={runnerProfile?.vehicle_identification_number} className="read-only-input" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}