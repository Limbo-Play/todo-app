import { Dispatch, SetStateAction, useCallback } from "react";
import { TTodoItem } from "../components/TodoList/TodoList";
import { taskActions } from "../api/task";

type TUseTodosParams = {
  todoItems: TTodoItem[];
  updateTodoItems: Dispatch<SetStateAction<TTodoItem[]>>;
};

export const useTasksActions = ({
  todoItems,
  updateTodoItems,
}: TUseTodosParams) => {
  const onClickAddTask = useCallback(
    async (id: string) => {
      const newTodos = [
        ...todoItems.map((todo) => ({
          ...(todo.id === id
            ? {
                ...todo,
                tasks: [
                  ...todo.tasks,
                  {
                    title: "new task",
                    description: "description",
                    isDone: false,
                    id: crypto.randomUUID(),
                  },
                ],
              }
            : todo),
        })),
      ];

      try {
        await taskActions.updateTask(newTodos);
        updateTodoItems(newTodos);
      } catch (error: any) {
        console.error(error?.message);
      }
    },
    [todoItems]
  );

  const onClickDoneTask = useCallback(
    async (todoId: string, taskId: string) => {
      const newTodos = [
        ...todoItems.map((todo) => ({
          ...(todo.id === todoId
            ? {
                ...todo,
                tasks: [
                  ...todo.tasks.map((task) =>
                    task.id === taskId
                      ? { ...task, isDone: !task.isDone }
                      : task
                  ),
                ],
              }
            : todo),
        })),
      ];

      try {
        await taskActions.updateTask(newTodos);
        updateTodoItems(newTodos);
      } catch (error: any) {
        console.error(error?.message);
      }
    },
    [todoItems]
  );

  const onClickDeleteTask = useCallback(
    async (todoId: string, taskId: string) => {
      const newTodos = [
        ...todoItems.map((todo) => ({
          ...(todo.id === todoId
            ? {
                ...todo,
                tasks: [...todo.tasks.filter((task) => task.id !== taskId)],
              }
            : todo),
        })),
      ];

      try {
        await taskActions.updateTask(newTodos);
        updateTodoItems(newTodos);
      } catch (error: any) {
        console.error(error?.message);
      }
    },
    [todoItems]
  );

  const onChangeTaskTitle = useCallback(
    async (value: string, id: string, taskId: string) => {
      const newTodos = [
        ...todoItems.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                tasks: [
                  ...todo.tasks.map((task) =>
                    task.id === taskId ? { ...task, title: value } : task
                  ),
                ],
              }
            : todo
        ),
      ];

      try {
        taskActions.updateTask(newTodos);
        updateTodoItems(newTodos);
      } catch (error: any) {
        console.error(error?.message);
      }
    },
    [todoItems]
  );

  const onChangeTaskDescription = useCallback(
    async (value: string, id: string, taskId: string) => {
      const newTodos = [
        ...todoItems.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                tasks: [
                  ...todo.tasks.map((task) =>
                    task.id === taskId ? { ...task, description: value } : task
                  ),
                ],
              }
            : todo
        ),
      ];

      try {
        taskActions.updateTask(newTodos);
        updateTodoItems(newTodos);
      } catch (error: any) {
        console.error(error?.message);
      }
    },
    [todoItems]
  );

  return {
    onClickAddTask,
    onClickDoneTask,
    onChangeTaskTitle,
    onChangeTaskDescription,
    onClickDeleteTask,
  };
};
