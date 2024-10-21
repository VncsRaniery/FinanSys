import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { convertValorFromMiliunits } from "@/lib/utils";

export const useGetTransferencia = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["transferencia", { id }],
    queryFn: async () => {
      const response = await client.api.transferencias[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar transferência");
      }

      const { data } = await response.json();
      return {
        ...data,
        valor: convertValorFromMiliunits(data.valor),
      };
    },
  });

  return query;
};
