import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { myStyles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { MaterialIcons } from "@expo/vector-icons";
import { GradienteFill } from '../../../componentes/gradienteFill';

//Funcçoes de apoio
function pesquisaPromocaoVigente() {
  var promo = {
    id: 0,
    nome: "Ganhe uma bag muito louca",
    descricao: "Acumule 10 ciclos no período da promoção, e ganhe uma bag. Simples assim!",
    dataInicio: "01-04-2024",
    dataFim: "30-06-2024",
    inTempoIndeterminado: false
  };
  return promo;
};

function detalhaPromo() {
  return
};

function montaPromocao(vigente) {
  promo = pesquisaPromocaoVigente();
  //console.log("promo: ", vigente, promo)
  return (
    <TouchableOpacity disabled={!vigente} style={(vigente ? myStyles.buttonPromoVigente : myStyles.buttonPromoEncerrada)} onPress={detalhaPromo}>
      <View style={myStyles.containerPromoCabecalho}>
        <Text style={myStyles.textoTituloPromo}>{promo.nome}</Text>
        <MaterialIcons name="card-giftcard" size={styleApp.size.iconSizeButtonRegular} color={(vigente ? styleColor.tema10pSecundaria : styleColor.cinzaClaro)} />
      </View>
      <View style={myStyles.containerPromoPeriodo}>
        <MaterialIcons name="calendar-month" size={styleApp.size.iconSizeButtonRegular} color={"grey"} />
        <Text style={styleApp.textRegular}>{promo.dataInicio} <Text> até </Text></Text>
        <Text style={styleApp.textRegular}>{promo.dataFim}</Text>
      </View>
      <Text style={myStyles.textoPromo}>{promo.descricao}</Text>
    </TouchableOpacity>
  )
};

//Tela principal HOME
export default function ViewPromocao() {

  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={styleApp.textTitulo}>
            Promoções para você economizar
          </Text>
          <Text style={styleApp.textRegular}>
            Mais detalhes você pode encontrar na loja e no atendimento via Whatsapp
          </Text>
        </View>
        <View styles={myStyles.containerPromoLista}>
          {montaPromocao(true)}
          {montaPromocao(true)}
          {montaPromocao(true)}
          {montaPromocao(false)}
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}