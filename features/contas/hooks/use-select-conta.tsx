import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetContas } from "../api/use-get-contas";
import { useCreateConta } from "../api/use-create-conta";
import { Select } from "@/components/Select";

export const useSelectConta = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
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

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const selectValue = useRef<string>();

  const confirm = () =>
    new Promise((resolve, reject) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);
    handleClose();
  };

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecionar conta</DialogTitle>
          <DialogDescription>
            Por favor, selecione uma conta para continuar.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Selecione uma conta"
          options={contaOptions}
          onCreate={onCreateConta}
          onChange={(value) => (selectValue.current = value)}
          disabled={contaQuery.isLoading || contaMutation.isPending}
        />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline">
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfirmationDialog, confirm];
};
