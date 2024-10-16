import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { convertValorFromMiliunits } from "@/lib/utils";

export const useGetTransferencias = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const contaId = params.get("contaId") || "";

  const query = useQuery({
    queryKey: ["transferencias", { from, to, contaId }],
    queryFn: async () => {
      const response = await client.api.transferencias.$get({
        query: { from, to, contaId },
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar transferências");
      }

      const { data } = await response.json();
      return data.map((transferencia) => ({
        ...transferencia,
        valor: convertValorFromMiliunits(transferencia.valor),
      }));
    },
  });

  return query;
};
