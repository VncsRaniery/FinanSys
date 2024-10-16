"use client";

import { useMountedState } from "react-use";

import { NewContaSheet } from "@/features/contas/components/new-conta-sheet";
import { EditContaSheet } from "@/features/contas/components/edit-conta-sheet";

import { NewCategoriaSheet } from "@/features/categorias/components/new-categoria-sheet";
import { EditCategoriaSheet } from "@/features/categorias/components/edit-categoria-sheet";

import { NewTransferenciaSheet } from "@/features/transferencias/components/new-transferencia-sheet";
import { EditTransferenciaSheet } from "@/features/transferencias/components/edit-transferencia-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return null;

  return (
    <>
      <NewContaSheet />
      <EditContaSheet />

      <NewCategoriaSheet />
      <EditCategoriaSheet />

      <NewTransferenciaSheet />
      <EditTransferenciaSheet />
    </>
  );
};
