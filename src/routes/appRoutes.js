//Define todas as rotas do app
import { Stack } from "expo-router";
import { styleColor } from '../styles/styleColors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AppRoutes() {
  //Configura o tipo de navegação das rotas
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: styleColor.cinzaMedio,
          tabBarActiveTintColor: styleColor.tema10pTerciaria,
          tabBarShowLabel: true,
        }} >

        <Stack.Screen name="(main)" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="reception/index" />
      </Stack>
    </SafeAreaProvider>
  )
}
