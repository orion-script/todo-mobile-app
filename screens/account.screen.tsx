import React from "react";
import { Link } from "react-router-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet, Image, Text, View } from "react-native";
import Button from "../components/Button";
import { Spacer } from "../components/Spacer";

export const AccountScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image source={require("../assets/home-img.png")} style={styles.image} />
      <Text style={styles.title}>Keep on track With Todo</Text>
      <Text style={styles.content}>
        Make your task on track easily and seamlessly
      </Text>
      <Spacer />
      <Button
        title="Create Account"
        onPress={() => navigation.navigate("Register")}
      />
      <View
        style={{
          height: 60,
          display: "flex",
          flexDirection: "row",
          marginTop: 20,
          // marginBottom: 40,
        }}
      >
        <Text style={styles.already}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.login}>Log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    // justifyContent: "space-between",
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    width: 376,
    height: 300,
    marginTop: 100,
  },
  title: {
    width: 250,
    color: "#252C34",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "Roboto",
    margin: "auto",
  },
  content: {
    width: 240,
    marginTop: 16,
    color: "#252C34",
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  already: {
    color: "#252C34",
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    marginHorizontal: "auto",
  },
  login: {
    color: "#458AE5",
    fontSize: 16,
    fontWeight: "normal",
    textAlign: "center",
    marginHorizontal: "auto",
    marginLeft: 5,
  },
});
