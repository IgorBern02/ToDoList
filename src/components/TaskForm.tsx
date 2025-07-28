import type { Task } from "./types/task";
import { AddTaskInput } from "./AddTaskInput";
import { FilterTaskInput } from "./FilterTaskInput";
import { Tasks } from "./Tasks";

type TaskFormProps = {
  handleSubmit: (e: React.FormEvent) => void;
  task: string;
  handleTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  date: string;
  handleDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filter: string;
  filteredTask: Task[];
};

export const TaskForm = ({
  handleSubmit,
  task,
  handleTaskChange,
  date,
  handleDateChange,
  handleFilter,
  filter,
  filteredTask,
}: TaskFormProps) => (
  <form onSubmit={handleSubmit}>
    <AddTaskInput
      taskValue={task}
      onTaskChange={handleTaskChange}
      dateValue={date}
      onDateChange={handleDateChange}
      placeholder="Adicionar tarefa"
    />

    <FilterTaskInput
      type={"text"}
      placeholder={"Filtrar"}
      onChange={handleFilter}
      value={filter}
    />

    <Tasks filteredTask={filteredTask} />
  </form>
);
