"use client";
import { useParams } from 'next/navigation';
import React from 'react'
import ContactorDetailsStats from './ContactorDetailsStats'
import ContractorProfile from './ContractorProfile'
import ContractorOrderList from './ContractorOrderList'

export default function ContractorDetails() {

    const params = useParams();

    return (
        <div className='space-y-6'>
            <h2 className='text-2xl font-bold text-[#070707] leading-[124%] tracking-[0.12px]'>Contractor Details</h2>
            <div>
                <ContactorDetailsStats />
            </div>

            <div className='p-8 rounded-lg space-y-8 bg-white'>


                <div>
                    <ContractorProfile />
                </div>

                <div>
                    <ContractorOrderList />
                </div>
            </div>
        </div>
    )
}

