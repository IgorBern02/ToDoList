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
  openRemoveModal,
  // put,
  openEditModal,
  errorMessage,
}: TaskFormProps) => (
  <form
    onSubmit={handleSubmit}
    className="p-4 rounded-lg w-full mt-10 grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
  >
    <section className="bg-slate-800 p-3 rounded-lg w-full max-w-md mx-auto sm:col-span-1 md:col-span-2 lg:col-span-1">
      <AddTaskInput
        taskValue={task}
        onTaskChange={handleTaskChange}
        dateValue={date}
        onDateChange={handleDateChange}
        placeholder="Adicionar tarefa"
        errorMessage={errorMessage}
      />
    </section>

    <section className="bg-slate-800 p-3 rounded-lg sm:col-span-2 gap-5 flex flex-col">
      <FilterTaskInput
        type={"text"}
        placeholder={"Filtrar"}
        onChange={handleFilter}
        value={filter}
      />

      <Tasks
        filteredTask={filteredTask}
        openRemoveModal={openRemoveModal}
        openEditModal={openEditModal}
      />
    </section>
  </form>
);
