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
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {

  const glucoseValues = [120, 145, 100, 110, 130, 150, 125, 135, 140, 115];
  const glucoseLabels = [
    "2025-09-23 08:00",
    "2025-09-23 12:00",
    "2025-09-23 18:00",
    "2025-09-24 07:30",
    "2025-09-24 13:00",
    "2025-09-24 19:15",
    "2025-09-25 08:45",
    "2025-09-25 14:30",
    "2025-09-25 20:00",
    "2025-09-26 08:15",
  ];

const measurements = [
  { id: "1", value: 110, date: "2025-09-29T08:00", timing: "Jejum", obs: "lllllllllllllllllllllllllllllllllllllllllllllllllNada antes" },
  { id: "2", value: 150, date: "2025-09-29T10:00", timing: "Depois", obs: "Após café" },
];

  const goal = 110;
  const tolerance = 10;

  return (
    <div >

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <GlucoseAverageCard />
      </div>

      <div className="p-6">
        <h2 className="mb-4 font-semibold text-title-md dark:text-white/90">
          Últimas medições de glicose
        </h2>
        <GlucoseLineChart
          values={glucoseValues}
          labels={glucoseLabels}
          goal={goal}
          tolerance={tolerance}
        />
      </div>

      <GlucoseListTable measurements={measurements} goal={goal} tolerance={tolerance} />

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
