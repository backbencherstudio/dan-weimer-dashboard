import React, { Suspense } from 'react'
import DeliveryDetails from '@/components/pages/live-operations/delivery-details'

export default function page() {
  return (
    <div>
            <Suspense fallback={<div>Loading...</div>}>
            <DeliveryDetails />
        </Suspense>
    </div>
  )
}
