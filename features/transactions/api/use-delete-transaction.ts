import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transactions[":id"]["$delete"]>;

export const useDeleteTransaction = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.transactions[":id"]["$delete"]({ param: { id } });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transação deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transaction", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      // TODO: invalidar resumo
    },
    onError: () => {
      toast.error("Falha ao deletar a transação");
    },
  });

  return mutation;
};
