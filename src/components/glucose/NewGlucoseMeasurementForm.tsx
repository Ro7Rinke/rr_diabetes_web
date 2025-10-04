"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from "@/icons";
import Button from "@/components/ui/button/Button";
import Form from "@/components/form/Form";
import DatePicker from "../form/date-picker";
import { CreateGlucoseRecord, createGlucoseRecord, RecordContext } from "@/lib/glucose";
import { useRouter } from "next/navigation";

export default function GlicemiaForm() {
  const router = useRouter();
  
  const [value, setValue] = useState<string>("");
  const [context, setContext] = useState<RecordContext>(RecordContext.RANDOM);
  const [obs, setObs] = useState<string>("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [hour, setHour] = useState<Date | null>(new Date());
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const options = [
    { value: RecordContext.RANDOM, label: "Momento qualquer" },
    { value: RecordContext.FASTING, label: "Jejum" },
    { value: RecordContext.PRE_MEAL, label: "Antes de comer" },
    { value: RecordContext.POST_MEAL, label: "Depois de comer" },
  ];

  const handleSubmit = async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      
      if (!value || isNaN(Number(value))) {
        setErrorMessage("Informe um valor válido para a glicemia.");
        return;
      }
      if (!date || !hour) {
        setErrorMessage("Selecione data e hora da medição.");
        return;
      }

      const measuredAt = new Date(date);
      measuredAt.setHours(hour.getHours(), hour.getMinutes(), 0, 0);

      const record: CreateGlucoseRecord = {
        value: Number(value),
        measuredAt,
        obs: obs || undefined,
        context,
      };

      await createGlucoseRecord(record)

      router.push("/");
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  };


  return (
    <div>
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-1">
        <ComponentCard title="Nova Medição">
          <Form onSubmit={handleSubmit} className="space-y-6">
            {/* Valor numérico */}
            <div>
              <Label htmlFor="valor">Valor da Glicemia (mg/dL)</Label>
              <Input
                id="valor"
                type="number"
                step={0.01}
                placeholder="Ex: 95.5"
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            {/* Situação */}
            <div>
              <Label>Contexto</Label>
              <div className="relative">
                <Select
                  options={options}
                  placeholder="Selecione"
                  onChange={(val) => setContext(val as RecordContext)}
                  className="dark:bg-dark-900"
                  defaultValue={RecordContext.RANDOM}
                />
                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                  <ChevronDownIcon />
                </span>
              </div>
            </div>

            {/* Observação */}
            <div>
              <Label>Observação</Label>
              <Input
                type="text"
                placeholder="Ex: após caminhada"
                onChange={(e) => setObs(e.target.value)}
              />
            </div>

            {/* Data */}
            <div>
              <DatePicker
                id="data"
                label="Data da Medição"
                placeholder="Selecione a data"
                defaultDate={date || new Date()}
                onChange={(selectedDates) => {
                  setDate(selectedDates[0]);
                }}
              />
            </div>

            {/* Hora */}
            <div>
              <DatePicker
                id="hora"
                label="Hora da Medição"
                placeholder="Selecione a hora"
                mode="time"
                defaultDate={hour || new Date()}
                onChange={(selectedDates) => {
                  setHour(selectedDates[0]);
                }}
              />
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
            {/* Botão de envio */}
            <div className="pt-4 flex justify-center">
              <Button variant="primary" size="md">
                {loading ? 'Salvando...' : 'Salvar Medição'}
              </Button>
            </div>
          </Form>
        </ComponentCard>
      </div>
    </div>
  );
}