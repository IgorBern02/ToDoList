export type buttonProps = {
  text: string;
  type: "submit" | "reset" | "button";
  onClick?: () => void;
  className?: string;
};
