import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetContas = () => {
  const query = useQuery({
    queryKey: ["contas"],
    queryFn: async () => {
      const response = await client.api.contas.$get();

      if (!response.ok) {
        throw new Error("Falha ao buscar contas");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
