import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { ScrollView, FlatList, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import { AnalogClock } from "../components/clock";
import { mockTodos } from "../utils/todos";
import { useAuth } from "../contexts/auth.context";
import { Todo } from "../utils/todoTypes";

export const HomeScreen = () => {
  const { userToken, isLoading, userProfile } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
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

  const addTodo = async () => {
    // if (!title) {
    //   Alert.alert("Please enter a title for the todo.");
    //   return;
    // }

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
          Authorization: `Bearer ${userToken}`, // Include user token
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const createdTodo: Todo = await response.json(); // Get the created todo from the response
      setTodos((prevTodos) => [...prevTodos, createdTodo]); // Update state with new todo

      // Clear input fields
      setTitle("");
      setDescription("");
      setDueDate("");
      // Alert.alert("Todo added successfully!");
    } catch (error) {
      console.error("Failed to add todo", error);
      // Alert.alert("Failed to add todo. Please try again.");
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
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.user}>Hey 👋🏼, {userProfile?.name}</Text>
      </View>

      {/* Analog Clock */}
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

      {/* Todo List Card */}

      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Todo List</Text>
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
          />
        </View>
      )}
    </ScrollView>
  );
};

// const Container = styled(ScrollView)`
//   flex: 1;
// `;

// const Header = styled.View`
//   background-color: #458ae5;
//   height: 200px;
//   justify-content: center;
//   align-items: center;
// `;

// const ProfileContainer = styled.View`
//   justify-content: center;
//   align-items: center;
//   position: relative;
// `;

// const ProfileImage = styled(Image)`
//   width: 150px;
//   height: 150px;
//   border-radius: 75px;
//   border-width: 7px;
//   border-color: #fff;
// `;

// const Border = styled.View`
//   position: absolute;
//   width: 180px;
//   height: 180px;
//   border-radius: 90px;
//   border-width: 5px;
//   border-color: #fff;
//   justify-content: center;
//   align-items: center;
// `;

// const ClockContainer = styled.View`
//   align-items: center;
//   margin-vertical: 30px;
// `;

// const Card = styled.View`
//   height: 400px;
//   margin: 20px;
//   padding: 20px;
//   background-color: #fff;
//   border-radius: 10px;
//   shadow-color: #000;
//   shadow-offset: { width: 0, height: 2 };
//   shadow-opacity: 0.8;
//   shadow-radius: 5px;
//   elevation: 5;
// `;

// const CardTitle = styled.Text`
//   font-size: 24px;
//   font-weight: bold;
//   margin-bottom: 10px;
// `;

// const TodoItem = styled.View`
//   flex-direction: row;
//   align-items: center;
//   padding-vertical: 5px;
// `;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: "#458ae5",
    height: 50,
    // justifyContent: "center",
    // alignItems: "center",
  },
  user: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#458ae5",
    textAlign: "left",
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
    elevation: 5, // Shadow for Android
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },

  card: {
    height: 320,
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5, // Shadow for Android
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
