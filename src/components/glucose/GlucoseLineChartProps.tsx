"use client";
import React from "react";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface GlucoseLineChartProps {
    values: number[];     // valores das medições
    labels: string[];     // labels correspondentes (ex: dias ou horários)
    goal: number;         // meta
    tolerance?: number;   // tolerância da meta
}

export default function GlucoseLineChart({
    values,
    labels,
    goal,
    tolerance = 10,
}: GlucoseLineChartProps) {
    if (!values || values.length === 0) {
        return <p className="text-gray-500">Sem dados para exibir.</p>;
    }

    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    const markers = values.map((val) => {
        if (val === maxValue) {
            return { size: 8, fillColor: "#EF4444", strokeColor: "#fff" };
        }
        if (val === minValue) {
            return { size: 8, fillColor: "#F59E0B", strokeColor: "#fff" };
        }
        return { size: 0 };
    });

    const options: ApexOptions = {
        chart: { type: "line", height: 350, toolbar: { show: false }, zoom: { enabled: false } },
        stroke: { curve: "smooth", width: 3 },
        colors: ["#3B82F6"], // cor da linha principal (média ou medição)
        xaxis: {
            categories: labels.map((label) => {
                // labels vêm no formato "YYYY-MM-DD HH:mm"
                return label.split(" ")[1]; // só pega a hora "HH:mm"
            }),
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: { title: { text: "mg/dL" }, labels: { style: { fontSize: "12px", colors: ["#6B7280"] } } },
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
            y: { formatter: (val) => `${val} mg/dL` },
            x: {
                formatter: (val, opts) => {
                    // mostra a label completa (data + hora) no tooltip
                    return labels[opts.dataPointIndex];
                },
            },
        },
        annotations: {
            yaxis: [
                { y: goal, borderColor: "#10B981" },
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