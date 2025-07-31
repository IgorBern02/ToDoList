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
      <section className="bg-yellow-500 flex flex-col gap-4 p-4 rounded-lg">
        <Input
          type="text"
          placeholder={placeholder}
          value={taskValue}
          onChange={onTaskChange}
          min="2025-01-01"
          max="2030-12-31"
        />
        <Input type="date" value={dateValue} onChange={onDateChange} />
        <Button text="Adicionar Tarefa" type="submit" />
      </section>
    </>
  );
};
