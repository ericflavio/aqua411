//efa
import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { myStyles } from "../styles/stylesPageIndex";
import { myStylesComuns } from '../styles/stylesComuns';
import { GradienteFill } from '../componentes/gradienteFill';

//Tela principal
export default function ViewLogin() {
 
  //Seta tamanho ideal das VIEWS baseado no tamanho da tela do aparelho
  let screenHeight = 0;
  try {
    screenHeight = Dimensions.get('window').height;
  } catch {
    screenHeight = myStylesComuns.containerTamanhoMedioTelas;
  };
  let headerHeight = 0; //Eventual header na página
  let bodyHeight = screenHeight - headerHeight + 0;
  //console.log("screenHeight: ", screenHeight);
  //console.log("headerHeight: ", headerHeight);
  //console.log("bodyHeight  : ", bodyHeight);

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>

        <View style={{ height: bodyHeight, paddingBottom: 96 }}>
          <View style={myStyles.containerHeader}>
            <Text style={myStylesComuns.textoTituloPagina}>
              login
            </Text>
          </View>
          <View style={myStyles.containerBody1}>
            <Text>Body1</Text>
          </View>

          <View style={myStyles.containerBody2}>
           <Texto>Body2</Texto>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}