import React from 'react';
import { ShipmentStatus, StatusBadge } from '@/components/reusable/StatusBadge';
import { Package, Clock, CheckCircle2, MapPin, User, Bike } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DeliveryDetailsProps {
  id: string;
}

export default function DeliveryDetails({ order }: { order: any }) {

  console.log("Orderrrrrrrrrrrrr:", order);





  // Calculate progress percentage for stepper
  const getStepperProgress = (status: string) => {
    switch(status) {
      case 'PICKED_UP': return 33;
      case 'EN_ROUTE': return 66;
      case 'DELIVERED': return 100;
      default: return 0;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Format price
  const formatPrice = (amount: string) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  // Get runner initials
  const getRunnerInitials = () => {
    // Since runner object doesn't have name directly, we can use vehicle model or a default
    return order.runner?.vehicle_model?.substring(0, 2).toUpperCase() || 'RN';
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'EN_ROUTE': return '#FF4D00';
      case 'PICKED_UP': return '#10B981';
      case 'DELIVERED': return '#6B7280';
      default: return '#FF4D00';
    }
  };

  const progress = getStepperProgress(order.status);

  return (
    <div className='flex w-[450px] flex-col gap-6 border border-[#FFECE6] bg-white shadow-[0_4px_12px_0_rgba(21,9,2,0.12)] p-6 rounded-2xl'>
      
      {/* 1. Header Section */}
      <div className='flex justify-between items-start w-full'>
        <div className='flex items-center gap-3'>
          <div className='p-3 bg-[#FFECE6] rounded-full'>
            <Package className="text-[#FF4D00]" size={24} />
          </div>
          <div>
            <h3 className='text-[#070707] text-lg font-bold leading-tight'>{order.package_name}</h3>
            <p className='text-[#6B7280] text-sm'>ID: {order.id.slice(-8).toUpperCase()}</p>
          </div>
        </div>
        <StatusBadge status={order?.status as ShipmentStatus} />
      </div>

      {/* 2. Summary Grid */}
      <div className='grid grid-cols-2 gap-y-3 text-sm'>
        <p>
          <span className='text-[#070707] font-medium'>Runner:</span>{' '}
          <span className='text-[#6B7280]'>{order.runner?.vehicle_model || 'Not assigned'}</span>
        </p>
        <p className='text-right'>
          <span className='text-[#070707] font-medium'>Price:</span>{' '}
          <span className='text-[#6B7280]'>{formatPrice(order.total_amount)}</span>
        </p>
        <p>
          <span className='text-[#070707] font-medium'>Date:</span>{' '}
          <span className='text-[#6B7280]'>{formatDate(order.pickup_date)}</span>
        </p>
        <p className='text-right'>
          <span className='text-[#070707] font-medium'>Distance:</span>{' '}
          <span className='text-[#6B7280]'>{order.estimated_distance_km} km</span>
        </p>
      </div>

      {/* 3. Horizontal Stepper */}
      <div className='relative flex items-center justify-between w-full px-2 pt-4 pb-8'>
        {/* The Track */}
        <div className='absolute top-7 left-0 h-[2px] w-full bg-[#E5E7EB]' />
        <div 
          className='absolute top-7 left-0 h-[2px] bg-[#FF4D00] transition-all duration-300'
          style={{ width: `${progress}%` }}
        />

        {/* Step 1: Picked Up */}
        <div className='relative flex flex-col items-center gap-2'>
          <div className={`z-10 p-1.5 rounded-full text-white ${
            order.status !== 'ACCEPTED' ? 'bg-[#FF4D00]' : 'bg-[#E5E7EB]'
          }`}>
            <Package size={14} />
          </div>
          <span className={`absolute top-8 text-xs font-medium whitespace-nowrap ${
            order.status !== 'ACCEPTED' ? 'text-[#FF4D00]' : 'text-[#D1D5DB]'
          }`}>
            Picked Up
          </span>
        </div>

        {/* Step 2: En Route */}
        <div className='relative flex flex-col items-center gap-2'>
          <div className={`z-10 w-3 h-3 rounded-full border-2 border-white ${
            order.status === 'EN_ROUTE' || order.status === 'DELIVERED' 
              ? 'bg-[#FF4D00]' 
              : 'bg-[#E5E7EB]'
          }`} />
          <span className={`absolute top-8 text-xs font-medium whitespace-nowrap ${
            order.status === 'EN_ROUTE' || order.status === 'DELIVERED'
              ? 'text-[#FF4D00]'
              : 'text-[#D1D5DB]'
          }`}>
            En Route
          </span>
        </div>

        {/* Step 3: Delivered */}
        <div className='relative flex flex-col items-center gap-2'>
          <div className={`z-10 w-3 h-3 rounded-full ${
            order.status === 'DELIVERED' ? 'bg-[#FF4D00]' : 'bg-[#E5E7EB]'
          }`} />
          <span className={`absolute top-8 text-xs font-medium whitespace-nowrap ${
            order.status === 'DELIVERED' ? 'text-[#FF4D00]' : 'text-[#D1D5DB]'
          }`}>
            Delivered
          </span>
        </div>
      </div>

      {/* 4. Orange Detailed Status Card */}
      <div className='bg-[#FFECE6]/50 border border-[#FFECE6] rounded-2xl p-4 flex flex-col gap-4'>
        
        {/* Estimated Time Header */}
        <div className='flex items-start gap-2 text-[#FF4D00]'>
          <Clock size={18} className="mt-0.5" />
          <p className='text-sm font-semibold leading-snug'>
            The package is estimated to arrive within the next {order.estimated_time_min} minutes.
          </p>
        </div>

        {/* Address Card */}
        <div className='bg-white rounded-xl p-4 grid grid-cols-2 gap-4 text-xs shadow-sm'>
          <div className='space-y-1'>
            <p className='text-[#9CA3AF]'>Supplier:</p>
            <p className='text-sm font-bold'>{order.supplier?.name || 'N/A'}</p>
            <p className='text-[#9CA3AF] pt-2'>From:</p>
            <p className='font-medium leading-relaxed'>
              {order.supplier?.street}, {order.supplier?.city} {order.supplier?.zip_code}
            </p>
          </div>
          <div className='space-y-1'>
            <p className='text-[#9CA3AF]'>Receiver:</p>
            <p className='text-sm font-bold'>{order.technician_name}</p>
            <p className='text-[#9CA3AF] pt-2'>To:</p>
            <p className='font-medium leading-relaxed'>{order.delivery_address}</p>
          </div>
        </div>

        {/* Runner Tracking Card */}
        <div className='bg-white rounded-xl p-4 flex flex-col gap-3 shadow-sm'>
          <div className='flex items-center gap-3 border-b border-[#F3F4F6] pb-3'>
            <Avatar className="h-10 w-10">
              <AvatarImage src={`https://ui-avatars.com/api/?name=${getRunnerInitials()}&background=FF4D00&color=fff`} />
              <AvatarFallback>{getRunnerInitials()}</AvatarFallback>
            </Avatar>
            <div>
              <p className='text-sm font-bold'>
                {order.runner?.vehicle_type === 'bike' ? 'Bike Runner' : 'Car Runner'}
              </p>
              <p className='text-[10px] text-[#9CA3AF] uppercase tracking-wider'>
                {order.runner?.vehicle_model || 'Vehicle'}
              </p>
            </div>
          </div>

          <div className='flex gap-3'>
            <div className='flex flex-col items-center'>
              <CheckCircle2 size={18} className="text-[#FF4D00]" />
              <div className='w-[1.5px] h-10 border-l-2 border-dashed border-[#FF4D00] my-1' />
              <MapPin size={18} className="text-[#9CA3AF]" />
            </div>
            <div className='flex flex-col justify-between py-0.5'>
              <div>
                <p className='text-[10px] text-[#6B7280] font-medium'>Current Status</p>
                <p className='text-sm font-bold'>
                  {order.status === 'EN_ROUTE' 
                    ? 'Runner is delivering the package.' 
                    : order.status === 'PICKED_UP'
                    ? 'Package has been picked up.'
                    : 'Awaiting pickup'}
                </p>
                <p className='text-xs text-[#9CA3AF]'>
                  {order.estimated_time_min} minutes estimation
                </p>
              </div>
              <p className='text-xs text-[#9CA3AF] font-medium'>
                {order.status === 'DELIVERED' ? 'Delivered' : 'Expected delivery'}
              </p>
            </div>
          </div>
        </div>

        {/* Special Instructions (if any) */}
        {order.special_instructions && (
          <div className='bg-white rounded-xl p-3 text-xs'>
            <p className='text-[#9CA3AF] mb-1'>Special Instructions:</p>
            <p className='text-[#070707]'>{order.special_instructions}</p>
          </div>
        )}
      </div>
    </div>
  );
}