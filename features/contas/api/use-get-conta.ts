import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetConta = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["conta", { id }],
    queryFn: async () => {
      const response = await client.api.contas[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar conta");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
