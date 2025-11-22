import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth stack */}
      <Stack.Screen name="(auth)" />

      {/* Tabs stack */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
