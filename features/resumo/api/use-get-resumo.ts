import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { convertValorFromMiliunits } from "@/lib/utils";

export const useGetResumo = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const contaId = params.get("contaId") || "";

  const query = useQuery({
    // TODO: Os parâmetros de check-in são necessários na chave
    queryKey: ["resumo", { from, to, contaId }],
    queryFn: async () => {
      const response = await client.api.resumo.$get({
        query: { from, to, contaId },
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar resumos");
      }

      const { data } = await response.json();
      return {
        ...data,
        valorRenda: convertValorFromMiliunits(data.valorRenda),
        valorDespesas: convertValorFromMiliunits(data.valorDespesas),
        valorRestante: convertValorFromMiliunits(data.valorRestante),
        categorias: data.categorias.map((categoria) => ({
          ...categoria,
          value: convertValorFromMiliunits(categoria.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          renda: convertValorFromMiliunits(day.renda),
          despesas: convertValorFromMiliunits(day.despesas),
        })),
      };
    },
  });

  return query;
};
