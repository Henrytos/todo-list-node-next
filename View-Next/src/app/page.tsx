"use client";
import useChecklist from "@/hooks/useChecklist";
import { Eye, Pen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { MagicMotion } from "react-magic-motion";

export default function Home() {
  const { checklists, createUser, deleteUser, updateChecklist } =
    useChecklist();
  const [name, setName] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");

  return (
    <>
      <form
        className="flex flex-col gap-4"
        onSubmit={(ev) => {
          ev.preventDefault();
          setName("");
        }}
      >
        <label htmlFor="name" className="text-2xl">
          Nome:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-black text-white border-white border-2 p-1"
        />
        <button
          onClick={() => name.length && createUser(name)}
          className="  
          border-green-800 text-green-800 border-2 p-2
          hover:bg-green-800 hover:text-white rounded-sm transition-colors cursor-pointer
          "
        >
          CREATE
        </button>
      </form>
      <MagicMotion>
        <ul className="flex  flex-col gap-4">
          {checklists.map((checklist, i) => (
            <li key={checklist._id} className="flex w-full  justify-between">
              <span className="text-xl flex items-center gap-2">
                <span>{i + 1}</span> -
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    nameUpdate.length > 0 &&
                      updateChecklist(checklist._id, nameUpdate as string);
                    setNameUpdate("");
                    let input = document.getElementById(checklist._id);
                    input.disabled = "true";
                  }}
                >
                  <input
                    type="text"
                    disabled={true}
                    id={checklist._id}
                    value={
                      nameUpdate.length >= 0 &&
                      document.getElementById(checklist._id)?.disabled === false
                        ? nameUpdate
                        : checklist.name
                    }
                    onChange={(e) => setNameUpdate(e.target.value)}
                    className="text-white bg-black"
                  />
                </form>
              </span>

              <div className="flex gap-4 ">
                <span
                  onClick={() => deleteUser(checklist._id)}
                  className="p-1 text-red-800  border-red-800 border-2 hover:bg-red-800  hover:text-white rounded-sm transition-colors cursor-pointer"
                >
                  <Trash2 />
                </span>

                <span
                  onClick={() => {
                    let input = document.getElementById(checklist._id);
                    input?.removeAttribute("disabled");
                    setNameUpdate(checklist.name);
                    input?.focus();
                  }}
                  className="p-1 text-sky-800  border-sky-800 border-2 hover:bg-sky-800  hover:text-white rounded-sm transition-colors cursor-pointer"
                >
                  <Pen />
                </span>
                <Link
                  className="p-1 text-emerald-800  border-emerald-800 border-2 hover:bg-emerald-800  hover:text-white rounded-sm transition-colors cursor-pointer"
                  href={`/checklist/${checklist._id}`}
                >
                  <Eye />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </MagicMotion>
    </>
  );
}
