import type { InputProps } from "../types/input/input";

export const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
