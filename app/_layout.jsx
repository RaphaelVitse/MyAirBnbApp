import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="(auth)/login" options={{ title: "LOGIN" }} />
      <Stack.Screen name="(auth)/signup" options={{ title: "SIGNUP" }} />
    </Stack>
  );
};

export default RootLayout;
