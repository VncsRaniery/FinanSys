import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings } from "lucide-react";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import { FormPorcentagem } from "./PercentualForm";

interface SheetDemoProps {
  onPercentuaisChange: (percentuais: any) => void;
}

export function SheetDemo({ onPercentuaisChange }: SheetDemoProps) {
  const [percentuais, setPercentuais] = useState({
    custosFixos: 35,
    conforto: 15,
    metas: 10,
    prazeres: 10,
    liberdadeFinanceira: 25,
    conhecimento: 5,
  });

  const handleFormSubmit = (data: any) => {
    setPercentuais(data);
    onPercentuaisChange(data);
    toast.success("Percentuais atualizados com sucesso!");
  };

  return (
    <>
      <Toaster />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="p-2">
            <Settings className="w-5 h-5" />
          </Button>
        </SheetTrigger>

        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Editar porcentagens</SheetTitle>
            <SheetDescription>
              Ajuste os valores das porcentagens conforme suas necessidades
              atuais.
            </SheetDescription>
          </SheetHeader>
          <FormPorcentagem
            percentuais={percentuais}
            onSubmit={handleFormSubmit}
          />
        </SheetContent>
      </Sheet>
    </>
  );
}
