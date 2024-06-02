import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { myStyleColor } from "../../../styles/stylesColors";
import { MaterialIcons } from "@expo/vector-icons";
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { router } from 'expo-router';

//Funcçoes de apoio

//Tela principal HOME
export default function ViewConta() {
  const { user, logOut } = useContext(AuthContext);
  var name = "Olá!";
  user.name ? name = user.name : name = user.idLogin;

  function adicionarLoja() {
    router.navigate('/LojaEdtMenu');
  }
  async function logoutApp() {
    Alert.alert('SAIR', 'Você deseja sair do aplicativo agora?', [
      {
        text: 'Ficar',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'Sair', onPress: () => logOut() },
    ]);
  }

  return (
    <SafeAreaView style={myStyleApp.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={myStyleApp.textoTituloPagina}>
            {name}
          </Text>
          <Image
            style={myStyles.imageUser}
            source={require('../../../assets/icones/app_icon_02.png')}
          />
        </View>

        <View style={myStyles.containerBasics}>
          <TouchableOpacity style={myStyleApp.buttonFlatV} onPress={{}} >
            <MaterialIcons name="help-outline" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Ajuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatV} onPress={{}} >
            <MaterialIcons name="payment" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Pagamentos</Text>
          </TouchableOpacity>
        </View>

        <View style={myStyles.containerOthers}>
          <TouchableOpacity style={myStyleApp.buttonFlatHL} onPress={adicionarLoja} >
            <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Adicionar minha lavanderia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatHL} onPress={{}} >
            <MaterialIcons name="local-laundry-service" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Gerenciar minhas lavanderias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={myStyleApp.buttonFlatHL} onPress={{}} >
            <MaterialIcons name="business" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Adicionar franquia</Text>
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatHL} onPress={{}} >
            <MaterialIcons name="business-center" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Gerenciar minhas franquias</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={myStyleApp.buttonFlatTranspHL} onPress={logoutApp} >
          <MaterialIcons name="logout" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
          <Text style={myStyleApp.buttonTextStyleFlat}>Sair do app</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView >
  )
}