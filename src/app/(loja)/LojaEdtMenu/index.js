import React, { useContext } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";

//Tela principal
export default function ViewEdtMenu() {
  const { user } = useContext(AuthContext);
  console.log("ViewEdtMenu Loja <inicio>");

  const { navigateParmLoja } = useLocalSearchParams();
  var loja = JSON.parse(navigateParmLoja)
  console.log("loja: ", loja.endereco);

  function goTo() {
    //Compoe a parte do endereco no objeto LOJA e passa adiante
    const loja = {};
    loja.endereco = endereco;
    loja.endereco.numero = numero;
    loja.endereco.complemento = complemento;

    router.navigate({
      pathname: "/lojaEdtLocalizacao",
      params: {
        navigateParmLoja: JSON.stringify(loja)
      }
    })
  }

  return (
    <SafeAreaView style={myStyleApp.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerPrincipalScroll} showsVerticalScrollIndicator={false}>

        <View style={myStyles.containerHeader}>
          <Text style={myStyleApp.textoSubtitulo}>Loja #1 - Asa Norte</Text>
        </View>

        <View style={myStyles.containerPrincipal}>
          <TouchableOpacity style={myStyleApp.button} disabled={!flagEditavel} onPress={goTo} >
            <View style={myStyleApp.buttonContainerWithIconHC}>
              {!flagEditavel ? <ActivityIndicator /> : ""}
              <Text style={myStyleApp.buttonTextStyle}>Endereço</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}