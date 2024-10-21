import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transferencias)[":id"]["$delete"]
>;

export const useDeleteTransferencia = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.transferencias[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transferência deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transferencia", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transferencias"] });
      queryClient.invalidateQueries({ queryKey: ["resumo"] });
    },
    onError: () => {
      toast.error("Falha ao deletar a transferência");
    },
  });

  return mutation;
};
