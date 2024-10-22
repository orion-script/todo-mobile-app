import { Alert } from "react-native";
export interface Todo {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const fetchTodos = async (userToken: string): Promise<Todo[]> => {
  try {
    const response = await fetch(
      "https://todo-33hzc3d83-orionscripts-projects.vercel.app/todos",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data; // Return the fetched todos
  } catch (error: any) {
    Alert.alert("Failed to fetch todos", error);
    throw error; // Rethrow the error to be handled in the component
  }
};

export const addTodo = async (
  newTodo: Omit<Todo, "_id" | "userId" | "createdAt" | "updatedAt" | "__v">,
  userToken: string
): Promise<Todo> => {
  try {
    const response = await fetch(
      "https://todo-33hzc3d83-orionscripts-projects.vercel.app/todos",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Include user token
        },
        body: JSON.stringify(newTodo),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const createdTodo: Todo = await response.json(); // Get the created todo from the response
    return createdTodo; // Return the created todo
  } catch (error: any) {
    Alert.alert("Failed to add todo", error);
    throw error; // Rethrow the error to be handled in the component
  }
};

export const toggleTodo = (todos: Todo[], _id: string): Todo[] => {
  return todos.map((todo) =>
    todo._id === _id
      ? {
          ...todo,
          status: todo.status === "completed" ? "pending" : "completed",
        }
      : todo
  );
};
