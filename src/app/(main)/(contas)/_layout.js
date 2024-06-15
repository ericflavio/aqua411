import { MaterialIcons } from "@expo/vector-icons";
import { styleColor } from '../../../styles/styleColors';
import { styleApp } from '../../../styles/styleApp';
import { useContext } from 'react';
import { AuthContext } from "../../../contexts/auth";
import { View, Text } from 'react-native'
import { Tabs } from 'expo-router';
//Para top tab navigation: incio
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
//Fim
import { ViewContaPessoal } from './contaPessoal/index';
import { ViewContaLojista } from './contaLojista/index';
import { styleSize } from "../../../styles/styleSize";

//const { Navigator, Screen } = createMaterialTopTabNavigator();
const Tab = createMaterialTopTabNavigator();

export default function layoutContas() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        tabBarInactiveTintColor: styleColor.cinzaMedio,
        tabBarActiveTintColor: styleColor.tema10pSecundaria,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: styleSize.textoSize3,
          fontWeight: '300',
          paddingVertical: 6,
          textTransform: "capitalize"
        },
        tabBarIndicatorStyle: {
          backgroundColor: styleColor.tema30pPrincipal,
          height: 4
        },
        tabBarStyle: {
          paddingTop:24,
          //position: "absolute",
          backgroundColor: 'white',
          borderTopWidth: 0,
          //borderTopLeftRadius: 16,
          //borderTopRightRadius: 16,
          //bottom: 0,
          //left: 0,
          //right: 0,
          //elevation: 0,
          height: 76,
        }
      }}
    >
      <Tab.Screen name="Eu" component={ViewContaPessoal} />
      <Tab.Screen name="Empreendimento" component={ViewContaLojista} />
    </Tab.Navigator>
  )
}