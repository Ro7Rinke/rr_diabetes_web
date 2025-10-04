"use client";
import React, { useEffect, useState } from "react";
import Badge from "../ui/badge/Badge";
import { getStatusRangeBadgeColor, getStatusRangeIcon, getStatusRangeText, getStatusWithinRange, getTarget, TargetData } from "@/lib/target";

const GlucoseAverageCard = () => {
    const [target, setTarget] = useState<TargetData | null>(null);

    const average = 113.06
    const goal = target?.value ?? 0
    const tolerance = target?.tolerance ?? 0
    const statusWithinRange = getStatusWithinRange(average)
    const StatusRangeIcon = getStatusRangeIcon(statusWithinRange)

    useEffect(() => {
        const data = getTarget()
        if (data !== undefined) setTarget(data)
    },[])

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">

            {/* Conteúdo */}
            <div className="flex items-end justify-between">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Média {target?.interval ?? 7} dias
                    </span>
                    <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                        {average.toFixed(2)}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Meta: {goal} ± {tolerance}
                    </p>
                </div>

                <div className="flex flex-col items-center space-y-2">
                    {/* Ícone do card */}
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
                        <span className="text-xl font-bold text-gray-700 dark:text-gray-200">🩸</span>
                    </div>

                    {/* Badge */}
                    <Badge color={getStatusRangeBadgeColor(statusWithinRange)}>
                        <StatusRangeIcon />
                        {getStatusRangeText(statusWithinRange)}
                    </Badge>
                </div>
            </div>
        </div>
    );
};

export default GlucoseAverageCard;