import React, { useContext } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";

//Tela principal
export default function ViewEdtMenu() {
  console.log("ViewEdtMenu Loja <inicio>");
  const { user } = useContext(AuthContext);
  const { navigateParmLojaId } = useLocalSearchParams();
  var idLoja = "";
  if (navigateParmLojaId) {
    idLoja = JSON.parse(navigateParmLojaId)
  }
  console.log("loja-id: ", idLoja);

  function goTo() {
    router.navigate({
      pathname: "/lojaEdtEndereco",
      params: {
        navigateParmLojaId: JSON.stringify(idLoja)
      }
    })
  }

  return (
    <SafeAreaView style={myStyleApp.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerPrincipalScroll} showsVerticalScrollIndicator={false}>

        {/*   <View style={myStyles.containerHeader}>
          <Text style={myStyleApp.textoSubtitulo}>Loja #1 - Asa Norte</Text>
        </View> */}

        <View style={myStyles.containerPrincipal}>
          <TouchableOpacity style={myStyleApp.button} disabled={false} onPress={goTo} >
              <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyle}>Endereço</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}