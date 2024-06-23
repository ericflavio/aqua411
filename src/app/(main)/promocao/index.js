import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";
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
    <TouchableOpacity disabled={!vigente} style={(vigente ? styles.buttonPromoVigente : styles.buttonPromoEncerrada)} onPress={detalhaPromo}>
      <View style={styles.containerPromoCabecalho}>
        <Text style={styles.textoTituloPromo}>{promo.nome}</Text>
        <MaterialIcons name="card-giftcard" size={styleApp.size.iconSizeButtonRegular} color={(vigente ? styleColor.tema10pSecundaria : styleColor.cinzaClaro)} />
      </View>
      <View style={styles.containerPromoPeriodo}>
        <MaterialIcons name="calendar-month" size={styleApp.size.iconSizeButtonRegular} color={"grey"} />
        <Text style={styleApp.textRegular}>{promo.dataInicio} <Text> até </Text></Text>
        <Text style={styleApp.textRegular}>{promo.dataFim}</Text>
      </View>
      <Text style={styles.textoPromo}>{promo.descricao}</Text>
    </TouchableOpacity>
  )
};

//Tela principal HOME
export default function ViewPromocao() {

  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <Text style={styleApp.textTitulo}>
            Promoções para você economizar
          </Text>
          <Text style={styleApp.textRegular}>
            Mais detalhes você pode encontrar na loja e no atendimento via Whatsapp
          </Text>
        </View>
        <View styles={styles.containerPromoLista}>
          {montaPromocao(true)}
          {montaPromocao(true)}
          {montaPromocao(true)}
          {montaPromocao(false)}
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}