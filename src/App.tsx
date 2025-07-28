import { useEffect, useState } from "react";
import "./App.css";
import type { Task } from "./components/types/task";
import { TaskForm } from "./components/TaskForm";
import noteService from "./services/tasks";

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, task: "Aprender a programar", date: "2002-11-20" },
    { id: 2, task: "Aprender a programar JavaScript", date: "2025-10-11" },
    { id: 3, task: "Aprender a programar Python", date: "2025-04-12" },
  ]);
  const [task, setTask] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    noteService.get().then((initialTasks: Task[]) => {
      setTasks(initialTasks);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: Task = {
      id: tasks.length + 1,
      task: task,
      date: date,
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
    } else {
      alert(`A tarefa "${task}" já existe na data ${date}`);
      return;
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

  const remove = (id: number) => {
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
      />
    </>
  );
}

export default App;
