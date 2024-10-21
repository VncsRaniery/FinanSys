import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategoria = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["categoria", { id }],
    queryFn: async () => {
      const response = await client.api.categorias[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Falha ao buscar categoria");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
