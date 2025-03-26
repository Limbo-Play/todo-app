import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { userActions } from "../api/users";

interface SignUpSchema {
  name: string;
  email: string;
  password: string;
}

export const useSignUp = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  async function onFormSubmit(formData: SignUpSchema) {
    setIsLoading(true);
    const { email, password } = formData;

    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      await userActions.addUserToDB(data.user.uid);

      navigate("/todo-list");
    } catch (error: any) {
      console.log(error?.message);
      setSignUpError(error?.message);
    } finally {
      setIsLoading(false);
    }
  }

  const clearSignUpError = () => setSignUpError("");

  return {
    isLoading,
    signUpError,
    onFormSubmit,
    clearSignUpError,
  };
};
