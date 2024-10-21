"use client";

import { CircleDollarSign, CircleMinus, CirclePlus } from "lucide-react";
import { useGetResumo } from "@/features/resumo/api/use-get-resumo";
import { formatDateRange } from "@/lib/utils"; 
import { useSearchParams } from "next/navigation";
import { DataCard, DataCardLoading } from "./DataCard";

export const DataGrid = () => {
  const { data, isLoading } = useGetResumo();

  const params = useSearchParams();
  const to = params.get("to") || undefined;
  const from = params.get("from") || undefined;

  const dateRangeLabel = formatDateRange({ from, to });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardLoading />
        <DataCardLoading />
        <DataCardLoading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Restante"
        value={data?.valorRestante}
        percentageChange={data?.restanteChange}
        icon={CircleDollarSign}
        dateRange={dateRangeLabel}
        variant="default"
      />

      <DataCard
        title="Renda"
        value={data?.valorRenda}
        percentageChange={data?.rendaChange}
        icon={CirclePlus}
        dateRange={dateRangeLabel}
        variant="renda"
      />

      <DataCard
        title="Despesas"
        value={data?.valorDespesas}
        percentageChange={data?.despesasChange}
        icon={CircleMinus}
        dateRange={dateRangeLabel}
        variant="despesas"
      />
    </div>
  );
};
