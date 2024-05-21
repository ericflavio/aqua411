import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { myStyles } from "./styles";
import { myStylesComuns } from '../../../styles/stylesComuns';
import { myStylesColors } from "../../../styles/stylesColors";
import { MaterialIcons } from "@expo/vector-icons";
import { GradienteFill } from '../../../componentes/gradienteFill';

//Funcçoes de apoio

//Tela principal HOME
export default function ViewCadastro() {

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={myStylesComuns.textoTituloPagina}>
            Seu cadastro
          </Text>
          <Text style={myStylesComuns.textoComum}>
            Inclua lojas e franquias, quando desejar
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}