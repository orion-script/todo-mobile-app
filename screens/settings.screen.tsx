import React, { useState } from "react";
import { StyleSheet, ScrollView, View, FlatList, Image } from "react-native";
import { Text, Button } from "react-native";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { useAuth } from "../contexts/auth.context";

export const SettingsScreen = () => {
  const { logout, isLoading, userProfile } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    console.log("Logging Out...");
    try {
      setError(null);
      await logout();
      console.log("Logged Out");
    } catch (e) {
      setError("Failed to log out");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profileImage}
            source={{ uri: "https://via.placeholder.com/250" }}
          />
          <View style={styles.border} />
        </View>
        <View style={{ marginTop: 40 }} />
        <Text>{userProfile?.name || ""}</Text>
        <View style={{ marginTop: 10 }} />
        <Text>{userProfile?.email || ""}</Text>
      </View>
      <View style={{ marginTop: 30 }} />
      <AuthButton
        icon="lock-open-outline"
        mode="contained"
        onPress={handleLogout}
        style={styles.button}
      >
        Logout
      </AuthButton>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#458ae5",
    height: "auto",
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  profileImage: {
    width: 200, // Increased size
    height: 200, // Increased size
    borderRadius: 75, // Updated to half of the width/height for a perfect circle
    borderWidth: 7, // Increased thickness
    borderColor: "#fff",
  },
  border: {
    position: "absolute",
    width: 230, // Increased size of the border container
    height: 230, // Increased size of the border container
    borderRadius: 90, // Updated to half of the width/height for a circular border
    borderWidth: 5, // Increased thickness of the border
    borderColor: "#ff6347",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    marginTop: 40,
    backgroundColor: "#458ae5",
    width: 200,
    height: 50,
    marginHorizontal: "auto",
  },
});
