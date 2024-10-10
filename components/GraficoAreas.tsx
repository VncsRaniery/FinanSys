"use client";

import { TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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
import { CustomTooltip } from "./TooltipsGraficos";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const chartConfig = {} satisfies ChartConfig;

type Props = {
  data: {
    date: string;
    income: number;
    expenses: number;
  }[];
};

export function GraficoAreas(props: Props) {
  const { data } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico em Área</CardTitle>
        <CardDescription>Data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-full max-w-full h-[300px] p-4 sm:w-full"
        >
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) =>
                format(value, "dd MMM", { locale: ptBR })
              }
            />
            <ChartTooltip cursor={false} content={<CustomTooltip />} />
            <defs>
              <linearGradient id="income" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="expenses" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area
              dataKey="income"
              type="natural"
              fill="url(#income)"
              fillOpacity={0.4}
              stroke="#10B981"
              stackId="income"
              className="drop-shadow-sm"
            />
            <Area
              dataKey="expenses"
              type="natural"
              fill="url(#expenses)"
              fillOpacity={0.4}
              stroke="#f43f5e"
              stackId="expenses"
              className="drop-shadow-sm"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Tendência de alta de 5,2% este mês{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Mostrando o total de despesas e renda por cada data.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
