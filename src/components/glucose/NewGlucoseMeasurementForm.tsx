"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { ChevronDownIcon, TimeIcon } from "@/icons";
import Button from "@/components/ui/button/Button";
import Form from "@/components/form/Form"; // <-- importa sua classe Form

export default function GlicemiaForm() {
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "jejum", label: "Jejum" },
    { value: "antes", label: "Antes de comer" },
    { value: "depois", label: "Depois de comer" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // aqui você coleta os valores do form e envia para API/banco
    console.log("Form enviado!");
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <ComponentCard title="Nova Medição">
          {/* Usa o Form customizado */}
          <Form onSubmit={handleSubmit} className="space-y-6">
            {/* Valor numérico */}
            <div>
              <Label htmlFor="valor">Valor da Glicemia (mg/dL)</Label>
              <Input id="valor" type="number" step={0.01} placeholder="Ex: 95.5" />
            </div>

            {/* Situação */}
            <div>
              <Label>Situação</Label>
              <div className="relative">
                <Select
                  options={options}
                  placeholder="Selecione"
                  onChange={(value) => setSelectedOption(value)}
                  className="dark:bg-dark-900"
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            {/* Observação */}
            <div>
              <Label>Observação</Label>
              <Input type="text" placeholder="Ex: após caminhada" />
            </div>

            {/* Data */}
            <div>
              <Label htmlFor="data">Data da Medição</Label>
              <Input
                type="date"
                id="data"
                defaultValue={new Date().toISOString().slice(0, 10)}
              />
            </div>

            {/* Hora */}
            <div>
              <Label htmlFor="hora">Hora da Medição</Label>
              <div className="relative">
                <Input
                  type="time"
                  id="hora"
                  defaultValue={new Date().toISOString().substring(11, 16)}
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <TimeIcon />
                </span>
              </div>
            </div>

            {/* Botão de envio */}
            <div className="pt-4">
              <Button variant="primary" size="md">
                Salvar Medição
              </Button>
            </div>
          </Form>
        </ComponentCard>
      </div>
    </div>
  );
}
