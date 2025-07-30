import type { TaskFormProps } from "../types/tasks/task";
import { AddTaskInput } from "./AddTaskInput";
import { FilterTaskInput } from "./FilterTaskInput";
import { Tasks } from "./Tasks";

export const TaskForm = ({
  handleSubmit,
  task,
  handleTaskChange,
  date,
  handleDateChange,
  handleFilter,
  filter,
  filteredTask,
  remove,
  put,
  openEditModal,
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

    <Tasks
      filteredTask={filteredTask}
      remove={remove}
      put={put}
      openEditModal={openEditModal}
    />
  </form>
);
