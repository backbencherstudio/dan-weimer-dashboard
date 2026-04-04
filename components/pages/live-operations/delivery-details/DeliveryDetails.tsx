import React from 'react';
import { StatusBadge } from '@/components/reusable/StatusBadge';
import { Package, Clock, CheckCircle2, MapPin, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DeliveryDetails() {
  return (
    <div className='flex w-[450px] flex-col gap-6 border border-[#FFECE6] bg-white shadow-[0_4px_12px_0_rgba(21,9,2,0.12)] p-6 rounded-2xl'>
      
      {/* 1. Header Section */}
      <div className='flex justify-between items-start w-full'>
        <div className='flex items-center gap-3'>
          <div className='p-3 bg-[#FFECE6] rounded-full'>
            <Package className="text-[#FF4D00]" size={24} />
          </div>
          <div>
            <h3 className='text-[#070707] text-lg font-bold leading-tight'>Apple Watch Series 8</h3>
            <p className='text-[#6B7280] text-sm'>ID: VTY7162E</p>
          </div>
        </div>
        <StatusBadge status='En Route' />
      </div>

      {/* 2. Summary Grid */}
      <div className='grid grid-cols-2 gap-y-3 text-sm'>
        <p><span className='text-[#070707] font-medium'>Runner:</span> <span className='text-[#6B7280]'>Michael S.</span></p>
        <p className='text-right'><span className='text-[#070707] font-medium'>Price:</span> <span className='text-[#6B7280]'>$125.00</span></p>
        <p><span className='text-[#070707] font-medium'>Date:</span> <span className='text-[#6B7280]'>10/08/2026</span></p>
        <p className='text-right'><span className='text-[#070707] font-medium'>Distance:</span> <span className='text-[#6B7280]'>125 Miles</span></p>
      </div>

      {/* 3. Horizontal Stepper */}
      <div className='relative flex items-center justify-between w-full px-2 pt-4 pb-8'>
        {/* The Track */}
        <div className='absolute top-7 left-0 h-[2px] w-full bg-[#E5E7EB]' />
        <div className='absolute top-7 left-0 h-[2px] w-1/2 bg-[#FF4D00]' />

        {/* Steps */}
        <div className='relative flex flex-col items-center gap-2'>
          <div className='z-10 p-1.5 bg-[#FF4D00] rounded-full text-white'>
            <Package size={14} />
          </div>
          <span className='absolute top-8 text-xs font-medium text-[#FF4D00] whitespace-nowrap'>Picked Up</span>
        </div>

        <div className='relative flex flex-col items-center gap-2'>
          <div className='z-10 w-3 h-3 bg-[#FF4D00] rounded-full border-2 border-white' />
          <span className='absolute top-8 text-xs font-medium text-[#FFECE6] whitespace-nowrap'>En Route</span>
        </div>

        <div className='relative flex flex-col items-center gap-2'>
          <div className='z-10 w-3 h-3 bg-[#E5E7EB] rounded-full' />
          <span className='absolute top-8 text-xs font-medium text-[#D1D5DB] whitespace-nowrap'>Delivered</span>
        </div>
      </div>

      {/* 4. Orange Detailed Status Card */}
      <div className='bg-[#FFECE6]/50 border border-[#FFECE6] rounded-2xl p-4 flex flex-col gap-4'>
        
        {/* Estimated Time Header */}
        <div className='flex items-start gap-2 text-[#FF4D00]'>
          <Clock size={18} className="mt-0.5" />
          <p className='text-sm font-semibold leading-snug'>
            The package is estimated to arrive within the next 25 minutes.
          </p>
        </div>

        {/* Address Card */}
        <div className='bg-white rounded-xl p-4 grid grid-cols-2 gap-4 text-xs shadow-sm'>
          <div className='space-y-1'>
            <p className='text-[#9CA3AF]'>Sender:</p>
            <p className='text-sm font-bold'>Alexander</p>
            <p className='text-[#9CA3AF] pt-2'>From:</p>
            <p className='font-medium leading-relaxed'>Jl. Merdeka Raya No. 123, Jakarta Pusat</p>
          </div>
          <div className='space-y-1'>
            <p className='text-[#9CA3AF]'>Receiver:</p>
            <p className='text-sm font-bold'>Jason</p>
            <p className='text-[#9CA3AF] pt-2'>To:</p>
            <p className='font-medium leading-relaxed'>102 Ocean View, Melbourne, VIC 3000</p>
          </div>
        </div>

        {/* Runner Tracking Card */}
        <div className='bg-white rounded-xl p-4 flex flex-col gap-3 shadow-sm'>
          <div className='flex items-center gap-3 border-b border-[#F3F4F6] pb-3'>
             <Avatar className="h-10 w-10">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>MS</AvatarFallback>
             </Avatar>
             <div>
               <p className='text-sm font-bold'>Michael S.</p>
               <p className='text-[10px] text-[#9CA3AF] uppercase tracking-wider'>Runner</p>
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
                 <p className='text-[10px] text-[#6B7280] font-medium'>On Delivery</p>
                 <p className='text-sm font-bold'>Runner is delivering the package.</p>
                 <p className='text-xs text-[#9CA3AF]'>25 minutes estimation</p>
               </div>
               <p className='text-xs text-[#9CA3AF] font-medium'>Delivered</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}