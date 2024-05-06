import { Redirect, Stack } from "expo-router";

export default function MainLayout() {
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