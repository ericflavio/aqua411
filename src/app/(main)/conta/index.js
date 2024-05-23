import React, { useState, useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import { myStyles } from "./styles";
import { myStylesComuns } from '../../../styles/stylesComuns';
import { myStylesColors } from "../../../styles/stylesColors";
import { MaterialIcons } from "@expo/vector-icons";
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { router } from 'expo-router';

//Funcçoes de apoio

//Tela principal HOME
export default function ViewContaGestao() {
  const { user } = useContext(AuthContext);
  var name = "Olá!";
  user.name ? name = user.name : name = user.idLogin;

  const iconSize = 32;

  function adicionarLoja() {
    console.log("+loja")
    router.navigate ('lojaAdicionar/index');
  }

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={myStylesComuns.textoTituloPagina}>
            {name}
          </Text>
          <Image
            style={myStyles.imageUser}
            source={require('../../../assets/icones/app_icon_02.png')}
          />
        </View>

        <View style={myStyles.containerBasics}>
          <TouchableOpacity style={myStylesComuns.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStylesComuns.buttonContainerWithIconV}>
              <MaterialIcons name="help-outline" size={iconSize} color={myStylesColors.corTextoPadrao} />
              <Text style={myStylesComuns.buttonTextStyleFlat}>Ajuda</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={myStylesComuns.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStylesComuns.buttonContainerWithIconV}>
              <MaterialIcons name="payment" size={iconSize} color={myStylesColors.corTextoPadrao} />
              <Text style={myStylesComuns.buttonTextStyleFlat}>Pagamentos</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={myStylesComuns.textoComum}>Cadastre suas lavanderias</Text>
        <View style={myStyles.containerOthers}>
          <TouchableOpacity style={myStylesComuns.buttonFlatWithBgCollor} onPress={adicionarLoja} >
            <View style={myStylesComuns.buttonContainerWithIconH}>
              <MaterialIcons name="add-business" size={iconSize} color={myStylesColors.corTextoPadrao} />
              <Text style={myStylesComuns.buttonTextStyleFlat}>Adicionar nova loja</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={myStylesComuns.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStylesComuns.buttonContainerWithIconH}>
              <MaterialIcons name="local-laundry-service" size={iconSize} color={myStylesColors.corTextoPadrao} />
              <Text style={myStylesComuns.buttonTextStyleFlat}>Gerenciar minhas lojas</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={myStylesComuns.textoComum}>Opções para franqueadores</Text>
        <View style={myStyles.containerOthers}>
          <TouchableOpacity style={myStylesComuns.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStylesComuns.buttonContainerWithIconH}>
              <MaterialIcons name="business" size={iconSize} color={myStylesColors.corTextoPadrao} />
              <Text style={myStylesComuns.buttonTextStyleFlat}>Adicionar franquia</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={myStylesComuns.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStylesComuns.buttonContainerWithIconH}>
              <MaterialIcons name="business-center" size={iconSize} color={myStylesColors.corTextoPadrao} />
              <Text style={myStylesComuns.buttonTextStyleFlat}>Gerenciar minhas franquias</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}