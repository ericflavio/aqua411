import { MaterialIcons } from "@expo/vector-icons";
import { myStylesColors } from '../../styles/stylesColors';
import { myStylesComuns } from '../../styles/stylesComuns';
import { ActivityIndicator, View, Image } from "react-native";
import { useContext } from 'react';
import { AuthContext } from "../../contexts/auth";
import { Redirect, Tabs } from 'expo-router';

export default function AppLayout() {
  const { user, isLoading } = useContext(AuthContext);
  console.log("_layout (main)_ ", "isLoading: ", isLoading, " user: ", user !== null ? user.idLogin : "[null]", "isLiveAccount: ", user !== null && user.isLiveAccount !== undefined ? user.isLiveAccount : "[undefined]");

  //Procedimentos de recuperação de usário no storage local em curso
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
        <ActivityIndicator size="large" />
        <Image
          style={{
            width: 140,
            height: 140,
            overflow: "scroll",
            resizeMode: "contain",
            justifyContent: "center"
          }}
          source={require('../../assets/icones/app_icon_01.png')}
        />
      </View>
    )
  }

  //Procedimentos de recuperação de usário no storage local finalizado
  if (!user || user == null) {
    return <Redirect href="/reception" />;
  }

  if (user.isLiveAccount == undefined
    || user.isLiveAccount == false) {
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
        paddingBottom: 6,
      },
      tabBarStyle: {
        position: "absolute",
        backgroundColor: "white",
        borderTopWidth: 0,
        borderRadius: 0,
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 0,
        height: 74,
      }

    }}>

      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="local-laundry-service" size={myStylesComuns.size.iconSizeTabBar} color={color} />
        }}
      />

      <Tabs.Screen
        name="promocao/index"
        options={{
          title: "Promo",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="card-giftcard" size={myStylesComuns.size.iconSizeTabBar} color={color} />
        }}
      />

      <Tabs.Screen
        name="conta/index"
        options={{
          title: "Conta",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="person" size={myStylesComuns.size.iconSizeTabBar} color={color} />
        }}
      />
    </Tabs>
  )
}