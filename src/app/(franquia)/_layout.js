import { styleColor } from '../../styles/styleColors';
import { ActivityIndicator, View, Image } from "react-native";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/auth";
import { Stack } from 'expo-router';

export default function FranquiaLayout() {
  const { user, isLoading } = useContext(AuthContext);
  console.log("_layout (Franquia)_ ", "isLoading: ", isLoading, " user: ", user !== null ? user.idLogin : "[null]", "isLiveAccount: ", user !== null && user.isLiveAccount !== undefined ? user.isLiveAccount : "[undefined]");

  return (
    <Stack
      initialRouteName='franquiaCadastroBasico/index'
      backBehavior='history'
      screenOptions={{
        headerShown: true,
        headerTitle: "Informações da Franquia",
        animationEnabled: true,
        tabBarInactiveTintColor: styleColor.cinzaMedio,
        tabBarActiveTintColor: styleColor.tema10pTerciaria,
        tabBarShowLabel: true,
        headerMode: 'screen',
        //headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontFamily: 'Roboto-Bold',
        },
      }} >

      {/* Títulos por página: inserir options={{headerTitle:"Informações da loja"}} */}
      <Stack.Screen name="franquiaUnidades/index" />
      <Stack.Screen name="franquiaCadastroBasico/index" />
      <Stack.Screen name="franquiaMenu/index" />
    </Stack>
  )
}