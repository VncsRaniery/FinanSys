import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewConta } from "../hooks/use-new-conta";
import { ContaForm } from "@/features/contas/components/conta-form";
import { inserirContaSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateConta } from "../api/use-create-conta";

const formSchema = inserirContaSchema.pick({
  nome: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewContaSheet = () => {
  const { isOpen, onClose } = useNewConta();

  const mutation = useCreateConta();

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
          <SheetTitle>Nova conta</SheetTitle>
          <SheetDescription>
            Crie uma nova conta para rastrear suas transferências.
          </SheetDescription>
        </SheetHeader>
        <ContaForm
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
