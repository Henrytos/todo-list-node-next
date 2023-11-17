import axios from "axios";
import { useEffect, useState } from "react";
import { task } from "./useTask";

export type checklist = {
  name: string;
  _id: string;
  tasks: task[];
};

const url = "http://localhost:8000/checklists";
function useChecklist() {
  const [checklists, setChecklists] = useState<checklist[]>([] as checklist[]);

  const fetchData = async () => {
    try {
      const checklists = await getUsers();
      setChecklists(checklists);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  async function getUsers() {
    const checklists: checklist[] = await axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => console.log(error));
    console.table(checklists);
    return checklists;
  }
  async function getOneUser(id: string) {
    const oneChecklist: checklist = await axios
      .get(`${url}/${id}`)
      .then((res) => res.data)
      .catch((error) => console.log(error));
    return oneChecklist;
  }

  async function createUser(name: string) {
    const newChecklist = await axios
      .post(url, { name })
      .then((res) => res.data)
      .catch((error) => console.log(error));
    setChecklists([...checklists, newChecklist]);
  }

  async function updateChecklist(id: string, newName: string) {
    axios
      .put(`${url}/${id}`, { name: newName })
      .then((res) => {
        setChecklists(
          checklists.map((checklist) => {
            if (checklist._id === id) checklist.name = newName;
            return checklist;
          })
        );
      })
      .catch((error) => console.log(error));
  }

  async function deleteUser(id: string) {
    setChecklists(checklists.filter((checklist) => checklist._id !== id));
    await axios
      .delete(`${url}/${id}`)
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }

  return {
    checklists,
    setChecklists,
    getUsers,
    getOneUser,
    createUser,
    updateChecklist,
    deleteUser,
  };
}

export default useChecklist;
