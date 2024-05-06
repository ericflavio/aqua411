//Nota: Esta é a primeira task de execução do APP, antes mesmo da index principal
import { Stack } from "expo-router";
import AuthProvider from '../contexts/auth';

export default function AppLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: 'grey',
          tabBarActiveTintColor: '#041e52ff',
          tabBarShowLabel: true,
        }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="login/index" />
      </Stack>
    </AuthProvider>

  )
}