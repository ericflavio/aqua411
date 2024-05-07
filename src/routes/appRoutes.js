//Define todas as rotas do app
import { Stack } from "expo-router";
import { useContext } from 'react';
import { AuthContext } from "../contexts/auth";
import ViewSplash from '../app/splash/index';
import { myStylesComuns } from '../styles/stylesComuns';

export default function AppRoutes() {
  const { isLoading, user } = useContext(AuthContext);
  console.log("appRoutes:isloading,user: ", isLoading, user);

  if (isLoading) {
    return <ViewSplash/>
  }

  //Configura o tipo de navegação das rotas
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: myStylesComuns.corCinzMedio,
        tabBarActiveTintColor: myStylesComuns.corTemaAppSecundario,
        tabBarShowLabel: true,
      }} >
    
      {user && user !== null ?
      <Stack.Screen name="(main)" /> :
      <Stack.Screen name="login/index" />}

    </Stack>
  )
}
