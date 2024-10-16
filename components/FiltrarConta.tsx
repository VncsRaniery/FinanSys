"use client";

import qs from "query-string";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useGetResumo } from "@/features/resumo/api/use-get-resumo";
import { useGetContas } from "@/features/contas/api/use-get-contas";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FiltrarConta() {
  const router = useRouter();
  const pathname = usePathname();

  const params = useSearchParams();
  const contaId = params.get("contaId") || "all";
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const { isLoading: isLoadingResumo } = useGetResumo();
  const { data: contas, isLoading: isLoadingContas } = useGetContas();

  const onChange = (newValue: string) => {
    const query = {
      contaId: newValue,
      from,
      to,
    };

    if (newValue === "all") {
      query.contaId = "";
    }

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query,
      },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  return (
    <Select
      value={contaId}
      onValueChange={onChange}
      disabled={isLoadingContas || isLoadingResumo}
    >
      <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal">
        <SelectValue placeholder="Selecione uma conta" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Todas as contas</SelectItem>
        {contas?.map((conta) => (
          <SelectItem key={conta.id} value={conta.id}>
            {conta.nome}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
