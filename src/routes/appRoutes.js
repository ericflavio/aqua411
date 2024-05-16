//Define todas as rotas do app
import { Stack, Redirect } from "expo-router";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import { myStylesColors } from '../styles/stylesColors';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AppRoutes() {
  const { isLoading, user } = useContext(AuthContext);
  console.log("appRoutes:isloading,user: ", isLoading, user);

  //Configura o tipo de navegação das rotas
  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: myStylesColors.corCinzMedio,
          tabBarActiveTintColor: myStylesColors.corTemaAppSecundario,
          tabBarShowLabel: true,
        }} >

        <Stack.Screen name="index" />
        <Stack.Screen name="(main)" />
        <Stack.Screen name="login/index" />
        <Stack.Screen name="splash/index" />
      </Stack>
    </SafeAreaProvider>
  )
}
