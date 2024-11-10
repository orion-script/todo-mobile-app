import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  Alert,
  ActivityIndicator,
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { AnalogClock } from "../components/clock";
import { useAuth } from "../contexts/auth.context";
import { endpoints } from "../utils/endpoints";
import DateTimePicker from "@react-native-community/datetimepicker";
import { AuthButton } from "../components/account.styles";

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;
const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const HomeScreen = () => {
  const { userToken, userProfile } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState<any>(false);

  useEffect(() => {
    if (userProfile?.name) {
      setIsPageLoading(false);
    }
  }, [userProfile?.name]);

  const addTodo = async () => {
    const newTodo = {
      title,
      description: description || undefined,
      dueDate: dueDate || undefined,
    };
    setIsLoading(true);
    try {
      const response = await fetch(endpoints.createTodo, {
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
      setIsLoading(false);
      Alert.alert("Todo created successfully");
      setTitle("");
      setDescription("");
      setDueDate("");
    } catch (error: any) {
      setIsLoading(false);
      Alert.alert("Failed to add todo", error);
    }
  };

  return (
    <>
      {isPageLoading ? (
        <LoadingContainer>
          <Loading size={50} animating={true} color="blue" />
        </LoadingContainer>
      ) : (
        <View>
          <View style={styles.header}>
            <Text style={styles.user}>
              Hey 👋🏼, {userProfile?.name || "....."}
            </Text>
          </View>
          <View style={styles.clockContainer}>
            <AnalogClock />
          </View>

          {/* New Todo Input Section */}
          <View style={styles.inputContainer}>
            <Text style={styles.inputContainerTitle}>Add New Todo</Text>

            {/* Title Input with Label */}
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />

            {/* Description Input with Label */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Description"
              value={description}
              onChangeText={setDescription}
            />

            {/* Due Date Input with Label */}
            <Text style={styles.label}>Due Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.datePickerContainer}
            >
              {/* Display selected date as text when date picker is hidden */}
              <Text style={styles.dateText}>
                {dueDate
                  ? new Date(dueDate).toLocaleDateString()
                  : "Select Due Date"}
              </Text>

              {/* Conditionally show DateTimePicker */}
              {showDatePicker && (
                <DateTimePicker
                  style={styles.datePicker}
                  value={dueDate ? new Date(dueDate) : new Date()}
                  mode="date"
                  display="default"
                  minimumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) {
                      setDueDate(selectedDate.toISOString());
                    }
                  }}
                />
              )}
            </TouchableOpacity>
            <AuthButton icon="arrow-right" mode="contained" onPress={addTodo}>
              {isLoading ? (
                <Loading size={20} animating={true} color="white" />
              ) : (
                "Create Todo"
              )}
            </AuthButton>
          </View>
        </View>
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
    marginVertical: 5,
  },
  inputContainerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
    marginTop: 5,
  },
  inputContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 5,
    margin: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  datePickerContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  datePicker: {
    width: "100%",
  },
});
