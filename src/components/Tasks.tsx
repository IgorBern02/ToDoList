import type { Task } from "./types/task";

type TasksProps = {
  filteredTask: Task[];
  remove: (id: number) => void;
};

export const Tasks = ({ filteredTask, remove }: TasksProps) => {
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
              <button onClick={() => remove(task.id)}>Remover</button>
            </li>
          ))
        ) : (
          <li>No todo found</li>
        )}
      </ul>
    </section>
  );
};
