import { useEffect, useState } from "react";
import "./App.css";
import type { Task } from "./components/types/task";
import { TaskForm } from "./components/TaskForm";
import axios from "axios";

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
    axios.get("http://localhost:3001/todos").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: Task = {
      id: tasks.length + 1,
      task: task,
      date: date,
    };

    const existingTask = tasks.find((t) => t.task === task && t.date === date);

    if (!existingTask) {
      axios.post("http://localhost:3001/todos", newTodo).then(() => {
        setTasks([...tasks, newTodo]);
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

  const filteredTask = tasks.filter((todo) =>
    todo.task.toLowerCase().includes(filter.toLowerCase())
  );

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
      />
    </>
  );
}

export default App;
