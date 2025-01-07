"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardGastos } from "./CardGastos";
import { Input } from "@/components/ui/input";
import { DataTable } from "./DataTable";
import { useGetResumo } from "@/features/resumo/api/use-get-resumo";
import { SpendingPie } from "@/components/SpendingPie";

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

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none shadow-md dark:shadow-xl dark:shadow-gray-900">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Gerenciamento de Carteira</CardTitle>
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
            <div className="col-span-1 lg:col-span-3 xl:col-span-4">
              <CardGastos
                percentuais={percentuais}
                onPercentuaisChange={handlePercentuaisChange}
                ganhoMensal={ganhoMensal}
              />
            </div>
            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
              <SpendingPie data={data?.categorias} />
            </div>
          </div>
          <DataTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default CarteiraPage;
