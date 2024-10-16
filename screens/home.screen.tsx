import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  ActivityIndicator,
  FlatList,
  TextInput,
  Button,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { CheckBox } from "react-native-elements";
import { AnalogClock } from "../components/clock";
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

export const HomeScreen = () => {
  const { userToken, isLoading, userProfile } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
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
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  const addTodo = async () => {
    const newTodo = {
      title,
      description: description || undefined,
      dueDate: dueDate || undefined,
    };

    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const createdTodo: Todo = await response.json();
      setTodos((prevTodos) => [...prevTodos, createdTodo]);

      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error) {
      console.error("Failed to add todo", error);
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
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

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
    } catch (error) {
      console.error("Failed to toggle todo", error);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color="blue" />
        </LoadingContainer>
      ) : (
        <FlatList
          data={todos}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.todoItem}>
              <CheckBox
                checked={item.status === "completed"}
                onPress={() => toggleTodo(item._id)}
                containerStyle={styles.checkBoxContainer}
                textStyle={[
                  styles.todoText,
                  item.status === "completed" && styles.completedTodo,
                ]}
                title={item.description}
              />
            </View>
          )}
          ListHeaderComponent={
            <View>
              <View style={styles.header}>
                <Text style={styles.user}>Hey 👋🏼, {userProfile?.name}</Text>
              </View>
              <View style={styles.clockContainer}>
                <AnalogClock />
              </View>

              {/* New Todo Input Section */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Title"
                  value={title}
                  onChangeText={setTitle}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Description (optional)"
                  value={description}
                  onChangeText={setDescription}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Due Date (optional)"
                  value={dueDate}
                  onChangeText={setDueDate}
                />
                <Button title="Add Todo" onPress={addTodo} />
              </View>

              <Text style={styles.cardTitle}>Todo List</Text>
            </View>
          }
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
  },
  user: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#458ae5",
    marginTop: 20,
    marginLeft: 10,
    fontFamily: "Avenir",
    fontStyle: "italic",
  },
  clockContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 20,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  todoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  completedTodo: {
    textDecorationLine: "line-through",
    color: "#808080",
  },
});
