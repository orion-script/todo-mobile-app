import React from "react";
import { StyleSheet, ScrollView, View, FlatList, Image } from "react-native";
import { Text } from "react-native";

export const SettingsScreen = () => {
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
        <Text>User Name</Text>
        <View style={{ marginTop: 10 }} />
        <Text>User Email</Text>
      </View>
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
});
