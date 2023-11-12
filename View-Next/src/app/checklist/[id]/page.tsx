"use client";

import useTask, { task } from "@/hooks/useTask";
import { Pen, Trash2 } from "lucide-react";
import { useState } from "react";

export default function page({ params }: { params: { id: string } }) {
  const {
    tasks,
    getTasks,
    createTask,
    switchDone,
    deleteTask,
    updateNameTask,
  } = useTask();
  const [nameTask, setNameTask] = useState("");
  const [nameTaskUpdate, setNameTaskUpdate] = useState("");

  const tasksFromChecklist = tasks.filter(
    (task) => task.checklist == params.id
  );

  return (
    <section className="flex flex-col gap-8">
      <form
        className="flex flex-col gap-4"
        onSubmit={(ev) => {
          ev.preventDefault();
          setNameTask("");
        }}
      >
        <label htmlFor="nameTask">Nova task</label>
        <input
          type="text"
          name="nameTask"
          id="nameTask"
          value={nameTask}
          onChange={(ev) => setNameTask(ev.target.value)}
          className="bg-black text-white border-white border-2 p-1"
        />
        <button
          type="submit"
          onClick={async () =>
            nameTask.length && (await createTask(nameTask, params.id))
          }
        >
          Adicionar
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {tasksFromChecklist?.map((task, i) => (
          <div className="flex  justify-between items-center" key={task._id}>
            <form
              className="flex gap-4 items-center"
              onSubmit={(e) => {
                e.preventDefault();
                nameTaskUpdate.length > 0 && setNameTaskUpdate("");
                updateNameTask(task._id, nameTaskUpdate);
                setNameTaskUpdate("");
                let input = document.getElementById(task._id);
                input?.blur();
                input.disabled = "true";
              }}
            >
              <input
                type="checkbox"
                name={i.toString()}
                checked={task.done}
                id={i.toString()}
                onClick={() => {
                  switchDone(task._id);
                }}
              />

              <label
                htmlFor={i.toString()}
                onClick={() => {
                  document.getElementById(i)?.focus();
                }}
              >
                <input
                  type="text"
                  disabled={true}
                  id={task._id}
                  value={
                    nameTaskUpdate.length > 0 &&
                    document.getElementById(task._id)?.disabled === false
                      ? nameTaskUpdate
                      : task.name
                  }
                  onChange={(e) => setNameTaskUpdate(e.target.value)}
                  className="text-white bg-black text-xl"
                />
              </label>
            </form>

            <div className="flex gap-4 ">
              <span
                onClick={() => deleteTask(task._id)}
                className="p-1 text-red-800  border-red-800 border-2 hover:bg-red-800  hover:text-white rounded-sm transition-colors cursor-pointer"
              >
                <Trash2 />
              </span>
              <span
                onClick={() => {
                  let input = document.getElementById(task._id);
                  input?.removeAttribute("disabled");
                  setNameTaskUpdate(task.name);
                  input?.focus();
                }}
                className="p-1 text-sky-800  border-sky-800 border-2 hover:bg-sky-800  hover:text-white rounded-sm transition-colors cursor-pointer"
              >
                <Pen />
              </span>
            </div>
          </div>
        ))}
      </ul>
    </section>
  );
}
