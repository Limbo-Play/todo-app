import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { TTodoItem } from "../components/TodoList/TodoList";

const uid = localStorage.getItem("uid");

// i didn't find solution how to change only task field in db so i've decide to replace all todo's array
// TODO find better solution

const updateTask = async (todos: TTodoItem[]) => {
  const todoRef = doc(db, `users`, `${uid}`);

  await updateDoc(todoRef, {
    todos: todos,
  });
};

export const taskActions = {
  updateTask,
};
