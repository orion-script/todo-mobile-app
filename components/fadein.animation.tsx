import React, { useRef, useEffect, ReactNode } from "react";
import { Animated, ViewStyle } from "react-native";

// Define the props interface
interface FadeInViewProps {
  duration?: number; // Duration is optional
  children: ReactNode; // Children can be React nodes (elements, text, etc.)
  style?: ViewStyle; // Optional style property for the view
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  duration = 1500,
  children,
  style,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, duration]);

  return (
    <Animated.View
      style={{
        ...style, // Spread the incoming style prop
        opacity: fadeAnim, // Bind opacity to the animated value
      }}
    >
      {children}
    </Animated.View>
  );
};
