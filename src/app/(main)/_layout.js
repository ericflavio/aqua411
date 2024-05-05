import { Redirect, Stack } from "expo-router";

export default function MainLayout() {
  auth = false;
  if (!auth) {
    return <Redirect href="/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: '#041e52ff',
        tabBarShowLabel: true,
      }} >
      <Stack.Screen name="principal" />
    </Stack>
  )
}
