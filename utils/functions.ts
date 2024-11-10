import { Alert } from "react-native";
import { endpoints } from "./endpoints";
export type Todo = {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const fetchTodos = async (
  userToken: string | null
): Promise<Todo[] | undefined> => {
  if (!userToken) {
    Alert.alert("Authorization Error", "User token is missing");
    return;
  }

  try {
    const response = await fetch(endpoints.getTodos, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    Alert.alert("Failed to fetch todos", error.message || error);
    return undefined;
  }
};

// export const toggleTodo = async (
//   _id: string,
//   userToken: string | null,
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
// ): Promise<void> => {
//   // Check if userToken is null and prevent further execution if it is
//   if (!userToken) {
//     Alert.alert("Authorization Error", "User token is missing");
//     return;
//   }

//   try {
//     const response = await fetch(endpoints.toggleTodo(_id), {
//       // Use the correct endpoint function
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${userToken}`, // Now userToken is guaranteed to be a string
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     // Update the local state to reflect the change
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo._id === _id
//           ? {
//               ...todo,
//               status: todo.status === "completed" ? "pending" : "completed",
//             }
//           : todo
//       )
//     );
//   } catch (error: any) {
//     Alert.alert("Failed to toggle todo", error.message || error);
//   }
// };
