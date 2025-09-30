import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import NewGlucoseMeasurementForm from "@/components/glucose/NewGlucoseMeasurementForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Registro de Glicemia | TailAdmin",
  description: "Página para registrar medições de glicemia no TailAdmin",
};

export default function Page() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Registro de Glicemia" />
      <NewGlucoseMeasurementForm />
    </div>
  );
}
