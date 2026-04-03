import React from 'react'
import { Suspense } from 'react'
import RunnersList from './RunnersList'

export default function RunnersPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <RunnersList /> 
    </Suspense>
  )
}
