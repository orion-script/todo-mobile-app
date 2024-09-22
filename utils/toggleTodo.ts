import { Todo } from "./todoTypes";

// Define the toggleTodo function
export const toggleTodo = (
  _id: string,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
) => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo._id === _id
        ? {
            ...todo,
            status: todo.status === "completed" ? "pending" : "completed",
          }
        : todo
    )
  );
};
