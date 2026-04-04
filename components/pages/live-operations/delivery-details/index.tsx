import React from 'react'
import DeliveryDetails from './DeliveryDetails'

export default function DeliveryDetailsPage() {
    return (
        <section className='w-full border [background:var(--W,#FFF)] p-6 rounded-2xl border-solid border-[#EDEDED] space-y-6'>
            <h3 className='text-gray-900 [font-family:Industry] text-xl font-bold leading-[132%] tracking-[0.1px]'>Live Delivery Detail</h3>

            <div className='flex gap-6'>

                <DeliveryDetails />

                <p>Map location</p>
            </div>


        </section>
    )
}
