import { Input } from "./Input";

type InputProps = {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

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
