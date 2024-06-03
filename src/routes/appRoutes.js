//Define todas as rotas do app
import { Stack } from "expo-router";
import { myStyleColor } from '../styles/stylesColors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AppRoutes() {
  //Configura o tipo de navegação das rotas
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: myStyleColor.cinzaMedio,
          tabBarActiveTintColor: myStyleColor.tema10B,
          tabBarShowLabel: true,
        }} >

        <Stack.Screen name="(main)" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="reception/index" />
      </Stack>
    </SafeAreaProvider>
  )
}
