"use client";

import { useGetResumo } from "@/features/resumo/api/use-get-resumo";
import { Chart, ChartLoading } from "./Chart";
import { SpendingPie, SpendingPieLoading } from "./SpendingPie";

export const DataCharts = () => {
  const { data, isLoading } = useGetResumo();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
        <div className="col-span-1 lg:col-span-3 xl:col-span-4">
          <ChartLoading />
        </div>
        <div className="col-span-1 lg:col-span-3 xl:col-span-2">
          <SpendingPieLoading />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <div className="col-span-1 lg:col-span-3 xl:col-span-4">
        <Chart data={data?.days} />
      </div>
      <div className="col-span-1 lg:col-span-3 xl:col-span-2">
        <SpendingPie data={data?.categorias} />
      </div>
    </div>
  );
};
