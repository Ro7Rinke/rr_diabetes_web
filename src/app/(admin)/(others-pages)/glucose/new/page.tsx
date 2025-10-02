import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NewGlucoseMeasurementForm from "@/components/glucose/NewGlucoseMeasurementForm";
import { ChevronLeftIcon } from "@/icons";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Registro de Glicemia | TailAdmin",
  description: "Página para registrar medições de glicemia no TailAdmin",
};

export default function Page() {
  return (
    <div>
      {/* <PageBreadcrumb pageTitle="Registro de Glicemia" /> */}
      <div className="w-full sm:pt-2 mb-5 flex justify-start">
                <Link
                    href="/"
                    className="inline-flex items-center rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
                >
                    <ChevronLeftIcon className="mr-2 h-4 w-4" />
                    Voltar à Home
                </Link>
            </div>
      <NewGlucoseMeasurementForm />
    </div>
  );
}
