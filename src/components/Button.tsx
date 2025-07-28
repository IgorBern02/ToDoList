type buttonProps = {
  text: string;
  type: "submit" | "reset" | "button";
};

export const Button = ({ text, type }: buttonProps) => {
  return <button type={type}>{text}</button>;
};
