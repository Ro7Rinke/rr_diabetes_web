"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { fetchGlucoseRecords, GlucoseRecord } from "@/lib/glucose";
import { getStatusRangeBadgeColor, getStatusRangeIcon, getStatusWithinRange } from "@/lib/target";
import { formatValue } from "@/lib/commons";


export default function GlucoseListTable() {
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
    return <p className="text-gray-500 dark:text-gray-400">Sem medições para exibir.</p>;
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[700px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell className="px-2 py-2 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Valor</TableCell>
                <TableCell className="px-2 py-2 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Data / Hora</TableCell>
                <TableCell className="px-2 py-2 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Timing</TableCell>
                <TableCell className="px-2 py-2 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">Observação</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {glucoseRecords.map((record) => {
                const statusWithinRange = getStatusWithinRange(record.value)
                const StatusRangeIcon = getStatusRangeIcon(statusWithinRange)

                return (
                  <TableRow key={record.id} className="hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer">
                    {/* Valor */}
                    <TableCell className="px-2 py-1 text-center">
                      <div
                        className="text-sm font-medium text-gray-800 dark:text-white/90"
                        onClick={() => (window.location.href = `/glucose/${record.id}`)}
                      >
                        <Badge color={getStatusRangeBadgeColor(statusWithinRange)}>
                          <StatusRangeIcon />
                          {formatValue(record.value)}
                        </Badge>
                      </div>
                    </TableCell>

                    {/* Data / Hora */}
                    <TableCell className="px-2 py-1 text-center">
                      <div
                        className="text-xs text-gray-800 dark:text-white/90 leading-tight"
                        onClick={() => (window.location.href = `/glucose/${record.id}`)}
                      >
                        {new Date(record.measuredAt).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div
                        className="text-xxs text-gray-500 dark:text-gray-400 leading-tight"
                        onClick={() => (window.location.href = `/glucose/${record.id}`)}
                      >
                        {new Date(record.measuredAt).toLocaleDateString("pt-BR", {
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
                        onClick={() => (window.location.href = `/glucose/${record.id}`)}
                      >
                        {record.context}
                      </div>
                    </TableCell>

                    {/* Observação */}
                    <TableCell className="px-2 py-1 max-w-[150px]">
                      <div
                        className="truncate text-xs text-gray-800 dark:text-white/90"
                        title={record.obs}
                        onClick={() => (window.location.href = `/glucose/${record.id}`)}
                      >
                        {record.obs ? (record.obs.length > 50 ? record.obs.substring(0, 50) + "…" : record.obs) : "-"}
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