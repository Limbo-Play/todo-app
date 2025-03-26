import {
  arrayUnion,
  arrayRemove,
  doc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { TTodoItem } from "../components/TodoList/TodoList";

type TGetTodoReturnType = {
  userId: string;
  todos: TTodoItem[];
};

const getTodos = async () => {
  const uid = auth?.currentUser?.uid || localStorage.getItem("uid");
  const todoRef = doc(db, `users`, `${uid}`);
  const docSnap = await getDoc(todoRef);

  const todos = (docSnap.data() as TGetTodoReturnType)?.todos;

  if (todos) return todos;
};

const addTodo = async (todo: TTodoItem) => {
  const uid = auth?.currentUser?.uid || localStorage.getItem("uid");
  const todoRef = doc(db, `users`, `${uid}`);

  await updateDoc(todoRef, {
    todos: arrayUnion(todo),
  });
};

const deleteTodo = async (todo?: TTodoItem) => {
  if (!todo) return;
  const uid = auth?.currentUser?.uid || localStorage.getItem("uid");

  const todoRef = doc(db, `users`, `${uid}`);

  await updateDoc(todoRef, {
    todos: arrayRemove(todo),
  });
};

const updateTodos = async (todos: TTodoItem[]) => {
  const uid = auth?.currentUser?.uid || localStorage.getItem("uid");
  const todoRef = doc(db, `users`, `${uid}`);

  await updateDoc(todoRef, {
    todos: todos,
  });
};

export const todoActions = {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodos,
};

//  database structure
// {
//   "users": [
//     "userId": "$uid",
//     "todos": [
//        {
//          "title": "Мій список справ",
//          "isDone": false,
//          "id": "$todoId",
//          "tasks": [
//             {
//               "id": "$taskId",
//               "title": "Зробити покупки",
//               "isDone": false,
//               "description": "Купити продукти"
//             }
//          ]
//        }
//     ]
//   ]
// }
