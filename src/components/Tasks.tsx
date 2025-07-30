import type { TasksProps } from "../types/tasks/task";

export const Tasks = ({ filteredTask, remove, openEditModal }: TasksProps) => {
  return (
    <section>
      <ul>
        {filteredTask.length > 0 ? (
          filteredTask.map((task: any) => (
            <li key={task.id}>
              <div>
                <span>{task.task}</span>
                <span>{task.date}</span>
              </div>
              <button type="button" onClick={() => remove(task.id)}>
                Excluir
              </button>
              <button
                onClick={() => openEditModal(task.id, task.task, task.date)}
              >
                Editar
              </button>
            </li>
          ))
        ) : (
          <p>Nenhuma tarefa encontrada.</p>
        )}
      </ul>
    </section>
  );
};
