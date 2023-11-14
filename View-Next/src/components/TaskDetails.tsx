import { task } from "@/hooks/useTask";
import { Pen, Trash2 } from "lucide-react";
import Icon from "./Icon";

export default function TaskDeatils({
  task,
  i,
  nameTaskUpdate,
  setNameTaskUpdate,
  switchDone,
  deleteTask,
  updateNameTask,
}: {
  i: number;
  task: task;
  nameTaskUpdate: string;
  setNameTaskUpdate: React.Dispatch<React.SetStateAction<string>>;
  switchDone: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateNameTask: (id: string, newName: string) => Promise<void>;
}) {
  return (
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
        <Icon onClick={() => deleteTask(task._id)} color="red">
          <Trash2 />
        </Icon>
        <Icon
          onClick={() => {
            let input = document.getElementById(task._id);
            input?.removeAttribute("disabled");
            setNameTaskUpdate(task.name);
            input?.focus();
          }}
          color="sky"
        >
          <Pen />
        </Icon>
      </div>
    </div>
  );
}
