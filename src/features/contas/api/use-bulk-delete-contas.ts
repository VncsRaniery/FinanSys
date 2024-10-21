import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.contas)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.contas)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteContas = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.contas["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Conta deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["contas"] });
    },
    onError: () => {
      toast.error("Falha ao deletar conta");
    },
  });

  return mutation;
};
