import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { myStyles } from "../styles/stylesPagePromocao";
import { myStylesComuns } from '../styles/stylesComuns';
import { MaterialIcons } from "@expo/vector-icons";
import { GradienteFill } from '../componentes/gradienteFill';

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

function montaPromocao(vigente) {
  promo = pesquisaPromocaoVigente();
  console.log("promo: ", vigente, promo)
  return (
    <TouchableOpacity disabled={!vigente} style={(vigente ? myStyles.buttonPromoVigente :myStyles.buttonPromoEncerrada )} onPress={detalhaPromo}>
      <View style={myStyles.containerPromoCabecalho}>
        <Text style={myStyles.textoTituloPromo}>{promo.nome}</Text>
        <MaterialIcons name="card-giftcard" size={36} color={"pink"} />
      </View>
      <View style={myStyles.containerPromoPeriodo}>
        <MaterialIcons name="calendar-month" size={26} color={"grey"} />
        <Text style={myStylesComuns.textoComum}>{promo.dataInicio} <Text> até </Text></Text>
        <Text style={myStylesComuns.textoComum}>{promo.dataFim}</Text>
      </View>
      <Text style={myStyles.textoPromo}>{promo.descricao}</Text>
    </TouchableOpacity>
  )
};

//Tela principal HOME
export default function ViewPromocao() {

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={myStylesComuns.textoTituloPagina}>
            Promoções para você economizar
          </Text>
          <Text style={myStylesComuns.textoComum}>
            Mais detalhes você pode encontrar na loja e no atendimento via Whatsapp
          </Text>
        </View>

        {montaPromocao(true)}
        {montaPromocao(true)}
        {montaPromocao(false)}
        {montaPromocao(false)}

      </ScrollView>
    </SafeAreaView >
  )
}