import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { myStyleColor } from "../../../styles/stylesColors";
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
        <MaterialIcons name="card-giftcard" size={myStyleApp.size.iconSizeButtonRegular} color={(vigente ? myStyleColor.tema10A : myStyleColor.cinzaClaro)} />
      </View>
      <View style={myStyles.containerPromoPeriodo}>
        <MaterialIcons name="calendar-month" size={myStyleApp.size.iconSizeButtonRegular} color={"grey"} />
        <Text style={myStyleApp.textoComum}>{promo.dataInicio} <Text> até </Text></Text>
        <Text style={myStyleApp.textoComum}>{promo.dataFim}</Text>
      </View>
      <Text style={myStyles.textoPromo}>{promo.descricao}</Text>
    </TouchableOpacity>
  )
};

//Tela principal HOME
export default function ViewPromocao() {

  return (
    <SafeAreaView style={myStyleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerScroll} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={myStyleApp.textoTituloPagina}>
            Promoções para você economizar
          </Text>
          <Text style={myStyleApp.textoComum}>
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