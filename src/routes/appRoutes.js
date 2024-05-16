//Define todas as rotas do app
import { Stack, Redirect } from "expo-router";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import { myStylesColors } from '../styles/stylesColors';

//Seta a rota inicial
export const unstable_settings = {
  initialRouteName: "splash/index",
};

export default function AppRoutes() {
  const { isLoading, user } = useContext(AuthContext);
  console.log("appRoutes:isloading,user: ", isLoading, user);

  //Procedimentos de recuperação de usário no storage local em curso
  if (isLoading || !user || user === null) {
    console.log(">splash");
    return (
      <Stack
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: myStylesColors.corCinzMedio,
          tabBarActiveTintColor: myStylesColors.corTemaAppSecundario,
          tabBarShowLabel: true,
        }} >

        <Stack.Screen name="splash/index" />
        <Stack.Screen name="login/index" />

      </Stack>
    )
  }

  //Configura o tipo de navegação das rotas
  console.log(">main");
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
