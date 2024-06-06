import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from "react-native";
import { myStyles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
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
    router.navigate('/lojaCadastroBasico');
  }
  function listarUnidades() {
    router.navigate('/lojaUnidades');
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
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={styleApp.textoTituloPagina}>
            {name}
          </Text>
          <Image
            style={myStyles.imageUser}
            source={require('../../../assets/icones/app_icon_02.png')}
          />
        </View>

        <View style={myStyles.containerBasics}>
          <TouchableOpacity style={styleApp.buttonFlatV} onPress={{}} >
            <MaterialIcons name="help-outline" size={styleApp.size.iconSizeButtonRegular} color={styleColor.buttonTextFlat} />
            <Text style={styleApp.buttonTextStyleFlat}>Ajuda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleApp.buttonFlatV} onPress={{}} >
            <MaterialIcons name="payment" size={styleApp.size.iconSizeButtonRegular} color={styleColor.buttonTextFlat} />
            <Text style={styleApp.buttonTextStyleFlat}>Pagamentos</Text>
          </TouchableOpacity>
        </View>

        <View style={myStyles.containerOthers}>
          <TouchableOpacity style={styleApp.buttonFlatHL} onPress={adicionarLoja} >
            <MaterialIcons name="add-business" size={styleApp.size.iconSizeButtonRegular} color={styleColor.buttonTextFlat} />
            <Text style={styleApp.buttonTextStyleFlat}>Cadastrar uma loja que possuo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleApp.buttonFlatHL} onPress={listarUnidades} >
            <MaterialIcons name="local-laundry-service" size={styleApp.size.iconSizeButtonRegular} color={styleColor.buttonTextFlat} />
            <Text style={styleApp.buttonTextStyleFlat}>Gerenciar minhas lojas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styleApp.buttonFlatHL} onPress={{}} >
            <MaterialIcons name="business" size={styleApp.size.iconSizeButtonRegular} color={styleColor.textoRegular} />
            <Text style={styleApp.buttonTextStyleFlat}>Cadastrar uma franquia </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styleApp.buttonFlatHL} onPress={{}} >
            <MaterialIcons name="business-center" size={styleApp.size.iconSizeButtonRegular} color={styleColor.buttonTextFlat} />
            <Text style={styleApp.buttonTextStyleFlat}>Gerenciar minhas franquias</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styleApp.buttonFlatHL_transp} onPress={logoutApp} >
          <MaterialIcons name="logout" size={styleApp.size.iconSizeButtonRegular} color={styleColor.buttonTextFlat} />
          <Text style={styleApp.buttonTextStyleFlat}>Sair do app</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView >
  )
}