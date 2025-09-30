"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface GlucoseMeasurement {
  id: string;
  value: number;
  date: string;
  timing: string; //"Jejum" | "Antes" | "Depois";
  obs?: string;
}

interface GlucoseListTableProps {
  measurements: GlucoseMeasurement[];
  goal: number;
  tolerance: number;
}

export default function GlucoseListTable({
  measurements,
  goal,
  tolerance,
}: GlucoseListTableProps) {
  if (!measurements || measurements.length === 0) {
    return <p className="text-gray-500 dark:text-gray-400">Sem medições para exibir.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell className="px-2 py-2 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Status</TableCell>
                <TableCell className="px-2 py-2 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Valor</TableCell>
                <TableCell className="px-2 py-2 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Data / Hora</TableCell>
                <TableCell className="px-2 py-2 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Timing</TableCell>
                <TableCell className="px-2 py-2 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Observação</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {measurements.map((m) => {
                const withinGoal = Math.abs(m.value - goal) <= tolerance;

                return (
                  <TableRow key={m.id} className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                    {/* Status */}
                    <TableCell className="px-2 py-1 text-center">
                      <Badge color={withinGoal ? "success" : "error"}>
                        {withinGoal ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        )}
                      </Badge>
                    </TableCell>

                    {/* Valor */}
                    <TableCell className="px-2 py-1 text-center">
                      <div
                        className="text-sm font-medium text-gray-800 dark:text-white/90"
                        onClick={() => (window.location.href = `/glucose/${m.id}`)}
                      >
                        {m.value}
                      </div>
                    </TableCell>

                    {/* Data / Hora */}
                    <TableCell className="px-2 py-1 text-center">
                      <div
                        className="text-xs text-gray-800 dark:text-white/90 leading-tight"
                        onClick={() => (window.location.href = `/glucose/${m.id}`)}
                      >
                        {new Date(m.date).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div
                        className="text-xxs text-gray-500 dark:text-gray-400 leading-tight"
                        onClick={() => (window.location.href = `/glucose/${m.id}`)}
                      >
                        {new Date(m.date).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })}
                      </div>
                    </TableCell>

                    {/* Timing */}
                    <TableCell className="px-2 py-1 text-center">
                      <div
                        className="text-sm text-gray-800 dark:text-white/90"
                        onClick={() => (window.location.href = `/glucose/${m.id}`)}
                      >
                        {m.timing}
                      </div>
                    </TableCell>

                    {/* Observação */}
                    <TableCell className="px-2 py-1 max-w-[150px]">
                      <div
                        className="truncate text-xs text-gray-800 dark:text-white/90"
                        title={m.obs}
                        onClick={() => (window.location.href = `/glucose/${m.id}`)}
                      >
                        {m.obs ? (m.obs.length > 50 ? m.obs.substring(0, 50) + "…" : m.obs) : "-"}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}