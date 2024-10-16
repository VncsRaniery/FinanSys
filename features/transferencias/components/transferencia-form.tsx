import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { inserirTransferenciaSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select } from "@/components/Select";
import { DatePicker } from "@/components/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { ValorInput } from "@/components/ValorInput";
import { convertValorToMiliunits } from "@/lib/utils";

const formSchema = z.object({
  data: z.coerce.date(),
  contaId: z.string(),
  categoriaId: z.string().nullable().optional(),
  recebedor: z.string(),
  valor: z.string(),
  notas: z.string().nullable().optional(),
});

const apiSchema = inserirTransferenciaSchema.omit({
  id: true,
});

type FormValues = z.input<typeof formSchema>;
type ApiFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: ApiFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  contaOptions: { label: string; value: string }[];
  categoriaOptions: { label: string; value: string }[];
  onCreateConta: (name: string) => void;
  onCreateCategoria: (name: string) => void;
};

export const TransferenciaForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  contaOptions,
  categoriaOptions,
  onCreateConta,
  onCreateCategoria,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    const valor = parseFloat(values.valor);
    const valorInMiliunits = convertValorToMiliunits(valor);

    onSubmit({
      ...values,
      valor: valorInMiliunits,
    });
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="data"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <DatePicker
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="contaId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Conta</FormLabel>
              <FormControl>
                <Select
                  placeholder="Selecione uma conta"
                  options={contaOptions}
                  onCreate={onCreateConta}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="categoriaId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select
                  placeholder="Selecione uma categoria"
                  options={categoriaOptions}
                  onCreate={onCreateCategoria}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="recebedor"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recebedor</FormLabel>
              <FormControl>
                <Input
                  disabled={disabled}
                  placeholder="Adicionar um recebedor"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="valor"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor</FormLabel>
              <FormControl>
                <ValorInput {...field} disabled={disabled} placeholder="0.00" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="notas"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notas</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  disabled={disabled}
                  placeholder="Adicione uma nota (opcional)"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button className="w-full" disabled={disabled}>
          {id ? "Salvar alterações" : "Informar transferência"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Deletar transferência
          </Button>
        )}
      </form>
    </Form>
  );
};
