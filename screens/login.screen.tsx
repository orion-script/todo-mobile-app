import React, { useState, useContext } from "react";
import { useAuth } from "../contexts/auth.context";
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
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from "react-native";

export const LoginScreen = ({ navigation }: any) => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      await login(email, password);
      navigation.navigate("Home");
    } catch (e) {
      setError("Failed to log in");
    }
  };

  return (
    <AccountBackground>
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          position: "absolute",
          top: 110,
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
      {/* <AccountCover /> */}
      <Title>Login Page</Title>
      <View style={{ marginTop: 30 }} />
      <AccountContainer>
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
        <View style={{ marginTop: 40 }} />
        {/* <AuthButton
          icon="lock-open-outline"
          mode="contained"
          onPress={handleLogin}
        >
          Login
        </AuthButton> */}
        {!isLoading ? (
          <AuthButton
            icon="lock-open-outline"
            mode="contained"
            onPress={handleLogin}
          >
            Login
          </AuthButton>
        ) : (
          <ActivityIndicator animating={true} />
        )}
        {/* <View style={{ marginTop: 20 }} /> */}
        {/* <AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </AuthButton> */}
        {isLoading && <ActivityIndicator />}
        {error && <Text>{error}</Text>}
      </AccountContainer>
    </AccountBackground>
  );
};
