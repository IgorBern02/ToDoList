import { Input } from "./Input";
import type { InputProps } from "../types/input/input";

export const FilterTaskInput = ({
  type,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <section>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </section>
  );
};
