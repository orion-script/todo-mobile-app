// ActiveScreen.tsx
import React, { useState, useEffect } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { CheckBox } from "react-native-elements";
import styled from "styled-components/native";
import { useAuth } from "../contexts/auth.context";
import { Todo } from "../utils/todoTypes";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const ActiveScreen = () => {
  const { userToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
    console.log("Todos", todos);
  }, []);

  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching todos...");
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

  // Filter active todos (status: "pending")
  const activeTodos = todos.filter((todo) => todo.status === "pending");

  return (
    <Container>
      {isLoading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color="blue" />
        </LoadingContainer>
      )}
      <FlatList
        data={activeTodos}
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

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const TodoItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 5px;
`;
