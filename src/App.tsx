import { useEffect, useState } from "react";
import "./App.css";
import type { Task } from "./types/tasks/task";
import { TaskForm } from "./components/TaskForm";
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

    if (!task.trim() || !date.trim()) {
      alert("Preencha a tarefa e a data.");
      return;
    }

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
    // id como string
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
      id: editTaskId.toString(), // Garante que o ID seja string
      task,
      date,
    };

    noteService
      .put(updatedTask.id, updatedTask) // Envia o ID como string
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
    <>
      <h1>Todo List</h1>
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
        <div className="modal">
          <div className="modal-content">
            <h2>Editar tarefa</h2>
            <p>ID da tarefa: {editTaskId}</p>
            <label>
              Tarefa:
              <input type="text" value={task} onChange={handleTodoChange} />
            </label>
            <label>
              Data:
              <input type="date" value={date} onChange={handleDateChange} />
            </label>
            <div style={{ marginTop: "1rem" }}>
              <button type="button" onClick={handleUpdate}>
                Salvar
              </button>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
