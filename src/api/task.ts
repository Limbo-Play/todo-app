import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { TTodoItem } from "../components/TodoList/TodoList";

// i didn't find solution how to change only task field in db so i've decide to replace all todo's array
// TODO find better solution

const updateTask = async (todos: TTodoItem[]) => {
  const uid = auth?.currentUser?.uid || localStorage.getItem("uid");
  const todoRef = doc(db, `users`, `${uid}`);

  await updateDoc(todoRef, {
    todos: todos,
  });
};

export const taskActions = {
  updateTask,
};
