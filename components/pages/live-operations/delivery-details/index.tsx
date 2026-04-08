"use client";
import React from 'react'
import DeliveryDetails from './DeliveryDetails'
import LiveOperationSocket from '../LiveOperationSocket'
import { useParams } from 'next/navigation'
import { useOrderById } from '@/hooks/useOrders'

export default function DeliveryDetailsPage() {
    const { id } = useParams();



    const { data: orderData, isLoading: isOrderLoading } = useOrderById(id as string);
    console.log("Order:", orderData, isOrderLoading);


    const runnerId = orderData?.data?.runner_id;


    if (isOrderLoading) {
        return <div>Loading...</div>
    }
    return (
        <section className='w-full border [background:var(--W,#FFF)] p-6 rounded-2xl border-solid border-[#EDEDED] space-y-6'>
            <h3 className='text-gray-900 [font-family:Industry] text-xl font-bold leading-[132%] tracking-[0.1px]'>Live Delivery Detail</h3>

            <div className='flex gap-6'>



                {
                    orderData?.data && (
                        <DeliveryDetails order={orderData?.data} />
                    )
                }

                {
                    runnerId ? (
                        <LiveOperationSocket runnerId={runnerId as string} />
                    )
                        : (
                            <div>No runner found</div>
                        )
                }
            </div>


        </section>
    )
}
