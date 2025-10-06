import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import GlucoseAverageCard from "@/components/glucose/GlucoseAverageCardProps";
import GlucoseLineChart from "@/components/glucose/GlucoseLineChartProps";
import FloatingButton from "@/components/ui/button/FloatingButton";
import GlucoseListTable from "@/components/tables/GlucoseListTable";

export const metadata: Metadata = {
  title:
    "RR_DIABETES",
  description: "Sistema para cadastro de leituras de glicemia",
};

export default function Ecommerce() {
  return (
    <div className="pb-24" >

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GlucoseAverageCard />
      </div>

      <div className="pb-6 pt-6">
        <GlucoseLineChart />
      </div>
      <GlucoseListTable />
      <FloatingButton href="/glucose/new" />
    </div>
  );
}
