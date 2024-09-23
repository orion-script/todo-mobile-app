// CompletedScreen.tsx
import React, { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { CheckBox } from "react-native-elements";
import styled from "styled-components/native";
import { useAuth } from "../contexts/auth.context";
import { Todo } from "../utils/todoTypes";

export const CompletedScreen = () => {
  const { userToken, isLoading } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
    console.log("Todos", todos);
  }, []);

  const fetchTodos = async () => {
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched data", data);
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };
  const completedTodos = todos.filter((todo) => todo.status === "completed");

  return (
    <Container>
      {/* <Text>Completed Todos</Text> */}
      <FlatList
        data={completedTodos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem>
            <CheckBox
              checked={item.status === "completed"}
              // onPress={() => toggleTodo(item._id)} // Use the imported function
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

const Text = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
  align-self: center;
`;