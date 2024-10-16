import { useOpenCategoria } from "@/features/categorias/hooks/use-open-categoria";
import { useOpenTransferencia } from "@/features/transferencias/hooks/use-open-transferencia";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

type Props = {
  id: string;
  categoria: string | null;
  categoriaId: string | null;
};

export const CategoriaColumn = ({ id, categoria, categoriaId }: Props) => {
  const { onOpen: onOpenCategoria } = useOpenCategoria();
  const { onOpen: onOpenTransferencia } = useOpenTransferencia();

  const onClick = () => {
    if (categoriaId) {
      onOpenCategoria(categoriaId);
    } else {
      onOpenTransferencia(id);
    }
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !categoria && "text-rose-500"
      )}
    >
      {!categoria && <TriangleAlert className="mr-2 size-4 shrink-0" />}
      {categoria || "Sem categoria"}
    </div>
  );
};
