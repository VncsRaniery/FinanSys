import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ptBR } from "date-fns/locale";

// TOOLTIP DOS GRÁFICOS DE CATEGORIAS
export const CategoriaTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  const nome = payload[0].payload.nome;
  const value = payload[0].value;

  return (
    <div className="rounded-sm shadow-sm border overflow-hidden bg-popover text-popover-foreground">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {nome}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-red-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Despesas</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(value * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};

// TOOLTIP DE CUSTOMIZAÇÃO DOS GRÁFICOS
export const CustomTooltip = ({ active, payload }: any) => {
  if (!active) return null;

  const date = payload[0].payload.date;
  const renda = payload[0].value;
  const despesas = payload[1].value;

  return (
    <div className="rounded-sm shadow-sm border overflow-hidden bg-popover text-popover-foreground">
      <div className="text-sm p-2 px-3 bg-muted text-muted-foreground">
        {format(date, "dd MMM yyyy", { locale: ptBR })}
      </div>
      <Separator />
      <div className="p-2 px-3 space-y-1">
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-green-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Renda</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(renda)}
          </p>
        </div>
        <div className="flex items-center justify-between gap-x-4">
          <div className="flex items-center gap-x-2">
            <div className="size-1.5 bg-red-500 rounded-full" />
            <p className="text-sm text-muted-foreground">Despesas</p>
          </div>
          <p className="text-sm text-right font-medium">
            {formatCurrency(despesas * -1)}
          </p>
        </div>
      </div>
    </div>
  );
};
