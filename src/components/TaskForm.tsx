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
  <form
    onSubmit={handleSubmit}
    className="bg-green-900 p-4 rounded-lg w-full mt-10 grid grid-cols-3 gap-10"
  >
    <section className="bg-red-500 p-3 rounded-lg w-full max-w-md mx-auto">
      <AddTaskInput
        taskValue={task}
        onTaskChange={handleTaskChange}
        dateValue={date}
        onDateChange={handleDateChange}
        placeholder="Adicionar tarefa"
      />
    </section>

    <section className="bg-red-700 p-3 rounded-lg  col-span-2 gap-5 flex flex-col rounded-lg">
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
    </section>
  </form>
);
