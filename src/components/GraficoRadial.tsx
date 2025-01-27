"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, RadialBar, RadialBarChart } from "recharts";

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

const chartConfig = {} satisfies ChartConfig;

const CORES = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))",
];

type Props = {
  data: {
    nome: string;
    value: number;
  }[];
};

export function GraficoRadial(props: Props) {
  const { data } = props;
  return (
    <Card className="border-none flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Gráfico Radial</CardTitle>
        <CardDescription>Data</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square max-h-[350px] h-[350px]"
        >
          <RadialBarChart
            data={data.map((item, index) => ({
              ...item,
              fill: CORES[index % CORES.length],
            }))}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<CategoriaTooltip hideLabel />}
            />
            <RadialBar dataKey="value" background>
              <LabelList
                position="insideStart"
                dataKey="nome"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
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
