"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { fetchGlucoseRecords, getRecordContextLabel, GlucoseRecord } from "@/lib/glucose";
import { getTarget, TargetData } from "@/lib/target";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function GlucoseLineChart() {
    const [glucoseRecords, setGlucoseRecords] = useState<GlucoseRecord[]>([]);
    const [target, setTarget] = useState<TargetData | null>(null);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const goal = target?.value ?? 100
    const tolerance = target?.tolerance ?? 10

    // 🔹 Hooks sempre primeiro
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setErrorMessage("");

            try {
                const data = getTarget()
                if (data !== undefined) setTarget(data)
                const dataRecords = await fetchGlucoseRecords();
                setGlucoseRecords(dataRecords);
            } catch (err: any) {
                setErrorMessage(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // 🔹 Serie de dados
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

    // 🔹 Calcula max/min para os markers
    const yValues = glucoseRecords.map((r) => Number(r.value));
    const maxValue = Math.max(...yValues);
    const minValue = Math.min(...yValues);

    const markersDiscrete = glucoseRecords
        .map((r, i) => {
            const val = Number(r.value);
            if (val === maxValue)
                return { seriesIndex: 0, dataPointIndex: i, size: 6, fillColor: "#EF4444", strokeColor: "#fff" };
            if (val === minValue)
                return { seriesIndex: 0, dataPointIndex: i, size: 6, fillColor: "#F59E0B", strokeColor: "#fff" };
            return null;
        })
        .filter((m): m is { seriesIndex: number; dataPointIndex: number; size: number; fillColor: string; strokeColor: string } => m !== null);

    // 🔹 Opções do gráfico
    const options: ApexOptions = {
        chart: {
            id: "glucose",
            type: "line",
            height: 350,
            toolbar: { show: false },
            zoom: { enabled: false },
            background: "transparent",
            foreColor: "#6B7280",
        },
        stroke: { curve: "smooth", width: 3 },
        colors: ["#3B82F6"],
        xaxis: {
            type: "datetime",
            labels: { style: { colors: "#6B7280", fontSize: "12px" } },
            axisBorder: { show: false },
            axisTicks: { show: false },
            tickAmount: 6, // máximo 6 marcações
        },
        yaxis: {
            title: { text: "mg/dL", style: { color: "#6B7280" } },
            labels: { style: { colors: "#6B7280", fontSize: "12px" } },
        },
        markers: { size: 4, discrete: markersDiscrete },
        tooltip: {
            theme: "dark",
            custom: ({ dataPointIndex }) => {
                const record = glucoseRecords[dataPointIndex];
                if (!record) return "";
                const date = new Date(record.measuredAt);
                const formatted = date.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });
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
                // { y: goal, borderColor: "#10B981", label: { text: "Meta", style: { color: "#10B981" } } },
                { y: goal, borderColor: "#10B981"},
                { y: goal + tolerance, borderColor: "#F59E0B", strokeDashArray: 4 },
                { y: goal - tolerance, borderColor: "#F59E0B", strokeDashArray: 4 },
                { y: goal + (2 * tolerance), borderColor: "#EF4444", strokeDashArray: 4 },
                { y: goal - (2 * tolerance), borderColor: "#EF4444", strokeDashArray: 4 },
            ],
        },
        grid: { xaxis: { lines: { show: false } }, yaxis: { lines: { show: true } } },
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03] p-4">
            <h3 className="text-md font-medium text-gray-800 dark:text-white/90 mb-3">Histórico de Glicose</h3>

            {loading ? (
                <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
            ) : errorMessage ? (
                <p className="text-red-500 dark:text-red-400">{errorMessage}</p>
            ) : glucoseRecords.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">Sem dados para exibir.</p>
            ) : (
                <ReactApexChart options={options} series={series} type="line" height={350} />
            )}
        </div>
    );
}