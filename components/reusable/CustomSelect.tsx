"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Option {
  label: string
  value: string
}

interface CustomSelectProps {
  options: Option[]
  placeholder?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function CustomSelect({
  options,
  placeholder = "Select Status",
  defaultValue,
  onValueChange,
  className,
}: CustomSelectProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger 
        className={cn(
          "w-[140px] h-[48px] rounded-[14px] border-[#D1D5DB] bg-white px-4 text-base font-medium text-[#64748b] focus:ring-1 focus:ring-orange-500 hover:bg-slate-50 transition-colors",
          className
        )}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="rounded-xl border-[#D1D5DB]">
        {options.map((option) => (
          <SelectItem 
            key={option.value} 
            value={option.value}
            className="rounded-lg focus:bg-orange-50 focus:text-orange-600"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}