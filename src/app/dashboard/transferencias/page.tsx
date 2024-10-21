"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewTransferencia } from "@/features/transferencias/hooks/use-new-transferencia";
import { useGetTransferencias } from "@/features/transferencias/api/use-get-transferencias";
import { useBulkDeleteTransferencias } from "@/features/transferencias/api/use-bulk-delete-transferencias";
import { transferencias as transferenciaSchema } from "@/db/schema";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./Colunas";
import { UploadButton } from "./BotaoUpload";
import { DataTable } from "@/components/DataTable";
import { useState } from "react";
import { ImportCard } from "./ImportarCard";
import { useSelectConta } from "@/features/contas/hooks/use-select-conta";
import { toast } from "sonner";
import { useBulkCreateTransferencias } from "@/features/transferencias/api/use-bulk-create-transferencias";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: [],
};

const TransferenciasPage = () => {
  const [ContaDialog, confirm] = useSelectConta();
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const onUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    console.log({ results });
    setImportResults(results);
    setVariant(VARIANTS.IMPORT);
  };

  const onCancelImport = () => {
    setImportResults(INITIAL_IMPORT_RESULTS);
    setVariant(VARIANTS.LIST);
  };

  const newTransferencia = useNewTransferencia();
  const createTransferencias = useBulkCreateTransferencias();
  const deleteTransferencias = useBulkDeleteTransferencias();
  const transferenciasQuery = useGetTransferencias();
  const transferencias = transferenciasQuery.data || [];

  const isDisabled =
    transferenciasQuery.isLoading || deleteTransferencias.isPending;

  const onSubmitImport = async (
    values: (typeof transferenciaSchema.$inferInsert)[]
  ) => {
    const contaId = await confirm();

    if (!contaId) {
      return toast.error("Por favor, selecione uma conta para continuar.");
    }

    const data = values.map((value) => ({
      ...value,
      contaId: contaId as string,
    }));

    createTransferencias.mutate(data, {
      onSuccess: () => {
        onCancelImport();
      },
    });
  };

  if (transferenciasQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none shadow-md dark:shadow-xl dark:shadow-gray-900">
          <CardHeader className="">
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ContaDialog />
        <ImportCard
          data={importResults.data}
          onCancel={onCancelImport}
          onSubmit={onSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none shadow-md dark:shadow-xl dark:shadow-gray-900">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Histórico de transferências
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button
              onClick={newTransferencia.onOpen}
              size="sm"
              className="w-full lg:w-auto"
            >
              <Plus className="size-4 mr-2" />
              Adicionar
            </Button>
            <UploadButton onUpload={onUpload} />
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="recebedor"
            columns={columns}
            data={transferencias}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransferencias.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransferenciasPage;
