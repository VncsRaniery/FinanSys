"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
    renda: number;
    despesas: number;
  }[];
};

export function GraficoLinhas(props: Props) {
  const { data } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico em linhas</CardTitle>
        <CardDescription>Data</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="w-auto max-w-full h-[300px] p-4 sm:w-full"
        >
          <LineChart
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
            <Line
              dataKey="renda"
              type="monotone"
              stroke="#10B981"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="despesas"
              type="monotone"
              stroke="#f43f5e"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
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
