"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon } from "@/icons";

interface GlucoseAverageCardProps {
    average: number;
    goal: number;
    tolerance: number;
}

const GlucoseAverageCard: React.FC<GlucoseAverageCardProps> = ({ average, goal, tolerance }) => {
    const diff = average - goal;
    const isWithinRange = Math.abs(diff) <= tolerance;
    const isAbove = diff > 0;

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">

            {/* Conteúdo */}
            <div className="flex items-end justify-between mt-5">
                <div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        Glicose média
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
                    {isWithinRange ? (
                        <Badge color="success">
                            <ArrowUpIcon className="text-success-500" />
                            Ótimo
                        </Badge>
                    ) : isAbove ? (
                        <Badge color="error">
                            <ArrowUpIcon className="text-error-500" />
                            Alto
                        </Badge>
                    ) : (
                        <Badge color="error">
                            <ArrowDownIcon className="text-error-500" />
                            Baixo
                        </Badge>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GlucoseAverageCard;




// "use client";

// import { ArrowUpIcon, ArrowDownIcon } from "@/icons";

// interface GlucoseAverageCardProps {
//   average: number;
//   goal: number;
//   tolerance?: number;
// }

// export default function GlucoseAverageCard({
//   average,
//   goal,
//   tolerance = 10,
// }: GlucoseAverageCardProps) {
//   const diff = average - goal;
//   const isWithinTolerance = Math.abs(diff) <= tolerance;

//   const IndicatorIcon = diff > 0 ? ArrowUpIcon : ArrowDownIcon;
//   const indicatorColor = isWithinTolerance ? "text-green-500" : "text-red-500";

//   return (
//     <div className="p-5 bg-white rounded-lg shadow dark:bg-gray-900">
//       <h3 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
//         Média das últimas medições
//       </h3>
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-2xl font-bold text-gray-800 dark:text-white">
//             {average.toFixed(2)}
//           </p>
//           <p className="text-sm text-gray-500 dark:text-gray-400">
//             Meta: {goal} mg/dL
//           </p>
//         </div>
//         <div className={`flex items-center ${indicatorColor}`}>
//           <IndicatorIcon className="w-6 h-6 mr-1" />
//           <span className="text-sm font-semibold">
//             {isWithinTolerance ? "Dentro da meta" : "Fora da meta"}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }