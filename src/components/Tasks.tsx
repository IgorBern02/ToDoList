import type { TasksProps } from "../types/tasks/task";
import { Button } from "./Button";
import "../styles/index.css";

export const Tasks = ({
  filteredTask,
  openEditModal,
  openRemoveModal,
  toggleTaskDone,
}: TasksProps) => {
  const formatDateToBR = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("pt-BR");
  };

  return (
    <ul className="w-full mx-auto max-w-2xl flex flex-col list-none space-y-2 rounded-lg max-h-80 overflow-y-auto hide-scrollbar">
      {filteredTask.length > 0 ? (
        filteredTask.map((task: any) => (
          <li
            key={task.id}
            className="flex flex-col items-center bg-slate-700 p-2 rounded-lg shadow-md "
          >
            <div
              // className="w-full h-auto flex break-all gap-2 bg-slate-600 p-2 rounded-lg"
              className={`p-2 rounded-lg ${
                task.isDone
                  ? "w-full h-auto flex break-all gap-2 opacity-50 line-through bg-[repeating-linear-gradient(45deg,_#1f2937_0px,_#1f2937_10px,_#111827_10px,_#111827_20px)]"
                  : "bg-slate-700 w-full h-auto flex break-all gap-2"
              }`}
            >
              <span className="w-1/2 text-left">{task.task}</span>
              <span className="w-1/2 ">{formatDateToBR(task.date)}</span>
            </div>
            <div className="w-full flex flex-row gap-5 justify-around items-center mt-2">
              <Button
                text="Excluir"
                className="w-full mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                type="button"
                onClick={() => openRemoveModal(task.id, task.task)}
              />
              <Button
                text="Editar"
                className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                type="button"
                onClick={() => openEditModal(task.id, task.task, task.date)}
              />
              <Button
                text="Tarefa Feita"
                className="w-full mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                type="button"
                onClick={() => toggleTaskDone(task.id)}
              />
            </div>
          </li>
        ))
      ) : (
        <p>Nenhuma tarefa encontrada.</p>
      )}
    </ul>
  );
};
