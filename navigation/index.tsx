import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";
import { useAuth } from "../contexts/auth.context";
import { ActivityIndicator } from "react-native";

// import { AuthenticationContext } from "../../services/authentication/authentication.context";

export const Navigation = () => {
  const { userToken, isLoading } = useAuth();
  // const { isAuthenticated } = useAuth();

  console.log("userToken", userToken);

  if (isLoading) {
    return <ActivityIndicator />; // Show loading indicator while loading token
  }
  //   const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <NavigationContainer>
      {userToken ? <AppNavigator /> : <AccountNavigator />}
      {/* {isAuthenticated ? <AppNavigator /> : <AccountNavigator />} */}
      {/* <AccountNavigator /> */}
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
};
