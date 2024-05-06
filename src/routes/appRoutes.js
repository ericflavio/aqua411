//Define todas as rotas do app
import { Stack } from "expo-router";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import ViewSplash from '../app/splash/index';
import { myStylesComuns } from '../styles/stylesComuns';

export default function AppRoutes() {
  const { isLoading, user } = useContext(AuthContext);
  console.log("appRoutes:isloading,user: ", isLoading, user);

  //Retorna todas as rotas disponíveis
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: myStylesComuns.corCinzMedio,
        tabBarActiveTintColor: myStylesComuns.corTemaAppSecundario,
        tabBarShowLabel: true,
      }} >

      {isLoading ?
        <Stack.Screen name="splash/index" />
        :
        <Stack.Screen name="login/index" />
      }

    </Stack>
  )
}
