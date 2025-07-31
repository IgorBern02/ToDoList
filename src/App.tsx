import { useEffect, useState } from "react";
import "./App.css";
import type { Task } from "./types/tasks/task";
import { TaskForm } from "./components/TaskForm";
import { EditModal } from "./components/EditModal";
import noteService from "./services/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);

  useEffect(() => {
    noteService.get().then((initialTasks: Task[]) => {
      setTasks(initialTasks);
    });
  }, []);

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    return date >= now && date.getFullYear() <= 2030;
  };

  const validateTask = (): boolean => {
    if (!task.trim() || !date.trim()) {
      alert("Preencha a tarefa e a data.");
      return false;
    }

    if (!isValidDate(date)) {
      alert("Por favor, insira uma data válida entre 2025 e 2030.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const maxId = Math.max(...tasks.map((t) => parseInt(t.id)), 0);
    const newId = (maxId + 1).toString(); // Convertendo para string

    const newTask: Task = {
      id: newId, // Agora é string
      task,
      date,
    };

    const existingTask = tasks.find(
      (t) =>
        t.task.trim().toLowerCase() === task.trim().toLowerCase() &&
        t.date === date
    );

    // if (!task.trim() || !date.trim()) {
    //   alert("Preencha a tarefa e a data.");
    //   return;
    // }

    // if (!isValidDate(date)) {
    //   alert("Por favor, insira uma data válida entre 2025 e 2030.");
    //   return;
    // }
    if (!validateTask()) return;

    if (!existingTask) {
      noteService.post(newTask).then((createdTask) => {
        setTasks([...tasks, createdTask]);
        setTask("");
        setDate("");
      });
    }
  };

  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredTask = tasks.filter((taskItem) =>
    taskItem.task.toLowerCase().includes(filter.toLowerCase())
  );

  const openEditModal = (id: string, task: string, date: string) => {
    setEditTaskId(id);
    setTask(task);
    setDate(date);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (!editTaskId) return;

    if (!task.trim() || !date.trim()) {
      alert("Preencha a tarefa e a data.");
      return;
    }

    const updatedTask: Task = {
      id: editTaskId.toString(),
      task,
      date,
    };

    noteService
      .put(updatedTask.id, updatedTask)
      .then((returnedTask) => {
        setTasks(
          tasks.map((t) => (t.id === updatedTask.id ? returnedTask : t))
        );
        setIsModalOpen(false);
      })
      .catch((error) => console.error("Erro:", error));
  };

  const remove = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    const confirm = window.confirm(`Deletar ${task.task}?`);
    if (!confirm) return;

    noteService
      .remove(id)
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
      })
      .catch((error) => {
        console.error(error);
        setTasks(tasks.filter((t) => t.id !== id));
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-slate-900 text-white overflow-x-hidden  ">
      <h1 className="text-5xl font-bold text-center mt-10">Todo List</h1>
      <TaskForm
        handleSubmit={handleSubmit}
        task={task}
        handleTaskChange={handleTodoChange}
        date={date}
        handleDateChange={handleDateChange}
        filter={filter}
        handleFilter={handleFilter}
        filteredTask={filteredTask}
        remove={remove}
        put={() => {}}
        openEditModal={openEditModal}
      />

      {isModalOpen && (
        <EditModal
          taskId={editTaskId}
          task={task}
          date={date}
          onTaskChange={handleTodoChange}
          onDateChange={handleDateChange}
          onClose={() => setIsModalOpen(false)}
          onSave={handleUpdate}
        />
      )}
    </div>
  );
}

export default App;
