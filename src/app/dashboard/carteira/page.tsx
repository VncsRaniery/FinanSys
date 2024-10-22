"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CardGastos } from "./CardGastos";
import { ChartCarteira } from "./Chart";
import { Input } from "@/components/ui/input"; // Importar o Input
import { DataTable } from "./DataTable";

const CarteiraPage = () => {
  const [percentuais, setPercentuais] = useState({
    custosFixos: 35,
    conforto: 15,
    metas: 10,
    prazeres: 10,
    liberdadeFinanceira: 25,
    conhecimento: 5,
  });

  // Novo estado para o ganho mensal
  const [ganhoMensal, setGanhoMensal] = useState<number>(0);

  // Função para atualizar os percentuais
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
          {/* Input de Ganho Mensal movido para a página principal */}
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
                ganhoMensal={ganhoMensal} // Passar o ganhoMensal como prop para o CardGastos
              />
            </div>

            <div className="col-span-1 lg:col-span-3 xl:col-span-2">
              <ChartCarteira />
            </div>
          </div>
          <DataTable />
        </CardContent>
      </Card>
    </div>
  );
};

export default CarteiraPage;
