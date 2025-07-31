import { Input } from "./Input";
import type { InputProps } from "../types/input/input";

export const FilterTaskInput = ({
  type,
  placeholder,
  value,
  onChange,
}: InputProps) => {
  return (
    <section className=" p-4 rounded-lg w-full mt-4 focus:outline-none focus:ring-1 focus:ring-red-700">
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </section>
  );
};
