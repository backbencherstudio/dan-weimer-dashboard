import React from 'react'
import FinanceStats from './FinanceStats'
import RunnerPayoutTable from './RunnerPayoutTable'

export default function FinancePage() {
  return (
    <div className='space-y-6'>
        <FinanceStats />
        <RunnerPayoutTable />
    </div>
  )
}
