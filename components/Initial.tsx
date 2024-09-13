import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import Button from "./Button";
import homeImage from "../assets/home-img.png";

function Initial() {
  return (
    <View style={styles.container}>
      <Image
        source={homeImage} // Import local image
        style={styles.image}
      />
      <Text style={styles.title}>Keep on track With Todo</Text>
      <Text>Make your task on track easily and seamlessly</Text>
      <Button title="Get Started" onPress={() => console.log("Get Started")} />
    </View>
  );
}

export default Initial;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    width: 376,
    height: 300,
    marginTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
});
