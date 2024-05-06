//Define todas as rotas do app
import { View, Text } from "react-native";
import { Stack } from "expo-router";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import ViewSplash from '../assets/viewSplash/index';

export default function AppRoutes() {
  const { isLoading, user } = useContext(AuthContext);
  console.log("appRoutes ---- isloading: ", isLoading);

  if (isLoading) {
    return (
      <ViewSplash />
    )
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: '#041e52ff',
        tabBarShowLabel: true,
      }} >
      {/*<Stack.Screen name="index" />*/}
      {user ? <Stack.Screen name="(main)" /> : <Stack.Screen name="login/index" />}
    </Stack>
  )
}
