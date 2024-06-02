import { MaterialIcons } from "@expo/vector-icons";
import { myStyleColor } from '../../styles/stylesColors';
import { myStyleApp } from '../../styles/styleApp';
import { ActivityIndicator, View, Image } from "react-native";
import { useContext , useCallback } from 'react';
import { AuthContext } from "../../contexts/auth";
import { Redirect, Tabs } from 'expo-router';
import { useFonts } from 'expo-font';

export default function AppLayout() {
  const { user, isLoading } = useContext(AuthContext);
  console.log("_layout (main)_ ", "isLoading: ", isLoading, " user: ", user !== null ? user.idLogin : "[null]", "isLiveAccount: ", user !== null && user.isLiveAccount !== undefined ? user.isLiveAccount : "[undefined]");
  const [fontsLoaded, fontError] = useFonts({
    'Lato-Bold': require('../../assets/fonts/Lato-Bold.ttf'),
    'Lato-Light': require('../../assets/fonts/Lato-Light.ttf'),
    'Lato-Regular': require('../../assets/fonts/Lato-Regular.ttf'),
    'Lato-Thin': require('../../assets/fonts/Lato-Thin.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
          <ActivityIndicator size="large" />
          <Image
            style={{
              width: 300,
              height: 300,
              overflow: "scroll",
              resizeMode: "contain",
              justifyContent: "center"
            }}
            source={require('../../assets/icones/app_icon_01.png')}
          />
        </View>
      )
    }
  }, [fontsLoaded, fontError]);


  //Procedimentos de recuperação de usário no storage local em curso
  console.log("fontsLoaded ", fontsLoaded, " fontError ", fontError );
  if (isLoading || !fontsLoaded) {
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
      tabBarInactiveTintColor: myStyleColor.corCinzaMedio,
      tabBarActiveTintColor: myStyleColor.corAzulEscuro,
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
            <MaterialIcons name="local-laundry-service" size={myStyleApp.size.iconSizeTabBar} color={color} />
        }}
      />

      <Tabs.Screen
        name="promocao/index"
        options={{
          title: "Promo",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="card-giftcard" size={myStyleApp.size.iconSizeTabBar} color={color} />
        }}
      />

      <Tabs.Screen
        name="conta/index"
        options={{
          title: "Conta",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="person" size={myStyleApp.size.iconSizeTabBar} color={color} />
        }}
      />
    </Tabs>
  )
}