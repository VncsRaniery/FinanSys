import {
  AreaChart,
  BarChart3,
  FileSearch,
  LineChart,
  Loader2,
} from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GraficoAreas } from "./GraficoAreas";
import { GraficoBarras } from "./GraficoBarras";
import { GraficoLinhas } from "./GraficoLinhas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  data?: {
    date: string;
    renda: number;
    despesas: number;
  }[];
};

export const Chart = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState("area");

  const onTypeChange = (type: string) => {
    setChartType(type);
  };

  return (
    <Card className="shadow-md dark:shadow-xl dark:shadow-gray-900">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <CardTitle className="text-xl line-clamp-1">Transferências</CardTitle>
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Tipo de gráfico" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="area">
              <div className="flex items-center">
                <AreaChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Gráfico de área</p>
              </div>
            </SelectItem>
            <SelectItem value="linha">
              <div className="flex items-center">
                <LineChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Gráfico de linhas</p>
              </div>
            </SelectItem>
            <SelectItem value="barra">
              <div className="flex items-center">
                <BarChart3 className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Gráfico de barras</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground text-sm">
              Não há dados para este período
            </p>
          </div>
        ) : (
          <>
            {chartType === "area" && <GraficoAreas data={data} />}
            {chartType === "linha" && <GraficoLinhas data={data} />}
            {chartType === "barra" && <GraficoBarras data={data} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export const ChartLoading = () => {
  return (
    <Card className="border-none shadow-md dark:shadow-xl dark:shadow-gray-900">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 lg:w-[120px] w-full" />
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
        </div>
      </CardContent>
    </Card>
  );
};
