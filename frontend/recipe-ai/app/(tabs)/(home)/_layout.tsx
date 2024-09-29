import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="recipes/[id]"
        options={{
          headerTitle: "Recipe",
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
};

export default Layout;
