import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function TabRoutsLayout (){
  return (
    <Tabs screenOptions={{headerShown:false}}>
      <Tabs.Screen 
        name="index"
        options={{
          title:"Inicio",
          tabBarIcon: ({size , color}) => 
            <MaterialIcons name="local-laundry-service" size={size} color={color}/>
        }}
      />

      <Tabs.Screen 
        name="login"
        options={{
          title:"Login",
          tabBarIcon: ({size , color}) => 
              <MaterialIcons name="person" size={size} color={color}/>
        }}
      />

      <Tabs.Screen 
        name="promocao"
        options={{
          title:"Promo",
          tabBarIcon: ({size , color}) => 
              <MaterialIcons name="card-giftcard" size={size} color={color}/>
        }}
      />
    </Tabs>
  )
}