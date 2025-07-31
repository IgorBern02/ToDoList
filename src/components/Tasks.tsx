import type { TasksProps } from "../types/tasks/task";
import "../index.css";

export const Tasks = ({ filteredTask, remove, openEditModal }: TasksProps) => {
  const formatDateToBR = (isoDate: string) => {
    return new Date(isoDate).toLocaleDateString("pt-BR");
  };

  return (
    // <section className="p-2 rounded-lg w-4/5 flex flex-col items-center justify-center bg-red-400 w-full mx-auto max-w-2xl">
    <ul className="w-full mx-auto max-w-2xl flex flex-col list-none space-y-2 rounded-lg max-h-80 overflow-y-auto hide-scrollbar">
      {filteredTask.length > 0 ? (
        filteredTask.map((task: any) => (
          <li
            key={task.id}
            className="flex flex-col justify-between items-center bg-slate-700 p-2 rounded-lg shadow-md "
          >
            <div className="w-full h-auto flex  break-all gap-2 bg-slate-600 p-2 rounded-lg">
              <span className="w-1/2">{task.task}</span>
              <span className="w-1/2 text-right">
                {formatDateToBR(task.date)}
              </span>
            </div>
            <div className="w-full flex flex-row gap-5 justify-around items-center mt-2">
              <button
                className="w-full mt-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                type="button"
                onClick={() => remove(task.id)}
              >
                Excluir
              </button>
              <button
                className="w-full mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => openEditModal(task.id, task.task, task.date)}
              >
                Editar
              </button>
            </div>
          </li>
        ))
      ) : (
        <p>Nenhuma tarefa encontrada.</p>
      )}
    </ul>
  );
};
