import React from 'react'
import LiveDeliveryOperations from './LiveDeliveryOperations'
import LiveOperationSocket from './LiveOperationSocket'

export default function LiveOperations() {
  return (
    <div className='space-y-6'>
        <LiveDeliveryOperations />
        {/* <LiveOperationSocket /> */}
    </div>
  )
}
