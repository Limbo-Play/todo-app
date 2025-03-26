import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const addUserToDB = async (userId: string) => {
  const usersRef = doc(db, `users/${userId}`);
  setDoc(usersRef, {
    userId: userId,
    todos: [],
  });
};

export const userActions = {
  addUserToDB,
};
