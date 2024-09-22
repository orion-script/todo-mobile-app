import React, { useState, useContext } from "react";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import { View, Image, TouchableOpacity } from "react-native";

export const RegisterScreen = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  return (
    <AccountBackground>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          position: "absolute",
          top: 100,
          left: 5,
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          style={{
            width: 30,
            height: 30,
            position: "absolute",
            top: 10,
            left: 5,
          }}
          source={require("../assets/arrow-back.png")}
        />
      </TouchableOpacity>
      <Title>Register Page</Title>
      <View style={{ marginTop: 30 }} />
      <AccountContainer>
        <AuthInput
          label="Name"
          value={name}
          textContentType="name"
          keyboardType="default"
          autoCapitalize="sentences"
          onChangeText={(u) => setName(u)}
        />
        <AuthInput
          label="Email"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(u) => setEmail(u)}
        />

        <View style={{ marginTop: 20 }} />
        <AuthInput
          label="Password"
          value={password}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setPassword(p)}
        />
        <View style={{ marginTop: 20 }} />
        <AuthInput
          label="Repeat Password"
          value={repeatedPassword}
          textContentType="password"
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(p) => setRepeatedPassword(p)}
        />
        <View style={{ marginTop: 40 }} />
        <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={() => console.log("Register")}
        >
          Register
        </AuthButton>
        <View style={{ marginTop: 20 }} />
        {/* <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton> */}
      </AccountContainer>
    </AccountBackground>
  );
};
