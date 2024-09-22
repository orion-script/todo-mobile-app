import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, FlatList, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import { AnalogClock } from "../components/clock";
import { mockTodos } from "../utils/todos";

export const HomeScreen = () => {
  const [todos, setTodos] = useState(mockTodos);

  const toggleTodo = (_id: string) => {
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
  };

  return (
    <ScrollView style={styles.container}>
      {/* Blue background with profile picture */}
      {/* <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://via.placeholder.com/250" }}
          />
          <View style={styles.border} />
        </View>
      </View> */}

      {/* Analog Clock */}
      <View style={styles.clockContainer}>
        <AnalogClock />
      </View>

      {/* Todo List Card */}
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
                title={item.title}
              />
            </View>
          )}
        />
      </View>
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
    backgroundColor: "#458ae5",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 150, // Increased size
    height: 150, // Increased size
    borderRadius: 75, // Updated to half of the width/height for a perfect circle
    borderWidth: 7, // Increased thickness
    borderColor: "#fff",
  },
  border: {
    position: "absolute",
    width: 180, // Increased size of the border container
    height: 180, // Increased size of the border container
    borderRadius: 90, // Updated to half of the width/height for a circular border
    borderWidth: 5, // Increased thickness of the border
    borderColor: "#ff6347",
    justifyContent: "center",
    alignItems: "center",
  },
  clockContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  card: {
    height: 400,
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
