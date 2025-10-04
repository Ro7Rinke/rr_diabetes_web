"use client";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { fetchGlucoseRecords, getRecordContextLabel, GlucoseRecord } from "@/lib/glucose";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface GlucoseLineChartProps {
  goal: number;
  tolerance?: number;
}

export default function GlucoseLineChart({
  goal,
  tolerance = 10,
}: GlucoseLineChartProps) {
  const [glucoseRecords, setGlucoseRecords] = useState<GlucoseRecord[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

    const fetchData = async () => {
      setLoading(true)
      setErrorMessage("")
  
      try {
        const dataRecords = await fetchGlucoseRecords()
        setGlucoseRecords(dataRecords)
      } catch (error: any) {
        setErrorMessage(error.message)
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
  
    useEffect(() => {
      fetchData()
    }, [])

  if (!glucoseRecords || glucoseRecords.length === 0) {
    return <p className="text-gray-500">Sem dados para exibir.</p>;
  }

  // 🔹 Extrai valores e formata labels
  const values = glucoseRecords.map((r) => Number(r.value));
  const labels = glucoseRecords.map((r) => {
    const date = new Date(r.measuredAt);
    const day = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    const time = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return `${day} ${time}`;
  });

  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  const markers = values.map((val) => {
    if (val === maxValue) return { size: 8, fillColor: "#EF4444", strokeColor: "#fff" }; // 🔺 máximo
    if (val === minValue) return { size: 8, fillColor: "#F59E0B", strokeColor: "#fff" }; // 🔻 mínimo
    return { size: 0 };
  });

  const options: ApexOptions = {
    chart: { type: "line", height: 350, toolbar: { show: false }, zoom: { enabled: false } },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#3B82F6"],
    xaxis: {
      categories: labels.map((l) => l.split(" ")[1]), // só hora no eixo X
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      title: { text: "mg/dL" },
      labels: { style: { fontSize: "12px", colors: ["#6B7280"] } },
    },
    markers: {
      size: 4,
      discrete: markers.map((m, i) => ({
        seriesIndex: 0,
        dataPointIndex: i,
        size: m.size,
        fillColor: m.fillColor,
        strokeColor: m.strokeColor,
      })),
    },
    tooltip: {
      enabled: true,
      custom: ({ dataPointIndex }) => {
        const record = glucoseRecords[dataPointIndex];
        const date = new Date(record.measuredAt);
        const formatted = date.toLocaleString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });

        return `
          <div class="p-2 text-sm">
            <strong>${record.value} mg/dL</strong><br/>
            <small>${formatted}</small><br/>
            <small>Contexto: ${getRecordContextLabel(record.context)}</small><br/>
            ${record.obs ? `<small>Obs: ${record.obs}</small>` : ""}
          </div>
        `;
      },
    },
    annotations: {
      yaxis: [
        { y: goal, borderColor: "#10B981", label: { text: "Meta", style: { color: "#10B981" } } },
        { y: goal + tolerance, borderColor: "#F59E0B", strokeDashArray: 4 },
        { y: goal - tolerance, borderColor: "#F59E0B", strokeDashArray: 4 },
      ],
    },
    legend: { show: false },
    grid: { xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
  };

  const series = [{ name: "Glicose", data: values }];

  return (
    <div className="w-full">
      <ReactApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}