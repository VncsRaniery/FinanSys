import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.categorias.$post>;
type RequestType = InferRequestType<typeof client.api.categorias.$post>["json"];

export const useCreateCategoria = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categorias.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Categoria criada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
    },
    onError: () => {
      toast.error("Falha ao criar categoria");
    },
  });

  return mutation;
};
