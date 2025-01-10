import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { SheetDemo } from "./EditPorcentagens";

type CardProps = React.ComponentProps<typeof Card> & {
  percentuais: {
    custosFixos: number;
    conforto: number;
    metas: number;
    prazeres: number;
    liberdadeFinanceira: number;
    conhecimento: number;
  };
  onPercentuaisChange: (percentuais: any) => void;
  ganhoMensal: number;
};

export function CardGastos({
  percentuais,
  onPercentuaisChange,
  ganhoMensal,
  className,
  ...props
}: CardProps) {
  const categorias = [
    {
      title: "Custos Fixos",
      description: "Ideal ser 35% do seu salário!",
      percentual: percentuais.custosFixos,
    },
    {
      title: "Conforto",
      description: "Ideal ser 15% do seu salário!",
      percentual: percentuais.conforto,
    },
    {
      title: "Metas",
      description: "Ideal ser 10% do seu salário!",
      percentual: percentuais.metas,
    },
    {
      title: "Prazeres",
      description: "Ideal ser 10% do seu salário!",
      percentual: percentuais.prazeres,
    },
    {
      title: "Liberdade Financeira",
      description: "Tentar sempre ser 25% do seus ganhos mensais!",
      percentual: percentuais.liberdadeFinanceira,
    },
    {
      title: "Conhecimentos",
      description: "Tentar sempre ser 25% do seus ganhos mensais!",
      percentual: percentuais.conhecimento,
    },
  ];

  return (
    <Card className={cn("w-full h-full", className)} {...props}>
      <CardHeader className="relative ">
        <CardTitle>Distribuição de Gastos</CardTitle>
        <CardDescription className="pb-6">
          Baseado no seu ganho mensal:{" "}
          {ganhoMensal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </CardDescription>
        <div className="absolute top-4 right-0 m-5">
          <SheetDemo onPercentuaisChange={onPercentuaisChange} />
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categorias.map(({ title, description, percentual }, index) => {
            const valorCalculado = (ganhoMensal * percentual) / 100;
            return (
              <div
                key={index}
                className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{title}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                  <p className="text-sm text-muted-foreground">
                    {percentual}% -{" "}
                    <strong>
                      {valorCalculado.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </strong>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
