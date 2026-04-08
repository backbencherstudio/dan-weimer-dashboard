"use client";

import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
  } from "@/components/ui/table";
  import { Skeleton } from "@/components/ui/skeleton";
  
  interface TableSkeletonProps {
    columnCount: number;
    rowCount?: number;
  }
  
  export function TableSkeleton({ columnCount, rowCount = 5 }: TableSkeletonProps) {
    return (
      <div className="rounded-xl border border-[#EDEDED] bg-white overflow-hidden w-full">
        <Table>
          <TableHeader className="bg-[#F1F5F9]">
            <TableRow className="hover:bg-transparent border-none">
              {Array.from({ length: columnCount }).map((_, i) => (
                <TableHead key={i} className="py-5 first:pl-6 last:pr-6">
                  <Skeleton className="h-4 w-24 bg-slate-200" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: rowCount }).map((_, rowIndex) => (
              <TableRow key={rowIndex} className="border-b last:border-0 border-slate-100">
                {Array.from({ length: columnCount }).map((_, colIndex) => (
                  <TableCell key={colIndex} className="py-5 first:pl-6 last:pr-6">
                    {/* We randomize the width slightly for a more natural look */}
                    <Skeleton 
                      // className="h-4 bg-slate-100" 
                      // style={{ width: `${Math.floor(Math.random() * (90 - 40 + 1) + 40)}%` }} 
                      className="h-4 bg-slate-100" style={{ width: "77%" }}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }