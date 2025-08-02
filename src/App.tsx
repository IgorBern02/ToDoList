import { useEffect, useState } from "react";
import "./styles/App.css";
import type { Task } from "./types/tasks/task";
import { TaskForm } from "./components/TaskForm";
import { EditModal } from "./components/EditModal";
import { RemoveModal } from "./components/RemoveModal";
import noteService from "./services/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isRemoveModal, setIsRemoveModal] = useState(false);

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
      setErrorMessage("Preencha a tarefa e a data.");
      return false;
    }

    if (!isValidDate(date)) {
      setErrorMessage("Por favor, insira uma data válida entre hoje e 2030.");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const maxId = Math.max(...tasks.map((t) => parseInt(t.id)), 0);
    const newId = (maxId + 1).toString();

    const newTask: Task = {
      id: newId,
      task,
      date,
    };

    const existingTask = tasks.find(
      (t) =>
        t.task.trim().toLowerCase() === task.trim().toLowerCase() &&
        t.date === date
    );

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

  const openRemoveModal = (id: string, task: string) => {
    setEditTaskId(id);
    setTask(task);
    setIsRemoveModal(true);
  };

  const remove = (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    noteService
      .remove(id)
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
        setIsRemoveModal(true);
        setIsRemoveModal(false);
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
        // put={() => {}}
        openEditModal={openEditModal}
        openRemoveModal={openRemoveModal}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
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

      {isRemoveModal && (
        <RemoveModal
          taskId={editTaskId}
          task={task}
          onClose={() => setIsRemoveModal(false)}
          onRemove={remove}
        />
      )}
    </div>
  );
}

export default App;
