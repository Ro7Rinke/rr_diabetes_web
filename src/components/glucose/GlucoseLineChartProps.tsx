"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { fetchGlucoseRecords, getRecordContextLabel, GlucoseRecord } from "@/lib/glucose";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface GlucoseLineChartProps {
  goal: number;
  tolerance?: number;
}

export default function GlucoseLineChart({ goal, tolerance = 10 }: GlucoseLineChartProps) {
  const [glucoseRecords, setGlucoseRecords] = useState<GlucoseRecord[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 1. Carrega os dados da API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const dataRecords = await fetchGlucoseRecords();
        setGlucoseRecords(dataRecords);
      } catch (error: any) {
        setErrorMessage(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 2. Define série e opções do gráfico apenas quando há dados
  const series =
    glucoseRecords.length > 0
      ? [
          {
            name: "Glicose",
            data: glucoseRecords.map((r) => ({
              x: new Date(r.measuredAt).getTime(),
              y: Number(r.value),
            })),
          },
        ]
      : [];

  const options: ApexOptions = {
    chart: {
      id: "glucose",
      type: "line",
      height: 350,
      toolbar: { show: false },
      zoom: { enabled: false },
      background: "transparent",
      foreColor: "#6B7280", // gray-500
    },
    stroke: { curve: "smooth", width: 3 },
    colors: ["#3B82F6"], // blue-500
    xaxis: {
      type: "datetime",
      labels: {
        datetimeFormatter: { hour: "HH:mm" },
        style: { colors: "#6B7280", fontSize: "12px" },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tickAmount: 6,
    },
    yaxis: {
      title: { text: "mg/dL", style: { color: "#6B7280" } },
      labels: { style: { colors: "#6B7280", fontSize: "12px" } },
    },
    tooltip: {
      theme: "dark",
      custom: ({ dataPointIndex }) => {
        const record = glucoseRecords[dataPointIndex];
        if (!record) return "";
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
        {
          y: goal,
          borderColor: "#10B981",
          label: {
            text: "Meta",
            borderColor: "#10B981",
            style: {
              color: "#10B981",
              background: "transparent",
            },
          },
        },
        {
          y: goal + tolerance,
          borderColor: "#F59E0B",
          strokeDashArray: 4,
        },
        {
          y: goal - tolerance,
          borderColor: "#F59E0B",
          strokeDashArray: 4,
        },
      ],
    },
    grid: {
      borderColor: "#E5E7EB",
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
  };

  // 🔹 3. Hook para adaptar cores conforme o tema (SEM quebrar ordem)
  useEffect(() => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    (window as any).Apex?.charts?.exec("glucose", "updateOptions", {
      chart: { foreColor: isDark ? "#9CA3AF" : "#6B7280" },
      grid: { borderColor: isDark ? "#374151" : "#E5E7EB" },
      colors: [isDark ? "#60A5FA" : "#3B82F6"],
      annotations: {
        yaxis: [
          {
            y: goal,
            borderColor: isDark ? "#34D399" : "#10B981",
            label: { style: { color: isDark ? "#34D399" : "#10B981" } },
          },
          {
            y: goal + tolerance,
            borderColor: isDark ? "#FBBF24" : "#F59E0B",
            strokeDashArray: 4,
          },
          {
            y: goal - tolerance,
            borderColor: isDark ? "#FBBF24" : "#F59E0B",
            strokeDashArray: 4,
          },
        ],
      },
    });
  }, [goal, tolerance]);

  // 🔹 4. Renderização condicional segura (sem alterar ordem dos hooks)
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
      <h3 className="text-sm font-medium text-gray-800 dark:text-white/90 mb-3">
        Histórico de Glicose
      </h3>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
      ) : errorMessage ? (
        <p className="text-red-500 dark:text-red-400">{errorMessage}</p>
      ) : glucoseRecords.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">Sem dados para exibir.</p>
      ) : (
        <div id="glucose-chart">
          <ReactApexChart options={options} series={series} type="line" height={350} />
        </div>
      )}
    </div>
  );
}