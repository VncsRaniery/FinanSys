import { useMemo, useEffect, useState } from "react";
import {
  Select as ShadSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  onChange: (value?: string) => void;
  onCreate?: (value: string) => void;
  options?: { label: string; value: string }[];
  value?: string | null | undefined;
  disabled?: boolean;
  placeholder?: string;
};

export const Select = ({
  value,
  onChange,
  disabled,
  onCreate,
  options = [],
  placeholder,
}: Props) => {

  const formattedValue = useMemo(() => {
    return options.find((option) => option.value === value)?.label || "";
  }, [options, value]);

  return (
    <ShadSelect
      onValueChange={(val) =>
        onChange(options.find((option) => option.label === val)?.value)
      }
    >
      <SelectTrigger
        className="text-sm h-10 bg-transparent"
      >
        <SelectValue placeholder={placeholder} defaultValue={formattedValue} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.label}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </ShadSelect>
  );
};
