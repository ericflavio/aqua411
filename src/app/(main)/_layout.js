import { MaterialIcons } from "@expo/vector-icons";
import { myStylesColors } from '../../styles/stylesColors';
import { ActivityIndicator, View } from "react-native";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/auth";
import { Redirect, Tabs } from 'expo-router';

export default function AppLayout() {
  const { user, isLoading } = useContext(AuthContext);
  console.log("_layout(main)_ ",  "isLoading: ", isLoading , " user: ", user !== null ? user.login : "[null]",  "isContaAtiva: ", user !== null && user.isContaAtiva !== undefined ? user.isContaAtiva : "[undefined]");

  //Procedimentos de recuperação de usário no storage local em curso
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  //Procedimentos de recuperação de usário no storage local finalizado
  if (!user || user == null) {
    return <Redirect href="/reception" />;
  }

  if (user.isContaAtiva == undefined
    || user.isContaAtiva == false) {
    return <Redirect href="/login" />;
  }

  //Usuário logado e status ativo. Monta o layout do app
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarInactiveTintColor: myStylesColors.corCinzMedio,
      tabBarActiveTintColor: myStylesColors.corAzulEscuro,
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        fontSize: 16,
        //paddingBottom: 3
      },
      tabBarStyle: {
        position: "absolute",
        backgroundColor: "white",
        borderTopWidth: 0,
        borderRadius: 10,
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        height: 72,
      }

    }}>

      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="local-laundry-service" size={36} color={color} />
        }}
      />

      <Tabs.Screen
        name="promocao/index"
        options={{
          title: "Promo",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="card-giftcard" size={36} color={color} />
        }}
      />
    </Tabs>
  )
}