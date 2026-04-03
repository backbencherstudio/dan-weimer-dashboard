import Orders from '@/components/pages/orders'
import { Suspense } from 'react'

  export default function OrdersPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}> <Orders /> </Suspense>
    </div>
  )
}
