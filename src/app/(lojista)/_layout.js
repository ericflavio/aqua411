import { myStylesColors } from '../../styles/stylesColors';
import { ActivityIndicator, View, Image } from "react-native";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/auth";
import { Stack } from 'expo-router';

export default function AppLayout() {
  const { user, isLoading } = useContext(AuthContext);
  console.log("_layout (lojista)_ ", "isLoading: ", isLoading, " user: ", user !== null ? user.idLogin : "[null]", "isLiveAccount: ", user !== null && user.isLiveAccount !== undefined ? user.isLiveAccount : "[undefined]");

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        tabBarInactiveTintColor: myStylesColors.corCinzMedio,
        tabBarActiveTintColor: myStylesColors.corTemaAppSecundario,
        tabBarShowLabel: true,
      }} >

      <Stack.Screen name="lojaAdicionar/index" />
      
      <Stack.Screen name="lojaGerenciar/index" />
    </Stack>
  )
}