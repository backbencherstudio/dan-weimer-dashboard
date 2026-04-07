"use client";
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react'
import RunnerDetailsStats from './RunnerDetailsStats';
import RunnerProfile from './RunnerProfile';
import RunnerJobList from './RunnerJobList';
import { useRunnerById } from '@/hooks/useRunners';


function RunnerDetailPage() {
    const params = useParams();
    const runnerId = params.id as string;


    const { data: runner, isLoading: isRunnerLoading } = useRunnerById(runnerId);
    console.log(runner?.data);

    // {
    //     "total_job": 1,
    //     "total_earning": 0,
    //     "in_transit_job": 1,
    //     "complete_job": 0,
    //     "accept_percent": 100,
    //     "complete_percent": 0,
    //     "current_balance": 0,
    //     "availability": "ONLINE",
    //     "runner_profile": {
    //         "id": "cmn6x84k90004vl98d2mb2qew",
    //         "user_id": "cmn6x33ym0000vl98y8dc42s2",
    //         "stripe_account_id": null,
    //         "vehicle_type": "bike",
    //         "vehicle_model": "Honda CB Shine",
    //         "vehicle_identification_number": "1HGCM82633A123456",
    //         "availability": "ONLINE",
    //         "total_deliveries": 0,
    //         "wallet_balance": "0",
    //         "total_earned": "0",
    //         "created_at": "2026-03-26T03:36:47.385Z",
    //         "updated_at": "2026-03-26T08:54:05.964Z",
    //         "user": {
    //             "id": "cmn6x33ym0000vl98y8dc42s2",
    //             "name": "David Doe",
    //             "email": "david@example.com",
    //             "phone_number": "5551234367",
    //             "status": "ACTIVE"
    //         }
    //     },
    //     "job_list": [
    //         {
    //             "id": "cmn6y2ate0005vloozl4ix8aw",
    //             "package_name": "Brake Pad Box",
    //             "supplier": {
    //                 "id": "cmn6xqzsc0000vl8sw3pziiyz",
    //                 "name": "ABC Auto Parts Supplier",
    //                 "location": "East West University",
    //                 "street": "A, 2 Jahurul Islam Ave",
    //                 "city": "Dhaka",
    //                 "zip_code": "1212",
    //                 "orders_fulfilled": 0
    //             },
    //             "delivery_address": "Farazy Hospital Limited - Banasree",
    //             "pickup_date": "2026-03-05T10:00:00.000Z",
    //             "status": "ACCEPTED",
    //             "payment_status": "PAID",
    //             "total_amount": "26.52",
    //             "is_available": false,
    //             "created_at": "2026-03-26T04:00:15.170Z"
    //         }
    //     ]
    // }

    // ================= runner stats data =================
    const runnderStats = {
        total_job: runner?.data?.total_job,
        total_earning: runner?.data?.total_earning,
        in_transit_job: runner?.data?.in_transit_job,
        complete_job: runner?.data?.complete_job,
    }


    // ================= runner profile data =================

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-[#070707] leading-[124%] tracking-[0.12px]'>Runner Details</h2>
                <div>
                    <RunnerDetailsStats runnerStats={runnderStats} />
                </div>

                <div className='p-8 rounded-lg space-y-8 bg-white'>


                    <div>
                        <RunnerProfile runnerProfile={runner?.data?.runner_profile} />
                    </div>

                    <div>
                        <RunnerJobList jobList={runner?.data?.job_list} />
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