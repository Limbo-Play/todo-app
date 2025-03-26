import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

interface LoginSchema {
  email: string;
  password: string;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  async function onFormSubmit(formData: LoginSchema) {
    setIsLoading(true);
    const { email, password } = formData;

    try {
      await setPersistence(auth, browserSessionPersistence);
      const data = await signInWithEmailAndPassword(auth, email, password);

      localStorage.setItem("uid", data.user.uid);

      navigate("/todo-list", { replace: true });
    } catch (error: any) {
      console.error(error?.message);
      setLoginError(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  const clearLoginError = () => setLoginError("");

  return {
    isLoading,
    loginError,
    onFormSubmit,
    clearLoginError,
  };
};
