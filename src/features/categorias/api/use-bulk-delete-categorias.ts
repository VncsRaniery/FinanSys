import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.categorias)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.categorias)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteCategorias = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.categorias["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Categoria deletada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["categorias"] });
      queryClient.invalidateQueries({ queryKey: ["resumo"] });
    },
    onError: () => {
      toast.error("Falha ao deletar categoria");
    },
  });

  return mutation;
};
