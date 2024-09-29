import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="camera" options={{ headerShown: false }} />
      <Stack.Screen name="upload" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
