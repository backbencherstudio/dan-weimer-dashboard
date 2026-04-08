"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  ChartConfig, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from "@/components/ui/chart"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChevronDown } from "lucide-react"

// Mock data based on the image trends


const chartConfig = {
  delivered: { label: "Delivered", color: "#ef4444" },
  in_transit: { label: "In Transit", color: "#0ea5e9" },
  pending: { label: "Pending", color: "#f59e0b" },
  delayed: { label: "Delayed", color: "#10b981" },
} satisfies ChartConfig
// border border-{#]
export default function ShipmentPerformance({ data }: { data: any }) {

  const chartData = data?.chart || [];
  return (
    <Card className="w-full ring-[#EDEDED]!  shadow-sm  rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div className="space-y-1">
          <CardTitle className="self-stretch text-[color:var(--B,#070707)] font-industry text-xl font-bold leading-[132%] tracking-[0.1px]">Shipment Performance</CardTitle>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#ef4444]" /> Delivered
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#0ea5e9]" /> In Transit
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#f59e0b]" /> Pending
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-[#10b981]" /> Delayed
            </div>
          </div>
        </div>
        <button className="flex items-center gap-2 rounded-lg bg-[#ff4d00] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 font-industry">
          This month <ChevronDown className="h-4 w-4" />
        </button>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid 
              vertical={true} 
              horizontal={false} 
              strokeDasharray="3 3" 
              className="stroke-muted/50" 
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              className="text-xs font-medium text-muted-foreground"
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tickMargin={10}
              className="text-xs font-medium text-muted-foreground"
            />
            <ChartTooltip
              cursor={{ stroke: "#ff4d00", strokeWidth: 2, strokeDasharray: "4 4" }}
              content={<ChartTooltipContent className="w-[150px] bg-white shadow-xl" />}
            />
            <Line
              type="monotone"
              dataKey="delivered"
              stroke="var(--color-delivered)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "#ff4d00", stroke: "#fff", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="in_transit"
              stroke="var(--color-in_transit)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="pending"
              stroke="var(--color-pending)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="delayed"
              stroke="var(--color-delayed)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}