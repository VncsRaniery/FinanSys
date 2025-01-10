import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useGetResumo } from "@/features/resumo/api/use-get-resumo";

type TableProps = React.ComponentProps<typeof Card> & {
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

export function DataTable({
  percentuais,
  onPercentuaisChange,
  ganhoMensal,
  className,
  ...props
}: TableProps) {
  const { data: resumo, isLoading } = useGetResumo();

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  const categorias = [
    {
      title: "Custos Fixos",
      percentual: percentuais.custosFixos,
      despesa:
        resumo?.categorias.find((c) => c.nome === "Custos Fixos")?.value || 0,
    },
    {
      title: "Conforto",
      percentual: percentuais.conforto,
      despesa:
        resumo?.categorias.find((c) => c.nome === "Conforto")?.value || 0,
    },
    {
      title: "Metas",
      percentual: percentuais.metas,
      despesa: resumo?.categorias.find((c) => c.nome === "Metas")?.value || 0,
    },
    {
      title: "Prazeres",
      percentual: percentuais.prazeres,
      despesa:
        resumo?.categorias.find((c) => c.nome === "Prazeres")?.value || 0,
    },
    {
      title: "Liberdade Financeira",
      percentual: percentuais.liberdadeFinanceira,
      despesa:
        resumo?.categorias.find((c) => c.nome === "Liberdade Financeira")
          ?.value || 0,
    },
    {
      title: "Conhecimentos",
      percentual: percentuais.conhecimento,
      despesa:
        resumo?.categorias.find((c) => c.nome === "Conhecimentos")?.value || 0,
    },
  ];

  return (
    <Card className={cn("w-full h-full", className)} {...props}>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost">
                  Categoria
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  Percentual
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  Valor Limite
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  Despesas
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  Restante
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost">
                  Progresso
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categorias.map(({ title, percentual, despesa }, index) => {
              const valorCalculado = (ganhoMensal * percentual) / 100;

              const restante = Math.max(valorCalculado - despesa, 0);

              const progresso =
                valorCalculado > 0 ? (despesa / valorCalculado) * 100 : 0;

              const corProgresso =
                despesa > valorCalculado
                  ? "bg-red-500"
                  : despesa > valorCalculado / 2
                  ? "bg-yellow-500"
                  : "bg-green-500";

              return (
                <TableRow key={index}>
                  <TableCell>{title}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium px-3.5 py-2.5"
                    >
                      {percentual}%
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="primary"
                      className="text-xs font-medium px-3.5 py-2.5"
                    >
                      {valorCalculado.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="destructive"
                      className="text-xs font-medium px-3.5 py-2.5"
                    >
                      {despesa.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="text-xs font-medium px-3.5 py-2.5"
                    >
                      {restante.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="w-full h-2 bg-gray-800 rounded-md overflow-hidden">
                      <div
                        className={cn("h-full", corProgresso)}
                        style={{ width: `${Math.min(progresso, 100)}%` }}
                      ></div>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
