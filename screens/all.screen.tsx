import React, { useState, useEffect, useRef } from "react";
import { FlatList, ActivityIndicator, Alert, Text, Button } from "react-native";
import styled from "styled-components/native";
import { fetchTodos } from "../utils/functions";
import { Todo } from "../utils/todoTypes";
import { endpoints } from "../utils/endpoints";
import { useAuth } from "../contexts/auth.context";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface StatusTextProps {
  completed: boolean;
}

export const AllScreen = () => {
  const { userToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    setIsLoading(true);
    const todosData = await fetchTodos(userToken);
    if (todosData) {
      setTodos(todosData);
    }
    setIsLoading(false);
  };

  const toggleTodo = async (_id: string) => {
    try {
      const response = await fetch(endpoints.toggleTodo(_id), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
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
    } catch (error: any) {
      Alert.alert("Failed to toggle todo", error.message);
    }
  };

  const openTodoDetails = (todo: Todo) => {
    setSelectedTodo(todo);
    modalizeRef.current?.open();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Container>
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={true} color="blue" />
          </LoadingContainer>
        )}
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TodoCard onPress={() => openTodoDetails(item)}>
              <TitleText>{item.title}</TitleText>
              <StatusText completed={item.status === "completed"}>
                Status: {item.status}
              </StatusText>
              <ButtonContainer>
                <Button
                  title={
                    item.status === "completed"
                      ? "Mark as Pending"
                      : "Mark as Completed"
                  }
                  onPress={() => toggleTodo(item._id)}
                  color={item.status === "completed" ? "#ffc107" : "#28a745"}
                />
              </ButtonContainer>
            </TodoCard>
          )}
        />

        {/* Bottom Sheet for Detailed View */}
        <Modalize ref={modalizeRef} snapPoint={400}>
          {selectedTodo && (
            <BottomSheetContent>
              <BottomSheetHeader>{selectedTodo.title}</BottomSheetHeader>
              <BottomSheetText>
                <Text style={{ fontWeight: "bold" }}>Status:</Text>{" "}
                {selectedTodo.status}
              </BottomSheetText>
              <BottomSheetText>
                <Text style={{ fontWeight: "bold" }}>Description:</Text>{" "}
                {selectedTodo.description}
              </BottomSheetText>
              <BottomSheetText>
                <Text style={{ fontWeight: "bold" }}>Due Date:</Text>{" "}
                {new Date(selectedTodo.dueDate).toLocaleDateString()}
              </BottomSheetText>
              <BottomSheetText>
                <Text style={{ fontWeight: "bold" }}>Created At:</Text>{" "}
                {new Date(selectedTodo.createdAt).toLocaleString()}
              </BottomSheetText>
              <BottomSheetText>
                <Text style={{ fontWeight: "bold" }}>Updated At:</Text>{" "}
                {new Date(selectedTodo.updatedAt).toLocaleString()}
              </BottomSheetText>
            </BottomSheetContent>
          )}
        </Modalize>
      </Container>
    </GestureHandlerRootView>
  );
};

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
`;

const TodoCard = styled.TouchableOpacity`
  background-color: #ffffff;
  margin-bottom: 10px;
  padding: 20px;
  border-radius: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  elevation: 5;
`;

const TitleText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
`;

const StatusText = styled.Text<StatusTextProps>`
  font-size: 14px;
  color: ${(props) => (props.completed ? "#28a745" : "#dc3545")};
  margin-bottom: 10px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const BottomSheetContent = styled.View`
  padding: 20px;
  background-color: #ffffff;
`;

const BottomSheetText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

const BottomSheetHeader = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  text-align: center;
`;
