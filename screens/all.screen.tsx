import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { CheckBox } from "react-native-elements";
import { mockTodos } from "../utils/todos";
import { toggleTodo } from "../utils/functions";
import { Todo } from "../utils/todoTypes"; // Import the Todo type
import styled from "styled-components/native";
import { useAuth } from "../contexts/auth.context";

export const AllScreen = () => {
  const { userToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]); // Use the Todo type

  useEffect(() => {
    fetchTodos();
    console.log("Todos", todos);
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching todos...");
      const response = await fetch("http://localhost:3000/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Fetched data", data);
      setIsLoading(false);
      setTodos(data);
    } catch (error) {
      setIsLoading(false);
      console.error("Failed to fetch todos", error);
    }
  };

  const toggleTodo = async (_id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/todos/${_id}/complete`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`, // Include your JWT token
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Update the local state to reflect the change
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
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  };

  return (
    <Container>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem>
            <CheckBox
              checked={item.status === "completed"}
              onPress={() => toggleTodo(item._id)}
              containerStyle={{
                backgroundColor: "transparent",
                borderWidth: 0,
              }}
              textStyle={[
                item.status === "completed" && {
                  textDecorationLine: "line-through",
                  color: "#808080",
                },
              ]}
              title={item.description}
            />
          </TodoItem>
        )}
      />
    </Container>
  );
};

// Styled Components
const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const TodoItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 5px;
`;
