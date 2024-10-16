import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewTransferencia } from "../hooks/use-new-transferencia";
import { inserirTransferenciaSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateTransferencia } from "../api/use-create-transferencia";
import { useCreateCategoria } from "@/features/categorias/api/use-create-categoria";
import { useGetCategorias } from "@/features/categorias/api/use-get-categorias";
import { useGetContas } from "@/features/contas/api/use-get-contas";
import { useCreateConta } from "@/features/contas/api/use-create-conta";
import { TransferenciaForm } from "./transferencia-form";
import { Loader2 } from "lucide-react";

const formSchema = inserirTransferenciaSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewTransferenciaSheet = () => {
  const { isOpen, onClose } = useNewTransferencia();

  const createMutation = useCreateTransferencia();

  const categoriaQuery = useGetCategorias();
  const categoriaMutation = useCreateCategoria();
  const onCreateCategoria = (nome: string) =>
    categoriaMutation.mutate({
      nome,
    });
  const categoriaOptions = (categoriaQuery.data ?? []).map((categoria) => ({
    label: categoria.nome,
    value: categoria.id,
  }));

  const contaQuery = useGetContas();
  const contaMutation = useCreateConta();
  const onCreateConta = (nome: string) =>
    contaMutation.mutate({
      nome,
    });
  const contaOptions = (contaQuery.data ?? []).map((conta) => ({
    label: conta.nome,
    value: conta.id,
  }));

  const isPending =
    createMutation.isPending ||
    categoriaMutation.isPending ||
    contaMutation.isPending;

  const isLoading = categoriaQuery.isLoading || contaQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Nova transferência</SheetTitle>
          <SheetDescription>Adicionar uma nova transferência.</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransferenciaForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoriaOptions={categoriaOptions}
            onCreateCategoria={onCreateCategoria}
            contaOptions={contaOptions}
            onCreateConta={onCreateConta}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
