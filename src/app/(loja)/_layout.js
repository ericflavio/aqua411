import { myStyleColor } from '../../styles/stylesColors';
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
        tabBarInactiveTintColor: myStyleColor.corCinzaMedio,
        tabBarActiveTintColor: myStyleColor.corTema10B,
        tabBarShowLabel: true,
        headerMode: 'screen',
        //headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontFamily: 'Lato-Bold',
        },
      }} >

      {/* Títulos por página: inserir options={{headerTitle:"Informações da loja"}} */}
      <Stack.Screen name="LojaEdtMenu/index"/>
      <Stack.Screen name="lojaEdtEndereco/index"/>
      <Stack.Screen name="lojaEdtLocalizacao/index"/>
      <Stack.Screen name="lojaEdtHorario/index"/>
    </Stack>
  )
}