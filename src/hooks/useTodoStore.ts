import { useCallback, useState } from "react";
import { TTodoItem } from "../components/TodoList/TodoList";
import { todoActions } from "../api/todos";

export const useTodoStore = () => {
  const [todoItems, setTodoItems] = useState<TTodoItem[]>([]);
  const [todoLoading, setTodoLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false); // we need this state to fix empty list text blinking

  const getTodos = useCallback(async () => {
    try {
      setIsFetched(false);
      setTodoLoading(true);
      const todos = await todoActions.getTodos();

      if (todos) setTodoItems(todos);
    } catch (error: any) {
      console.error(error?.message);
    } finally {
      setTodoLoading(false);
      setIsFetched(true);
    }
  }, [todoItems, todoLoading]);

  return {
    todoItems,
    setTodoItems,
    todoLoading,
    isFetched,
    getTodos,
  };
};
