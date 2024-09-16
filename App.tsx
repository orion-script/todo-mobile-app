import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { Navigation } from "./navigation";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "./theme";
import Initial from "./components/Initial";

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}
{
  /* <ThemeProvider theme={theme}>
<AuthenticationContextProvider>
  <Navigation />
</AuthenticationContextProvider>
</ThemeProvider>
<ExpoStatusBar style="auto" /> */
}
