import { Suspense } from 'react'
import RunnersPage from '@/components/pages/runners'

export default function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}> <RunnersPage /> </Suspense>

    </div>
  )
}
