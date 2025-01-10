"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardGastos } from "./CardGastos";
import { Input } from "@/components/ui/input";
import { DataTable } from "./DataTable";
import { useGetResumo } from "@/features/resumo/api/use-get-resumo";
import { SpendingPie } from "@/components/SpendingPie";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react";

const CarteiraPage = () => {
  const { data, isLoading } = useGetResumo();

  const [percentuais, setPercentuais] = useState({
    custosFixos: 35,
    conforto: 15,
    metas: 10,
    prazeres: 10,
    liberdadeFinanceira: 25,
    conhecimento: 5,
  });

  const [ganhoMensal, setGanhoMensal] = useState<number>(0);

  const handlePercentuaisChange = (newPercentuais: typeof percentuais) => {
    setPercentuais(newPercentuais);
  };

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none shadow-md dark:shadow-xl dark:shadow-gray-900">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none shadow-md dark:shadow-xl dark:shadow-gray-900">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Gerenciamento de Carteira
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex w-full max-w-sm items-center space-x-2 py-4">
            <Input
              className="max-w-sm"
              type="text"
              placeholder="Valores Ganhos Mensalmente"
              onChange={(e) => setGanhoMensal(parseFloat(e.target.value) || 0)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            <div className="col-span-1 lg:col-span-3 xl:col-span-4 mb-8 lg:mb-0">
              <CardGastos
                percentuais={percentuais}
                onPercentuaisChange={handlePercentuaisChange}
                ganhoMensal={ganhoMensal}
              />
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2 mb-8 lg:mb-0">
              <SpendingPie data={data?.categorias} />
            </div>
          </div>

          <div className="mt-8">
            <DataTable
              percentuais={percentuais}
              onPercentuaisChange={handlePercentuaisChange}
              ganhoMensal={ganhoMensal}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarteiraPage;
