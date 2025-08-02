import type { buttonProps } from "../types/button/button";

export const Button = ({ text, type, onClick, className }: buttonProps) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {text}
    </button>
  );
};
