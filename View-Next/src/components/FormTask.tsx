export default function FormTask({
  nameTask,
  setNameTask,
  createTask,
  id,
}: {
  nameTask: string;
  setNameTask: React.Dispatch<React.SetStateAction<string>>;
  createTask: (name: string, checklist: string) => Promise<void>;
  id: string;
}) {
  return (
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
        className="  
          border-green-800 text-green-800 border-2 p-2
          hover:bg-green-800 hover:text-white rounded-sm transition-colors cursor-pointer
          "
        onClick={() => nameTask.length && createTask(nameTask, id)}
      >
        Adicionar
      </button>
    </form>
  );
}
