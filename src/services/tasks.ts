import axios from "axios";
import type { Task } from "../components/types/task";

const baseUrl = "http://localhost:3001/tasks"; // ✅ Corrigido: "http"

const get = () => {
  return axios.get(baseUrl).then((res) => res.data);
};

const post = (newTask: Task) => {
  return axios.post(baseUrl, newTask).then((res) => res.data);
};

const remove = (id: number) => {
  return axios.delete(`${baseUrl}/${id}`).then((res) => res.data);
};

export default {
  get,
  post,
  remove,
};
