import { MaterialIcons } from "@expo/vector-icons";
import { styleColor } from '../../../styles/styleColors';
import { styleApp } from '../../../styles/styleApp';
import { useContext } from 'react';
import { AuthContext } from "../../../contexts/auth";
import { Tabs } from 'expo-router';

export default function layoutContas() {
  const { user, isLoading } = useContext(AuthContext);

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarInactiveTintColor: styleColor.cinzaMedio,
      tabBarActiveTintColor: styleColor.tema30pPrincipal,
      tabBarShowLabel: true,
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
          title: "Eu",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="local-laundry-service" size={styleApp.size.iconSizeTabBar} color={color} />
        }}
      />

      <Tabs.Screen
        name="contaLojista/index"
        options={{
          title: "Lojas",
          tabBarIcon: ({ size, color }) =>
            <MaterialIcons name="card-giftcard" size={styleApp.size.iconSizeTabBar} color={color} />
        }}
      />
    </Tabs>
  )
}