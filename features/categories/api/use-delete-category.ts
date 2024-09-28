import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>;

export const useDeleteCategory = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.categories[":id"]["$delete"]({ param: { id } });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Categoria deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["category", { id }] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      // TODO: invalidar resumo e transações
    },
    onError: () => {
      toast.error("Falha ao deletar a categoria");
    },
  });

  return mutation;
};
