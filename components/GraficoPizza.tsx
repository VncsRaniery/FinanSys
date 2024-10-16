"use client";

import { TrendingUp } from "lucide-react";
import { Cell, Legend, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
import { CategoriaTooltip } from "./TooltipsGraficos";
import { formatPercentage } from "@/lib/utils";

const chartConfig = {} satisfies ChartConfig;

const CORES = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
  "hsl(var(--chart-7))",
  "hsl(var(--chart-8))",
  "hsl(var(--chart-9))",
  "hsl(var(--chart-10))",
  "hsl(var(--chart-11))",
  "hsl(var(--chart-12))",
];

type Props = {
  data: {
    nome: string;
    value: number;
  }[];
};

export function GraficoPizza(props: Props) {
  const { data } = props;
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gráfico de Pizza</CardTitle>
        <CardDescription>Data</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square max-h-[350px] h-[350px]"
        >
          <PieChart>
            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              iconType="circle"
              content={({ payload }: any) => {
                return (
                  <ul className="flex flex-wrap justify-center space-x-3 max-w-full overflow-hidden mb-4">
                    {payload.map((entry: any, index: number) => (
                      <li
                        key={`item-${index}`}
                        className="flex items-center space-x-2 mb-2"
                      >
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: entry.color }}
                        />
                        <div className="space-x-1">
                          <span className="text-sm text-muted-foreground">
                            {entry.payload.nome}
                          </span>
                          <span className="text-sm">
                            {formatPercentage(entry.payload.percent * 100)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                );
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<CategoriaTooltip hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              {data.map((_entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CORES[index % CORES.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tendência de alta de 5,2% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Mostrando o total de despesas por cada categoria.
        </div>
      </CardFooter>
    </Card>
  );
}
