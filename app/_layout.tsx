import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen 
    name="views/driver/(tabs)" 
    options={{ 
      headerShown: false 
      }} />
  </Stack>;
}
