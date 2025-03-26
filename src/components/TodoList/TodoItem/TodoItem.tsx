import { IconButton } from "@mui/material";
import CheckboxRound from "../../ChecboxRound/CheckboxRound";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import ListIcon from "@mui/icons-material/List";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import { TTodoItem } from "../TodoList";
import { Dispatch, SetStateAction } from "react";
import { useTodosActions } from "../../../hooks/useTodosActions";
import { useTasksActions } from "../../../hooks/useTasksActions";
import InputWithSubmit from "../../InputWithSubmit/InputWithSubmit";

export type TTodoItemProps = {
  todoItems: TTodoItem[];
  updateTodoItems: Dispatch<SetStateAction<TTodoItem[]>>;
  item: TTodoItem;
};

const TodoItem = (props: TTodoItemProps) => {
  const {
    item: { isDone, title, id, tasks },
    updateTodoItems,
    todoItems,
  } = props;

  const { onClickDoneTodo, onClickDeleteTodo, onChangeTodoTitle } =
    useTodosActions({
      todoItems,
      updateTodoItems,
    });
  const {
    onClickDoneTask,
    onClickAddTask,
    onClickDeleteTask,
    onChangeTaskTitle,
    onChangeTaskDescription,
  } = useTasksActions({
    todoItems,
    updateTodoItems,
  });

  return (
    <>
      <tr className="p-2">
        <td>
          <IconButton aria-label="move item">
            <ListIcon />
          </IconButton>
        </td>
        <td>
          <CheckboxRound
            checked={isDone}
            onChange={() => onClickDoneTodo(id)}
          />
        </td>
        <td>
          <InputWithSubmit
            onSubmit={(val) => onChangeTodoTitle(val, id)}
            isDone={isDone}
            text={title}
          />
        </td>
        <td>
          <IconButton onClick={() => onClickAddTask(id)} aria-label="delete">
            <AddCircleIcon />
          </IconButton>
        </td>
        <td>
          <IconButton onClick={() => onClickDeleteTodo(id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </td>
      </tr>
      {tasks?.map((task) => (
        <tr key={task.id}>
          <td />
          <td>
            <CheckboxRound
              checked={task.isDone}
              onChange={() => onClickDoneTask(id, task.id)}
            />
          </td>
          <td>
            <InputWithSubmit
              onSubmit={(val) => onChangeTaskTitle(val, id, task.id)}
              isDone={task.isDone}
              text={task.title}
            />
          </td>
          <td>
            <InputWithSubmit
              onSubmit={(val) => onChangeTaskDescription(val, id, task.id)}
              isDone={task.isDone}
              text={task.description}
            />
          </td>
          <td>
            <IconButton
              onClick={() => onClickDeleteTask(id, task.id)}
              aria-label="delete"
            >
              <DeleteIcon />
            </IconButton>
          </td>
        </tr>
      ))}
    </>
  );
};

export default TodoItem;
