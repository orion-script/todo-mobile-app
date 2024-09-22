// CompletedScreen.tsx
import React, { useState } from "react";
import { FlatList } from "react-native";
import { CheckBox } from "react-native-elements";
import { mockTodos } from "../utils/todos";
import { toggleTodo } from "../utils/toggleTodo";
import styled from "styled-components/native";

export const CompletedScreen = () => {
  const [todos, setTodos] = useState(mockTodos);

  // Filter completed todos (status: "completed")
  const completedTodos = todos.filter((todo) => todo.status === "completed");

  return (
    <Container>
      <Text>Completed Todos</Text>
      <FlatList
        data={completedTodos}
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
