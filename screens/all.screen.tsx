import React, { useState } from "react";
import { FlatList } from "react-native";
import { CheckBox } from "react-native-elements";
import { mockTodos } from "../utils/todos";
import { toggleTodo } from "../utils/toggleTodo";
import { Todo } from "../utils/todoTypes"; // Import the Todo type
import styled from "styled-components/native";

export const AllScreen = () => {
  const [todos, setTodos] = useState<Todo[]>(mockTodos); // Use the Todo type

  return (
    <Container>
      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem>
            <CheckBox
              checked={item.status === "completed"}
              onPress={() => toggleTodo(item._id, todos, setTodos)}
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
