"use client";

import FormTask from "@/components/FormTask";
import TaskDeatils from "@/components/TaskDetails";
import useTask from "@/hooks/useTask";
import { useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const { tasks, createTask, switchDone, deleteTask, updateNameTask } =
    useTask();
  const [nameTask, setNameTask] = useState("");
  const [nameTaskUpdate, setNameTaskUpdate] = useState("");

  const tasksFromChecklist = tasks.filter(
    (task) => task.checklist == params.id
  );

  return (
    <section className="flex flex-col gap-8">
      <h2>Checklist: {tasksFromChecklist[0]?.checklistName}</h2>
      <FormTask
        createTask={createTask}
        nameTask={nameTask}
        setNameTask={setNameTask}
        id={params.id}
        key={params.id}
      />

      <ul className="flex flex-col gap-3">
        {tasksFromChecklist?.map((task, i) => (
          <TaskDeatils
            i={i}
            nameTaskUpdate={nameTaskUpdate}
            setNameTaskUpdate={setNameTaskUpdate}
            task={task}
            key={i}
            deleteTask={deleteTask}
            switchDone={switchDone}
            updateNameTask={updateNameTask}
          />
        ))}
      </ul>
    </section>
  );
}
