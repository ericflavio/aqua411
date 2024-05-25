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
        tabBarInactiveTintColor: myStyleColor.corCinzMedio,
        tabBarActiveTintColor: myStyleColor.corTemaAppSecundario,
        tabBarShowLabel: true,
      }} >

      <Stack.Screen name="lojaEdtEndereco/index" options={{headerTitle:"Informações da loja"}}/>
      <Stack.Screen name="lojaEdtLocalizacao/index" options={{headerTitle:"Informações da loja"}}/>
    </Stack>
  )
}