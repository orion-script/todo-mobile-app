// Button.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from "react-native";

// Define the props for the button
interface ButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
}

// Create the Button component
const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled = false,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle, disabled && styles.disabledButton]}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

// Styles for the button and text
const styles = StyleSheet.create({
  button: {
    width: 325,
    height: 50,
    backgroundColor: "#458AE5",
    padding: 10,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "semibold",
  },
});

export default Button;
