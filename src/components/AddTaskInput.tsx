import { Button } from "./Button";
import { Input } from "./Input";
import type { AddTaskInputProps } from "../types/input/input";

export const AddTaskInput = ({
  taskValue,
  onTaskChange,
  dateValue,
  onDateChange,
  placeholder,
}: AddTaskInputProps) => {
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
