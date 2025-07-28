import type { Task } from "./types/task";

type TasksProps = {
  filteredTask: Task[];
};

export const Tasks = ({ filteredTask }: TasksProps) => {
  return (
    <section>
      <ul>
        {filteredTask.length > 0 ? (
          filteredTask.map((todo: any) => (
            <li key={todo.id}>
              {todo.todo} - {todo.date}
            </li>
          ))
        ) : (
          <li>No todo found</li>
        )}
      </ul>
    </section>
  );
};
