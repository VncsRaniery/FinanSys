import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.transferencias)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.transferencias)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteTransferencias = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transferencias["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transferência deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transferencias"] });
      queryClient.invalidateQueries({ queryKey: ["resumo"] });
    },
    onError: () => {
      toast.error("Falha ao deletar transferência");
    },
  });

  return mutation;
};
