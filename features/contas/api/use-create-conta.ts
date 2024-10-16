import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.contas.$post>;
type RequestType = InferRequestType<typeof client.api.contas.$post>["json"];

export const useCreateConta = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.contas.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["contas"] });
    },
    onError: () => {
      toast.error("Falha ao criar conta");
    },
  });

  return mutation;
};
