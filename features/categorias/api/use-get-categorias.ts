import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCategorias = () => {
  const query = useQuery({
    queryKey: ["categorias"],
    queryFn: async () => {
      const response = await client.api.categorias.$get();

      if (!response.ok) {
        throw new Error("Falha ao buscar categorias!");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
