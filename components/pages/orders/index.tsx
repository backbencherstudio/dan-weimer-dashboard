import React from 'react'
import OrderStatsSection from './OrderStats'
import OrderListTable from './OrderListTable'

export default function index() {
  return (
    <div className='space-y-6'>
      <OrderStatsSection />
      <OrderListTable />
    </div>
  )
}
 