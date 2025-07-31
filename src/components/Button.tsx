type buttonProps = {
  text: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  className?: string;
};

export const Button = ({ text, type, onClick, className }: buttonProps) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {text}
    </button>
  );
};
