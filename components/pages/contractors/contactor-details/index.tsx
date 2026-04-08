"use client";
import { useParams } from 'next/navigation';
import React, { Suspense } from 'react'
import ContactorDetailsStats from './ContactorDetailsStats'
import ContractorProfile from './ContractorProfile'
import ContractorOrderList from './ContractorOrderList'
import { useContractorById } from '@/hooks/useContractors';

function ContractorDetailPage() {
    const params = useParams();
    const contractorId = params.id as string;

    const { data: contractorData, isLoading: isContractorLoading } = useContractorById(contractorId);

    const constractorStats = 
    {
        total_orders: contractorData?.data?.total_orders,
        lifetime_spend: contractorData?.data?.lifetime_spend,
        in_transit_orders: contractorData?.data?.in_transit_orders,
        completed_orders: contractorData?.data?.completed_orders,

    }
    console.log("constractorStats", constractorStats);
    // console.log(contractorData);
    // {
    //     "total_orders": 11,
    //     "lifetime_spend": 159.12,
    //     "in_transit_orders": 1,
    //     "completed_orders": 0,
    //     "contractor_profile": {
    //         "id": "cmn6x6mdi0002vl98pgp0h2o2",
    //         "user_id": "cmn6x0t3l0000vlywfq229vlw",
    //         "company_name": "ABC Supply Co.",
    //         "business_address": "123 Business Ave, Dallas, TX",
    //         "created_at": "2026-03-26T03:35:37.158Z",
    //         "updated_at": "2026-03-26T03:35:37.158Z",
    //         "user": {
    //             "id": "cmn6x0t3l0000vlywfq229vlw",
    //             "name": "John Doe",
    //             "email": "john@example.com",
    //             "phone_number": "5551234567",
    //             "status": "ACTIVE"
    //         }
    //     },
    //     "order_list": [
    //         {
    //             "id": "cmnd17yc50001vl685qtwr5x4",
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
    //             "status": "RUNNER_NOT_FOUND",
    //             "payment_status": "PAID",
    //             "total_amount": "26.52",
    //             "is_available": false,
    //             "created_at": "2026-03-30T10:15:14.838Z"
    //         },
           
    //     ]
    // }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-[#070707] leading-[124%] tracking-[0.12px]'>Contractor Details</h2>
                <div>
                    <ContactorDetailsStats stats={constractorStats} />
                </div>

                <div className='p-8 rounded-lg space-y-8 bg-white'>


                    <div>
                        <ContractorProfile contractorData={contractorData?.data?.contractor_profile} />
                    </div>

                    <div>
                        <ContractorOrderList
                            orderList={contractorData?.data?.order_list}
                            isLoading={isContractorLoading}
                        />
                    </div>
                </div>
            </div>
        </Suspense>
    )
}

export default function ContractorDetails() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContractorDetailPage />
        </Suspense>
    )
}