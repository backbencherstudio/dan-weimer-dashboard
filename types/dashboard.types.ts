export interface DashboardResponse {
    success: boolean;
    message: string;
    data: DashboardData;
  }
  
  export interface DashboardData {
    summary: DashboardSummary;
    shipment_performance: ShipmentPerformance;
    recent_activity: RecentActivityItem[];
    recent_shipment_activity: RecentShipmentActivityItem[];
  }
  
  export interface DashboardSummary {
    monthly_revenue: number;
    monthly_orders: number;
    total_supplier: number;
    total_contractors: number;
    total_runners: number;
  }
  
  export interface ShipmentPerformance {
    chart: ShipmentPerformanceChartItem[];
    summary: ShipmentPerformanceSummary;
    year: number;
  }
  
  export interface ShipmentPerformanceChartItem {
    month: string;
    delivered: number;
    in_transit: number;
    pending: number;
    delayed: number;
  }
  
  export interface ShipmentPerformanceSummary {
    delivered: number;
    in_transit: number;
    pending: number;
    delayed: number;
  }
  
  export interface RecentActivityItem {
    id?: string | number;
    title?: string;
    description?: string;
    time?: string;
    type?: string;
  }
  
  export interface RecentShipmentActivityItem {
    id?: string | number;
    order_no?: string;
    product_name?: string;
    eta_date_time?: string;
    weight?: number;
    runner_name?: string;
    price?: number;
    status?: string;
  }