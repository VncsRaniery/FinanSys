"use client";

import { TrendingUp } from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

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
import { CategoryTooltip } from "./TooltipsGraficos";

const chartConfig = {} satisfies ChartConfig;

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export function GraficoRadar(props: Props) {
  const { data } = props;
  return (
    <Card>
      <CardHeader className="items-center pb-4">
        <CardTitle>Gráfico Radar</CardTitle>
        <CardDescription>Data</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="w-full aspect-square max-h-[340px] h-[340px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<CategoryTooltip />} />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            <Radar
              dataKey="value"
              fill="hsl(var(--chart-2))"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Tendência de alta de 5,2% este mês <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Mostrando o total de despesas por cada categoria.
        </div>
      </CardFooter>
    </Card>
  );
}
