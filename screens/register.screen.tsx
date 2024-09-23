import React, { useState, useContext } from "react";
import {
  AccountBackground,
  AccountContainer,
  AuthButton,
  AuthInput,
  ErrorContainer,
  Title,
} from "../components/account.styles";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../contexts/auth.context";

export const RegisterScreen = ({ navigation }: any) => {
  const { register, isLoading } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    console.log("Registering...");
    try {
      setError(null);
      await register(name, email, password);
      console.log("Registered");
    } catch (e) {
      setError("Registration failed");
    }
  };

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
        <View style={{ marginTop: 20 }} />
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
          onPress={handleRegister}
        >
          Register
        </AuthButton>
        {isLoading && <ActivityIndicator />}
        {error && <Text>{error}</Text>}
        <View style={{ marginTop: 20 }} />

        {/* <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton> */}
      </AccountContainer>
    </AccountBackground>
  );
};
