type buttonProps = {
  text: string;
  type: "submit" | "reset" | "button";
};

export const Button = ({ text, type }: buttonProps) => {
  return (
    <button
      type={type}
      className="bg-green-600 text-white p-2 overflow-hidden rounded outline-none hover:bg-green-700 focus:outline-none focus:bg-purple-700 transition-colors duration-300"
    >
      {text}
    </button>
  );
};
