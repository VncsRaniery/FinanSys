import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ContaForm } from "@/features/contas/components/conta-form";
import { inserirContaSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenConta } from "../hooks/use-open-conta";
import { useGetConta } from "../api/use-get-conta";
import { useEditConta } from "../api/use-edit-conta";
import { useDeleteConta } from "../api/use-delete-conta";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = inserirContaSchema.pick({
  nome: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditContaSheet = () => {
  const { isOpen, onClose, id } = useOpenConta();

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja excluir esta conta?",
    "Esta ação não pode ser desfeita."
  );

  const contaQuery = useGetConta(id);
  const editMutation = useEditConta(id);
  const deleteMutation = useDeleteConta(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = contaQuery.isLoading;

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

  const defaultValues = contaQuery.data
    ? {
        nome: contaQuery.data.nome,
      }
    : {
        nome: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar conta</SheetTitle>
            <SheetDescription>Editar uma conta existente.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <ContaForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
