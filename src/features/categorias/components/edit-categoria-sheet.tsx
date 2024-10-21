import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CategoriaForm } from "@/features/categorias/components/categoria-form";
import { inserirCategoriaSchema } from "@/db/schema";
import { z } from "zod";
import { useOpenCategoria } from "../hooks/use-open-categoria";
import { useGetCategoria } from "../api/use-get-categoria";
import { useEditCategoria } from "../api/use-edit-categoria";
import { useDeleteCategoria } from "../api/use-delete-categoria";
import { Loader2 } from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";

const formSchema = inserirCategoriaSchema.pick({
  nome: true,
});

type FormValues = z.input<typeof formSchema>;

export const EditCategoriaSheet = () => {
  const { isOpen, onClose, id } = useOpenCategoria();

  const [ConfirmDialog, confirm] = useConfirm(
    "Tem certeza que deseja excluir esta categoria?",
    "Esta ação não pode ser desfeita."
  );

  const categoriaQuery = useGetCategoria(id);
  const editMutation = useEditCategoria(id);
  const deleteMutation = useDeleteCategoria(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = categoriaQuery.isLoading;

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

  const defaultValues = categoriaQuery.data
    ? {
        nome: categoriaQuery.data.nome,
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
            <SheetTitle>Editar categoria</SheetTitle>
            <SheetDescription>Editar uma categoria existente.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoriaForm
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
