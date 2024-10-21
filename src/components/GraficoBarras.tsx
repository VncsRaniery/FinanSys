"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CustomTooltip } from "./TooltipsGraficos";

const chartConfig = {} satisfies ChartConfig;

type Props = {
  data: {
    date: string;
    renda: number;
    despesas: number;
  }[];
};

export function GraficoBarras(props: Props) {
  const { data } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico em Barras</CardTitle>
        <CardDescription>Data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-auto max-w-full h-[300px] p-4 sm:w-full"
        >
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                format(value, "dd MMM", { locale: ptBR })
              }
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <Bar dataKey="renda" fill="#10B981" radius={4} />
            <Bar dataKey="despesas" fill="#f43f5e" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Tendência de alta de 5,2% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o total de despesas e renda por cada data.
        </div>
      </CardFooter>
    </Card>
  );
}
