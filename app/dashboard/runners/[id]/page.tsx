import React from 'react'
import { Suspense } from 'react'
import RunnerDetailPage from '@/components/pages/runners/runners-details'

export default function page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <RunnerDetailPage />
    </Suspense>
  )
}
