// ActiveScreen.tsx
import React, { useState } from "react";
import { FlatList } from "react-native";
import { CheckBox } from "react-native-elements";
import { mockTodos } from "../utils/todos";
import { toggleTodo } from "../utils/toggleTodo"; // Import the function
import styled from "styled-components/native";

export const ActiveScreen = () => {
  const [todos, setTodos] = useState(mockTodos);

  // Filter active todos (status: "pending")
  const activeTodos = todos.filter((todo) => todo.status === "pending");

  return (
    <Container>
      <FlatList
        data={activeTodos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem>
            <CheckBox
              checked={item.status === "completed"}
              onPress={() => toggleTodo(item._id, todos, setTodos)} // Use the imported function
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
              title={item.title}
            />
          </TodoItem>
        )}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const TodoItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 5px;
`;
