import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TransferenciaForm } from "@/features/transferencias/components/transferencia-form";
import { inserirTransferenciaSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenTransferencia } from "../hooks/use-open-transferencia";
import { useGetTransferencia } from "../api/use-get-transferencia";
import { useEditTransferencia } from "../api/use-edit-transferencia";
import { useDeleteTransferencia } from "../api/use-delete-transferencia";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { useGetCategorias } from "@/features/categorias/api/use-get-categorias";
import { useCreateCategoria } from "@/features/categorias/api/use-create-categoria";
import { useGetContas } from "@/features/contas/api/use-get-contas";
import { useCreateConta } from "@/features/contas/api/use-create-conta";

const formSchema = inserirTransferenciaSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditTransferenciaSheet = () => {
  const { isOpen, onClose, id } = useOpenTransferencia();

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja excluir esta transferência?",
    "Esta ação não pode ser desfeita."
  );

  const transferenciaQuery = useGetTransferencia(id);
  const editMutation = useEditTransferencia(id);
  const deleteMutation = useDeleteTransferencia(id);

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
    editMutation.isPending ||
    deleteMutation.isPending ||
    transferenciaQuery.isLoading ||
    categoriaMutation.isPending ||
    contaMutation.isPending;

  const isLoading =
    transferenciaQuery.isLoading ||
    categoriaQuery.isLoading ||
    contaQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = transferenciaQuery.data
    ? {
        contaId: transferenciaQuery.data.contaId,
        categoriaId: transferenciaQuery.data.categoriaId,
        valor: transferenciaQuery.data.valor.toString(),
        data: transferenciaQuery.data.data
          ? new Date(transferenciaQuery.data.data)
          : new Date(),
        recebedor: transferenciaQuery.data.recebedor,
        notas: transferenciaQuery.data.notas,
      }
    : {
        contaId: "",
        categoriaId: "",
        valor: "",
        data: new Date(),
        recebedor: "",
        notas: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar transferência</SheetTitle>
            <SheetDescription>
              Editar uma transferência existente.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <TransferenciaForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              onDelete={onDelete}
              disabled={isPending}
              categoriaOptions={categoriaOptions}
              onCreateCategoria={onCreateCategoria}
              contaOptions={contaOptions}
              onCreateConta={onCreateConta}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
