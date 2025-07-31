import type { InputProps } from "../types/input/input";

export const Input = ({
  type,
  placeholder,
  value,
  onChange,
  min,
  max,
  className,
}: InputProps) => {
  return (
    <div className="mb-4 w-full max-w-md mx-auto">
      <input
        // className="w-full p-2 rounded overflow-hidden text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        className={className}
      />
    </div>
  );
};
