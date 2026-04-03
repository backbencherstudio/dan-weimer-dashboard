"use client";
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react'
import RunnerDetailsStats from './RunnerDetailsStats';
import RunnerProfile from './RunnerProfile';
import RunnerJobList from './RunnerJobList';


function RunnerDetailPage() {
    const params = useParams();
    const runnerId = params.id as string;

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-[#070707] leading-[124%] tracking-[0.12px]'>Runner Details</h2>
                <div>
                    <RunnerDetailsStats />
                </div>

                <div className='p-8 rounded-lg space-y-8 bg-white'>


                    <div>
                            <RunnerProfile />
                    </div>

                    <div>
                        <RunnerJobList />
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default function ContractorDetails() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <RunnerDetailPage />
        </Suspense>
    )
}