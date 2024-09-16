import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../components/Button";

function LoginScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LoginScreen</Text>
      <Button title="Back" onPress={() => navigation.navigate("Main")} />
    </View>
  );
}

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
});
