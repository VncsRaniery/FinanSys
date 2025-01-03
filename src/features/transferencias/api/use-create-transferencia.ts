import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.transferencias.$post>;
type RequestType = InferRequestType<
  typeof client.api.transferencias.$post
>["json"];

export const useCreateTransferencia = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.transferencias.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Transferência criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["transferencias"] });
      queryClient.invalidateQueries({ queryKey: ["resumo"] });
    },
    onError: () => {
      toast.error("Falha ao criar transferência");
    },
  });

  return mutation;
};
