import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { AccountScreen } from "../screens/account.screen";
import { LoginScreen } from "../screens/login.screen";
import { RegisterScreen } from "../screens/register.screen";

const Stack = createStackNavigator();

export const AccountNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);
