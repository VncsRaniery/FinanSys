"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewConta } from "@/features/contas/hooks/use-new-conta";
import { useGetContas } from "@/features/contas/api/use-get-contas";
import { useBulkDeleteContas } from "@/features/contas/api/use-bulk-delete-contas";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./Colunas";
import { DataTable } from "@/components/DataTable";

const ContasPage = () => {
  const newConta = useNewConta();
  const deleteContas = useBulkDeleteContas();
  const contasQuery = useGetContas();
  const contas = contasQuery.data || [];

  const isDisabled = contasQuery.isLoading || deleteContas.isPending;

  if (contasQuery.isLoading) {
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

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none shadow-md dark:shadow-xl dark:shadow-gray-900">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Página de contas
          </CardTitle>
          <Button onClick={newConta.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Adicionar
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="nome"
            columns={columns}
            data={contas}
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteContas.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContasPage;
