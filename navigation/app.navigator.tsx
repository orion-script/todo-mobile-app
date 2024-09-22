import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { HomeScreen } from "../screens/home.screen";
import { AllScreen } from "../screens/all.screen";
import { SettingsScreen } from "../screens/settings.screen";
import { ActiveScreen } from "../screens/active.screen";
import { CompletedScreen } from "../screens/completed.screen";

const Tab = createBottomTabNavigator();

const TAB_ICON: { [key: string]: keyof typeof Ionicons.glyphMap } = {
  Home: "home",
  All: "list",
  Setting: "settings",
  Active: "flash",
  Completed: "checkmark",
};

const createScreenOptions = ({ route }: { route: any }) => {
  const iconName = TAB_ICON[route.name as keyof typeof TAB_ICON];
  return {
    tabBarIcon: ({ size, color }: { size: number; color: string }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export const AppNavigator = () => (
  <Tab.Navigator screenOptions={createScreenOptions}>
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="All" component={AllScreen} />
    <Tab.Screen name="Active" component={ActiveScreen} />
    <Tab.Screen name="Completed" component={CompletedScreen} />
    <Tab.Screen name="Setting" component={SettingsScreen} />
  </Tab.Navigator>
);
