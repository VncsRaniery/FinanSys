import { useOpenConta } from "@/features/contas/hooks/use-open-conta";

type Props = {
  conta: string;
  contaId: string;
};

export const ContaColumn = ({ conta, contaId }: Props) => {
  const { onOpen: onOpenConta } = useOpenConta();

  const onClick = () => {
    onOpenConta(contaId);
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {conta}
    </div>
  );
};
