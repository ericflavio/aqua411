//Define todas as rotas do app
import { Stack, Redirect } from "expo-router";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import ViewSplash from '../app/splash/index';
import { myStylesColors } from '../styles/stylesColors';

export default function AppRoutes() {
  const { isLoading, user } = useContext(AuthContext);
  console.log("appRoutes:isloading,user: ", isLoading, user);

  //Procedimentos de recuperação de usário no storage local em curso
  if (isLoading) {
    return <ViewSplash />
  }

  //Configura o tipo de navegação das rotas
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: myStylesColors.corCinzMedio,
        tabBarActiveTintColor: myStylesColors.corTemaAppSecundario,
        tabBarShowLabel: true,
      }} >

      <Stack.Screen name="login/index" />
      <Stack.Screen name="(main)" />

    </Stack>
  )
}
