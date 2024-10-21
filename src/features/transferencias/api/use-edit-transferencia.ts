import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transferencias)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transferencias)[":id"]["$patch"]
>["json"];

export const useEditTransferencia = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transferencias[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transferência editada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transferencia", { id }] });
      queryClient.invalidateQueries({ queryKey: ["transferencias"] });
      queryClient.invalidateQueries({ queryKey: ["resumo"] });
    },
    onError: () => {
      toast.error("Falha ao editar transferência");
    },
  });

  return mutation;
};
