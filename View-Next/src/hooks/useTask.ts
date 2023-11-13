import axios from "axios";
import { useEffect, useState } from "react";

export type task = {
  _id: string;
  name: string;
  done: boolean;
  checklist: string;
  checklistName: string;
};

const url = "http://localhost:8080/checklist/task";

function useTask() {
  const [tasks, setTasks] = useState<task[]>([] as task[]);

  const fetchData = async () => {
    try {
      const tasks = await getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function getTasks() {
    const tasks: task[] = await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => console.log(error));
    console.table(tasks);
    return tasks;
  }

  async function createTask(name: string, checklist: string) {
    const newTask = await axios
      .post(`${url}/${checklist}`, { name })
      .then((res) => res.data)
      .catch((error) => console.log(error));
    setTasks([...tasks, newTask]);
  }

  async function deleteTask(id: string) {
    axios.delete(`${url}/${id}`);
    const newTask: task[] = tasks.filter((task) => task._id !== id);
    setTasks(newTask);
  }

  async function switchDone(id: string) {
    const newTasks: task[] = tasks.filter((task) => {
      task._id == id ? (task.done = !task.done) : (task.done = task.done);
      return task;
    });

    setTasks(newTasks);
    const [task] = tasks.filter((task) => task._id == id);
    axios.put(`${url}/${id}`, { done: task.done });
  }

  async function updateNameTask(id: string, newName: string) {
    axios.put(`${url}/rename/${id}`, { name: newName });

    const newTasks = tasks.filter((task) => {
      task._id == id ? (task.name = newName) : (task.name = task.name);
      return task;
    });

    setTasks(newTasks);
  }

  return {
    tasks,
    getTasks,
    createTask,
    deleteTask,
    switchDone,
    updateNameTask,
  };
}

export default useTask;
