"use client";
import useChecklist, { checklist } from "@/hooks/useChecklist";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext } from "react";

export type ChecklistContextType = {
  checklists: checklist[];
  getUsers: () => Promise<checklist[]>;
  getOneUser: (id: string) => Promise<checklist>;
  createUser: (name: string) => Promise<void>;
  setChecklists: Dispatch<SetStateAction<checklist[]>>;
  updateChecklist: (id: string, newName: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
};

export const ChecklistContext = createContext({} as ChecklistContextType);

export function ChecklistProvider({ children }: { children: ReactNode }) {
  const {
    checklists,
    createUser,
    deleteUser,
    getOneUser,
    getUsers,
    setChecklists,
    updateChecklist,
  } = useChecklist();
  return (
    <ChecklistContext.Provider
      value={{
        checklists,
        createUser,
        deleteUser,
        getOneUser,
        getUsers,
        setChecklists,
        updateChecklist,
      }}
    >
      {children}
    </ChecklistContext.Provider>
  );
}
