import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import { useEffect } from "react";

const percentuaisSchema = z.object({
  custosFixos: z.number().min(0).max(100).optional(),
  conforto: z.number().min(0).max(100).optional(),
  metas: z.number().min(0).max(100).optional(),
  prazeres: z.number().min(0).max(100).optional(),
  liberdadeFinanceira: z.number().min(0).max(100).optional(),
  conhecimento: z.number().min(0).max(100).optional(),
});

type PercentuaisForm = z.infer<typeof percentuaisSchema>;

interface FormPorcentagemProps {
  percentuais: PercentuaisForm;
  onSubmit: (data: PercentuaisForm) => void;
}

export function FormPorcentagem({ onSubmit }: FormPorcentagemProps) {
  const { register, handleSubmit, setValue, watch } =
    useForm<PercentuaisForm>();

  const valores = watch();

  const calcularSomaTotal = (valores: PercentuaisForm) => {
    return (
      (valores.custosFixos || 0) +
      (valores.conforto || 0) +
      (valores.metas || 0) +
      (valores.prazeres || 0) +
      (valores.liberdadeFinanceira || 0) +
      (valores.conhecimento || 0)
    );
  };

  useEffect(() => {
    const soma = calcularSomaTotal(valores);
    if (soma > 100) {
      toast.error("A soma dos percentuais não pode ultrapassar 100%");
    }
  }, [valores]);

  const handleFormSubmit = (data: PercentuaisForm) => {
    const soma = calcularSomaTotal(data);
    if (soma <= 100) {
      onSubmit(data);
    }
  };

  const resetValues = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setValue("custosFixos", undefined);
    setValue("conforto", undefined);
    setValue("metas", undefined);
    setValue("prazeres", undefined);
    setValue("liberdadeFinanceira", undefined);
    setValue("conhecimento", undefined);
  };

  const setRecommendedValues = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setValue("custosFixos", 35);
    setValue("conforto", 15);
    setValue("metas", 10);
    setValue("prazeres", 10);
    setValue("liberdadeFinanceira", 25);
    setValue("conhecimento", 5);
  };

  const somaTotal = calcularSomaTotal(valores);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
      <div className="flex flex-col space-y-2">
        <Label htmlFor="custos-fixos">Custos Fixos</Label>
        <Input
          id="custos-fixos"
          {...register("custosFixos", { valueAsNumber: true })}
          type="text"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="conforto">Conforto</Label>
        <Input
          id="conforto"
          {...register("conforto", { valueAsNumber: true })}
          type="text"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="metas">Metas</Label>
        <Input
          id="metas"
          {...register("metas", { valueAsNumber: true })}
          type="text"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="prazeres">Prazeres</Label>
        <Input
          id="prazeres"
          {...register("prazeres", { valueAsNumber: true })}
          type="text"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="liberdade-financeira">Liberdade Financeira</Label>
        <Input
          id="liberdade-financeira"
          {...register("liberdadeFinanceira", { valueAsNumber: true })}
          type="text"
        />
      </div>
      <div className="flex flex-col space-y-2">
        <Label htmlFor="conhecimento">Conhecimento</Label>
        <Input
          id="conhecimento"
          {...register("conhecimento", { valueAsNumber: true })}
          type="text"
        />
      </div>

      <div className="mt-4">
        <strong>Soma total: {somaTotal}%</strong>
      </div>

      <SheetClose asChild>
        <Button className="w-full" type="submit" disabled={somaTotal > 100}>
          Salvar alterações
        </Button>
      </SheetClose>
      <Button
        className="w-full"
        type="button"
        variant="outline"
        onClick={setRecommendedValues}
      >
        <RotateCw className="size-4 mr-2" />
        Recomendação
      </Button>
      <Button
        className="w-full"
        type="button"
        variant="outline"
        onClick={resetValues}
      >
        <RotateCw className="size-4 mr-2" />
        Resetar valores
      </Button>
    </form>
  );
}
