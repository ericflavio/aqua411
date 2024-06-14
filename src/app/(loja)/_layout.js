import { styleColor } from '../../styles/styleColors';
import { ActivityIndicator, View, Image } from "react-native";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/auth";
import { Stack } from 'expo-router';

export default function LojaLayout() {
  const { user, isLoading } = useContext(AuthContext);
  console.log("_layout (loja)_ ", "isLoading: ", isLoading, " user: ", user !== null ? user.idLogin : "[null]", "isLiveAccount: ", user !== null && user.isLiveAccount !== undefined ? user.isLiveAccount : "[undefined]");

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: "Informações da loja",
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
      <Stack.Screen name="lojaCadastroBasico/index"/>
      <Stack.Screen name="lojaMenu/index"/>
      <Stack.Screen name="lojaEndereco/index"/>
      <Stack.Screen name="lojaLocalizacao/index"/>
      <Stack.Screen name="lojaExpediente/index"/>
      <Stack.Screen name="lojaUnidades/index"/>
    </Stack>
  )
}