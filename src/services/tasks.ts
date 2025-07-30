import axios from "axios";
import type { Task } from "../types/tasks/task";

const baseUrl = "http://localhost:3001/tasks";

const get = async (): Promise<Task[]> => {
  const res = await axios.get<Task[]>(baseUrl);
  return res.data;
};

const post = async (newTask: Task): Promise<Task> => {
  const res = await axios.post<Task>(baseUrl, newTask);
  return res.data;
};

const put = async (id: string, updatedTask: Task): Promise<Task> => {
  const res = await axios.put<Task>(`${baseUrl}/${id}`, updatedTask);
  return res.data;
};

const remove = async (id: string): Promise<void> => {
  await axios.delete(`${baseUrl}/${id}`);
};

export default {
  get,
  post,
  put,
  remove,
};
