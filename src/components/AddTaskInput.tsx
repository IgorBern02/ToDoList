import { Button } from "./Button";
import { Input } from "./Input";
import type { AddTaskInputProps } from "../types/input/input";

export const AddTaskInput = ({
  taskValue,
  onTaskChange,
  dateValue,
  onDateChange,
  placeholder,
  errorMessage,
}: AddTaskInputProps) => {
  return (
    <section className="flex flex-col gap-4 p-4 rounded-lg ">
      <Input
        type="text"
        placeholder={placeholder}
        value={taskValue}
        onChange={onTaskChange}
        min="2025-01-01"
        max="2030-12-31"
        className="w-full p-2 rounded overflow-hidden text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <Input
        type="date"
        value={dateValue}
        onChange={onDateChange}
        className="w-full p-2 rounded overflow-hidden cursor-text text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <Button
        text="Adicionar Tarefa"
        type="submit"
        className="bg-green-600 text-white px-4 py-2 overflow-hidden rounded outline-none hover:bg-green-700 focus:outline-none transition-colors duration-300"
      />
    </section>
  );
};
