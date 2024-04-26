import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { myStyles } from "../styles/stylesPagePromocao";
import { myStylesComuns } from '../styles/stylesComuns';
import { MaterialIcons } from "@expo/vector-icons";


//Funcçoes de apoio
function pesquisaPromocaoVigente() {
  var promo = {
    id: 0,
    nome: "Ganhe uma bag",
    descricao: "Acumule 10 ciclos entre 01 de Abril e 30 de Junho, e ganhe uma bag. Simples assim!",
    dataInicio: "01-04-2024",
    dataFim: "30-06-2024"
  };
  return promo;
};

function detalhaPromo() {
  return 
};

function montaPromocao(promo) {
  promo = pesquisaPromocaoVigente();
  console.log("promo: ", promo)
  return (
    <TouchableOpacity style={myStyles.buttonPromoVigente} onPress={detalhaPromo}>
      <Text style={myStyles.textoTituloPromo}>{promo.nome}</Text>
      <Text>Período: </Text><Text style={myStyles.textoPromo}>{[promo.dataInicio, promo.dataFim]}</Text>
      <Text style={myStyles.textoPromo}>{promo.descricao}</Text>
    </TouchableOpacity>
  )
};

//Tela principal HOME
export default function ViewPromocao() {

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
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={{ height: bodyHeight, paddingBottom: 96 }}>
          <View style={myStyles.containerHeader}>
            <Text style={myStylesComuns.textoTituloPagina}>
              Nossas promoções para você economizar
            </Text>
          </View>

          <View style={myStyles.containerBody1}>
            <View style={myStyles.containerPromoVigente}>
              <MaterialIcons name="card-giftcard" size={36} color={"pink"} />
              <Text style={myStylesComuns.textoSubtitulo}>
                Essas aqui você ainda pode participar
              </Text>
            </View>
          </View>

          {montaPromocao()}

          <View style={myStyles.containerBody2}>
            <View style={myStyles.containerPromoEncerrada}>
              <MaterialIcons name="card-giftcard" size={36} color={"grey"} />
              <Text style={myStylesComuns.textoSubtitulo}>
                Essas você perdeu
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}