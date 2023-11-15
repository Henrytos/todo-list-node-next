"use client";
import { TaskProvider } from "@/contexts/TaskContext";
export default function layout({ children }: { children: React.ReactNode }) {
  return <TaskProvider>{children}</TaskProvider>;
}
