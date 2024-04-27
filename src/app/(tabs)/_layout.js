import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabRoutsLayout (){

  return (
    <Tabs screenOptions={{headerShown:false, 
      tabBarInactiveTintColor: 'grey',
      tabBarActiveTintColor: '#041e52ff',
      tabBarShowLabel: true,
      tabBarLabelStyle: {
        fontSize: 16,
        paddingBottom: 3
      },
      tabBarStyle: {
        position: "absolute",
        backgroundColor: "white",
        borderTopWidth: 0,
        borderRadius: 10,
        bottom: 6,
        left: 14,
        right: 14,
        elevation: 0,
        height: 72,
      }

      }}>

      <Tabs.Screen 
        name="index"
        options={{
          title:"Inicio",
          tabBarIcon: ({size , color}) => 
            <MaterialIcons name="local-laundry-service" size={36} color={color}/>
        }}
      />

      <Tabs.Screen 
        name="login"
        options={{
          title:"Cadastro",
          tabBarIcon: ({size , color}) => 
              <MaterialIcons name="person" size={36} color={color}/>
        }}
      />

      <Tabs.Screen 
        name="promocao"
        options={{
          title:"Promo",
          tabBarIcon: ({size , color}) => 
              <MaterialIcons name="card-giftcard" size={36} color={color}/>
        }}
      />

      <Tabs.Screen 
        name="saibaMais"
        options={{
          title:"Saiba",
          tabBarIcon: ({size , color}) => 
              <MaterialIcons name="water-drop" size={36} color={color}/>
        }}
      />
    </Tabs>
  )
}