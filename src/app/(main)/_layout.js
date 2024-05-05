import { Redirect, Stack } from "expo-router";
import React , {useContext} from 'react';
import { AuthContext } from "../../contexts/auth";

export default function MainLayout() {
  auth = false;
  const { user } = useContext(AuthContext);
  console.log("auth<4>: ", user);
  if (!auth) {
    console.log("<3>")
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
