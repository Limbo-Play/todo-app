import { Dispatch, SetStateAction, useCallback } from "react";
import { TTodoItem } from "../components/TodoList/TodoList";
import { todoActions } from "../api/todos";

type TUseTodosParams = {
  todoItems: TTodoItem[];
  updateTodoItems: Dispatch<SetStateAction<TTodoItem[]>>;
};

export const useTodosActions = ({
  todoItems,
  updateTodoItems,
}: TUseTodosParams) => {
  const onClickDeleteTodo = useCallback(
    async (id: string) => {
      try {
        await todoActions.deleteTodo(todoItems.find((todo) => todo.id === id));
        updateTodoItems([...todoItems.filter((todo) => todo.id !== id)]);
      } catch (error: any) {
        console.error(error?.message);
      }
    },
    [todoItems]
  );

  const onClickDoneTodo = useCallback(
    async (id: string) => {
      const newTodo = [
        ...todoItems.map((todo) => ({
          ...(todo.id === id ? { ...todo, isDone: !todo.isDone } : todo),
        })),
      ];

      try {
        await todoActions.updateTodos(newTodo);
        updateTodoItems(newTodo);
      } catch (error: any) {
        console.error(error?.message);
      }
    },
    [todoItems]
  );

  const onChangeTodoTitle = useCallback(
    async (value: string, id: string) => {
      const newTodos = [
        ...todoItems.map((todo) =>
          todo.id === id ? { ...todo, title: value } : todo
        ),
      ];

      try {
        await todoActions.updateTodos(newTodos);
        updateTodoItems(newTodos);
      } catch (error: any) {
        console.error(error?.message);
      }
    },
    [todoItems]
  );

  return {
    onClickDoneTodo,
    onChangeTodoTitle,
    onClickDeleteTodo,
  };
};
