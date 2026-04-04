import LiveOperations from '@/components/pages/live-operations'
import { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LiveOperations />
    </Suspense>
  )
}
