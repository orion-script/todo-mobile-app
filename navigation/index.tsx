import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./app.navigator";
import { AccountNavigator } from "./account.navigator";
import { useAuth } from "../contexts/auth.context";
import { ActivityIndicator, View, StyleSheet } from "react-native";

export const Navigation = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [isNavigatorLoading, setNavigatorLoading] = useState(true);

  // This effect ensures that the loading indicator is shown while switching navigators
  useEffect(() => {
    const timer = setTimeout(() => {
      setNavigatorLoading(false);
    }, 500); // Delay for loading effect, adjust as necessary

    return () => clearTimeout(timer);
  }, [isAuthenticated]);

  // Show a loading indicator if the authentication or navigator is loading
  if (isLoading || isNavigatorLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
      {/* <AppNavigator /> */}
      {/* <AccountNavigator /> */}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
