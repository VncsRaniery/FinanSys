
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatPercentage } from "@/lib/utils";
import { CategoryTooltip } from "./CategoryTooltip";

const COLORS = [
  "#0062FF", // Azul Profundo
  "#12C6FF", // Azul Céu Claro
  "#FF647F", // Rosa Queimado
  "#FF9354", // Laranja Suave
  "#0052CC", // Azul Marinho
  "#0ABAB5", // Verde Água
  "#FF3B6A", // Rosa Vibrante
  "#FFB74D", // Laranja Dourado
  "#004BA0", // Azul Escuro
  "#009688", // Verde Esmeralda
  "#FF6F61", // Coral
  "#FFA726", // Laranja Brilhante
  "#005A8C", // Azul Steel
  "#FF9E80", // Pêssego
  "#FFB300", // Amarelo Brilhante
];

type Props = {
  data: {
    name: string;
    value: number;
  }[];
};

export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entry: any, index: number) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entry.value}
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
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="8884d8"
          dataKey="value"
          labelLine={false}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};