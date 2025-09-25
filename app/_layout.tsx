import { Stack } from "expo-router";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";

export default function RootLayout() {
  return (
  <ThemeProvider
    value={{
      ...DarkTheme,
      colors: {
        ...DarkTheme.colors,
        background: "black", // koko apin tausta mustaksi
      },
    }}
  >
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  </ThemeProvider>
  );
}