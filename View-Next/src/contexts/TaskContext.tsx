import useTask, { task } from "@/hooks/useTask";
import { ReactNode, createContext } from "react";

export type TaskContextType = {
  tasks: task[];
  getTasks: () => Promise<task[]>;
  createTask: (name: string, checklist: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  switchDone: (id: string) => Promise<void>;
  updateNameTask: (id: string, newName: string) => Promise<void>;
};

export const TaskContext = createContext({} as TaskContextType);

export function TaskProvider({ children }: { children: ReactNode }) {
  const {
    createTask,
    deleteTask,
    getTasks,
    switchDone,
    tasks,
    updateNameTask,
  } = useTask();
  return (
    <TaskContext.Provider
      value={{
        createTask,
        deleteTask,
        getTasks,
        switchDone,
        tasks,
        updateNameTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}
