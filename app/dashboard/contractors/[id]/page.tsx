import React, { Suspense } from 'react'
import ContractorDetails from '@/components/pages/contractors/contactor-details'

export default function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContractorDetails />
        </Suspense>
    )
}
