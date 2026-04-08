"use client";

import React from 'react'
import OrderStatsSection from './OrderStats'
import OrderListTable from './OrderListTable'
import { useOrders } from '@/hooks/useOrders'

export default function index() {
  
  return (
    <div className='space-y-6'>
      <OrderStatsSection />
      <OrderListTable />
    </div>
  )
}
 