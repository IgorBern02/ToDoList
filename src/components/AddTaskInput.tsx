import { Button } from "./Button";
import { Input } from "./Input";

type Props = {
  taskValue: string;
  onTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateValue: string;
  onDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const AddTaskInput = ({
  taskValue,
  onTaskChange,
  dateValue,
  onDateChange,
  placeholder,
}: Props) => {
  return (
    <>
      <section>
        <Input
          type="text"
          placeholder={placeholder}
          value={taskValue}
          onChange={onTaskChange}
        />
        <Input type="date" value={dateValue} onChange={onDateChange} />
        <Button text="Adicionar Tarefa" type="submit" />
      </section>
    </>
  );
};
