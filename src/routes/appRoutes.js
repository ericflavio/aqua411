//Define todas as rotas do app
import { Stack } from "expo-router";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import ViewSplash from '../app/splash/index';
import { myStylesComuns } from '../styles/stylesComuns';

export default function AppRoutes() {
  const { isLoading, user } = useContext(AuthContext);
  console.log("appRoutes:isloading,user: ", isLoading, user);

  //Mostra Splash se ainda estiver autenticando o usuário
  if (isLoading) {
    return (
      <ViewSplash />
    )
  }
  //Retorna todas as rotas disponíveis
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: myStylesComuns.corCinzMedio,
        tabBarActiveTintColor: myStylesComuns.corTemaAppSecundario,
        tabBarShowLabel: true,
      }} >
      {/*<Stack.Screen name="index" />*/}
      {!user || user == null
      ? 
      <Stack.Screen name="login/index" />
      : 
      <Stack.Screen name="(main)" />
      }
    </Stack>
  )
}
