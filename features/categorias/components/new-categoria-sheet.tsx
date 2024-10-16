import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewCategoria } from "../hooks/use-new-categoria";
import { CategoriaForm } from "@/features/categorias/components/categoria-form";
import { inserirCategoriaSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateCategoria } from "../api/use-create-categoria";

const formSchema = inserirCategoriaSchema.pick({
  nome: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewCategoriaSheet = () => {
  const { isOpen, onClose } = useNewCategoria();

  const mutation = useCreateCategoria();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Nova categoria</SheetTitle>
          <SheetDescription>
            Crie uma nova categoria para rastrear suas transferências.
          </SheetDescription>
        </SheetHeader>
        <CategoriaForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            nome: "",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
