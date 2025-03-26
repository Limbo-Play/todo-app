import { Button, CircularProgress } from "@mui/material";
import TodoItem from "./TodoItem/TodoItem";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect } from "react";
import EmptyList from "./EmptyList/EmptyList";
import { todoActions } from "../../api/todos";
import { useTodoStore } from "../../hooks/useTodoStore";
import ListLoading from "./ListLoading/ListLoading";

export type TTask = {
  id: string;
  title: string;
  isDone: boolean;
  description: string;
};

export type TTodoItem = {
  title: string;
  isDone: boolean;
  id: string;
  tasks: TTask[];
};

const TodoList = () => {
  const { todoItems, setTodoItems, getTodos, isFetched, todoLoading } =
    useTodoStore();

  const onClickAddTodo = useCallback(() => {
    todoActions.addTodo({
      title: "New list",
      isDone: false,
      id: crypto.randomUUID(),
      tasks: [],
    });

    setTodoItems([
      ...todoItems,
      {
        title: "New list",
        isDone: false,
        id: crypto.randomUUID(),
        tasks: [],
      },
    ]);
  }, [todoItems]);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="px-10">
      <div className="p-5">
        <Button
          onClick={onClickAddTodo}
          variant="outlined"
          disabled={todoLoading}
          startIcon={<AddIcon />}
        >
          Add Todo
        </Button>
      </div>
      <table className="table-auto bg-white rounded-xl w-full">
        <tbody>
          {todoItems.map((todo) => (
            <TodoItem
              key={todo.id}
              item={todo}
              todoItems={todoItems}
              updateTodoItems={setTodoItems}
            />
          ))}
        </tbody>
      </table>
      {todoLoading && <ListLoading />}
      {!todoItems.length && isFetched && !todoLoading && <EmptyList />}
    </div>
  );
};

export default TodoList;
