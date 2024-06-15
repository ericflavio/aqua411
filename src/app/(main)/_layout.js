import { MaterialIcons } from "@expo/vector-icons";
import { styleColor } from '../../styles/styleColors';
import { styleApp } from '../../styles/styleApp';
import { ActivityIndicator, View, Image } from "react-native";
import { useContext, useCallback } from 'react';
import { AuthContext } from "../../contexts/auth";
import { Redirect, Tabs } from 'expo-router';
import { useFonts } from 'expo-font';

export default function AppLayout() {
  const { user, isLoading } = useContext(AuthContext);

  const [fontsLoaded, fontError] = useFonts({
    'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('../../assets/fonts/Roboto-Light.ttf'),
    'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Medium': require('../../assets/fonts/Roboto-Medium.ttf'),
    'Roboto-LightItalic': require('../../assets/fonts/Roboto-LightItalic.ttf'),
  });

  function carregando() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 12 }}>
        <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} />
        <Image
          style={{
            width: 120,
            height: 120,
            overflow: "scroll",
            resizeMode: "contain",
            justifyContent: "center"
          }}
          source={require('../../assets/icones/app_icon_01.png')}
        />
      </View>
    )
  }

  //Aguarda load das fontes do app
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      return carregando()
    }
  }, [fontsLoaded, fontError]);

  //Procedimentos de recuperação de usário no storage local em curso
  if (isLoading || !fontsLoaded) {
    return carregando()
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
      tabBarInactiveTintColor: styleColor.cinzaMedio,
      tabBarActiveTintColor: styleColor.tema30pPrincipal,
      tabBarShowLabel: false,
      tabBarLabelStyle: {
        fontSize: 16,
        paddingBottom: 6,
      },
      tabBarStyle: {
        position: "absolute",
        backgroundColor: styleColor.tema60pClaro,
        borderTopWidth: 0,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
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
            <MaterialIcons name="local-laundry-service" size={styleApp.size.iconSizeTabBar} color={color} />
        }}
      />

      <Tabs.Screen
        name="promocao/index"
        options={{
        title: "Promo",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="card-giftcard" size={styleApp.size.iconSizeTabBar} color={color} />
        }}
      />

      <Tabs.Screen
        name="conta/index"
        options={{
        title: "Conta",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="person" size={styleApp.size.iconSizeTabBar} color={color} />
        }}
      />

      <Tabs.Screen
        name="(contas)"
        options={{
        title: "Contas",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="person" size={styleApp.size.iconSizeTabBar} color={color} />
        }}
      />
    </Tabs>
  )
}