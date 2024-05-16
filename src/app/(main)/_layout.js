import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { myStylesColors } from '../../styles/stylesColors';

export default function LayoutPrincipal() {
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