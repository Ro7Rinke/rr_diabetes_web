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
    <div >

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GlucoseAverageCard />
      </div>

      <div className="p-6">
        <h2 className="mb-4 font-semibold text-title-md dark:text-white/90">
          Últimas medições de glicose
        </h2>
        <GlucoseLineChart />
      </div>

      <GlucoseListTable />

      <FloatingButton href="/glucose/new" />


      {/* <div className="col-span-12 space-y-6 xl:col-span-7">
      <EcommerceMetrics />

      <MonthlySalesChart />
    </div>

    <div className="col-span-12 xl:col-span-5">
      <MonthlyTarget />
    </div>

    <div className="col-span-12">
      <StatisticsChart />
    </div>

    <div className="col-span-12 xl:col-span-5">
      <DemographicCard />
    </div>

    <div className="col-span-12 xl:col-span-7">
      <RecentOrders />
    </div> */}
    </div>
  );
}
