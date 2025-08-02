import { useEffect, useState } from "react";
import "./styles/App.css";
import type { Task } from "./types/tasks/task";
import { TaskForm } from "./components/TaskForm";
import { EditModal } from "./components/EditModal";
import { RemoveModal } from "./components/RemoveModal";
import noteService from "./services/tasks";

type ModalType = "edit" | "remove" | null;

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<{
    id: string | null;
    task: string;
    date: string;
  }>({
    id: null,
    task: "",
    date: "",
  });
  const [filter, setFilter] = useState<string>("");
  const [modalType, setModalType] = useState<ModalType>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    noteService.get().then((initialTasks: Task[]) => {
      setTasks(initialTasks);
    });
  }, []);

  const resetForm = () => {
    setForm({ id: null, task: "", date: "" });
  };

  const isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    return date >= now && date.getFullYear() <= 2030;
  };

  const validateTask = (): boolean => {
    if (!form.task.trim() || !form.date.trim()) {
      setErrorMessage("Preencha a tarefa e a data.");
      return false;
    }

    if (!isValidDate(form.date)) {
      setErrorMessage("Por favor, insira uma data válida entre hoje e 2030.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateTask()) return;

    const alreadyExists = tasks.some(
      (t) =>
        t.task.trim().toLowerCase() === form.task.trim().toLowerCase() &&
        t.date === form.date
    );

    if (alreadyExists) return;

    const newId = String(Math.max(...tasks.map((t) => +t.id), 0) + 1);
    const newTask: Task = {
      id: newId,
      task: form.task,
      date: form.date,
      isDone: false,
    };

    noteService.post(newTask).then((createdTask) => {
      setTasks([...tasks, createdTask]);
      resetForm();
    });
  };

  const handleUpdate = () => {
    if (!form.id) return;

    if (!form.task.trim() || !form.date.trim()) {
      alert("Preencha a tarefa e a data.");
      return;
    }

    const updatedTask: Task = {
      id: form.id,
      task: form.task,
      date: form.date,
    };

    noteService
      .put(form.id, updatedTask)
      .then((returnedTask) => {
        setTasks(tasks.map((t) => (t.id === form.id ? returnedTask : t)));
        setModalType(null);
        resetForm();
      })
      .catch((error) => console.error("Erro:", error));
  };

  const remove = (id: string) => {
    noteService
      .remove(id)
      .then(() => {
        setTasks(tasks.filter((t) => t.id !== id));
        setModalType(null);
        resetForm();
      })
      .catch((error) => {
        console.error(error);
        setTasks(tasks.filter((t) => t.id !== id));
      });
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const filteredTask = tasks.filter((taskItem) =>
    taskItem.task.toLowerCase().includes(filter.toLowerCase())
  );

  const toggleTaskDone = (taskId: string) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) return;

    const updatedTask = { ...taskToUpdate, isDone: !taskToUpdate.isDone };

    noteService
      .put(taskId, updatedTask)
      .then((returnedTask) => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === taskId ? returnedTask : task))
        );
      })
      .catch((error) => {
        console.error("Erro ao atualizar tarefa:", error);
      });
  };

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen bg-slate-900 text-white overflow-x-hidden  ">
      <h1 className="text-5xl font-bold text-center mt-10">Todo List</h1>
      <TaskForm
        handleSubmit={handleSubmit}
        task={form.task}
        handleTaskChange={(e) => setForm({ ...form, task: e.target.value })}
        date={form.date}
        handleDateChange={(e) => setForm({ ...form, date: e.target.value })}
        filter={filter}
        handleFilter={handleFilter}
        filteredTask={filteredTask}
        remove={(id) => {
          const task = tasks.find((t) => t.id === id);
          if (task) {
            setForm({ id: task.id, task: task.task, date: "" });
            setModalType("remove");
          }
        }}
        openEditModal={(id, task, date) => {
          setForm({ id, task, date });
          setModalType("edit");
        }}
        openRemoveModal={(id, task) => {
          setForm({ id, task, date: "" });
          setModalType("remove");
        }}
        toggleTaskDone={toggleTaskDone}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />

      {modalType === "edit" && (
        <EditModal
          taskId={form.id}
          task={form.task}
          date={form.date}
          onTaskChange={(e) => setForm({ ...form, task: e.target.value })}
          onDateChange={(e) => setForm({ ...form, date: e.target.value })}
          onClose={() => {
            setModalType(null);
            resetForm();
          }}
          onSave={handleUpdate}
        />
      )}

      {modalType === "remove" && (
        <RemoveModal
          taskId={form.id}
          task={form.task}
          onClose={() => {
            setModalType(null);
            resetForm();
          }}
          onRemove={(id) => remove(id)}
        />
      )}
    </div>
  );
}

export default App;
