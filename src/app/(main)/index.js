import React, { useState, useContext } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { styles } from "./styles";
import { styleApp } from '../../styles/styleApp';
import { GradienteFill } from '../../componentes/gradienteFill';
import { AuthContext } from "../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { MontaMaquinario } from '../../componentes/montaMaquinario';

var cenarioTeste = 1;
var seca = [1, 1, 1];
var lava = [1, 1, 1];
var relogioOnOff = true;
var flagViewStatusMaquina = true; //TODO: não está sendo usado

//Seta cor do icone de horário de funcionamento
function horarioFuncionamento(in24h, horaIni, horaFim) {
  if (horaIni == undefined) horaIni = "00:00"
  if (horaFim == undefined) horaFim = "23:59"
  if (in24h == undefined) in24h = false;

  //TODO: tratar horário faltando zeros na frente

  if (in24h) return true;

  hora1 = horaIni.split(":");
  hora2 = horaFim.split(":");

  var d = new Date();
  var dataAbre = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora1[0], hora1[1]); //Horário abertura
  var dataFecha = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora2[0], hora2[1]); //Horario fechamento

  var dataAgora = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());

  if (dataAgora >= dataAbre & dataAgora < dataFecha) {
    //console.log("<<Aberta");
    return true;
  } else {
    //console.log("<<Fechada");
    return false;
  }
  //return data1 > data2;
};

//Tela principal HOME
export default function viewMain() {
  const { user } = useContext(AuthContext);
  console.log("(main)/index <inicio>");

  //Consulta API com novos status dos equipamentos
  function atualizarStatus() {

  }

  //Seta tamanho ideal das VIEWS baseado no tamanho da tela do aparelho
  let screenHeight = 0;
  try {
    screenHeight = Dimensions.get('window').height;
  } catch {
    screenHeight = styleApp.containerTamanhoMedioTelas;
  };
  let headerHeight = 0; //Eventual header na página
  let bodyHeight = screenHeight - headerHeight + 0;

  //sem loja favoritada OU loja com status diferente de "ativa"
  if (!user.idFavoriteStore || user.idFavoriteStore == null) {
    return (
      <SafeAreaView style={styleApp.containerSafeArea}>
        {GradienteFill()}
        <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>

          <View style={{ height: bodyHeight, paddingBottom: 96 }}>
            <View style={styles.containerHeader}>
              <Text style={styleApp.textTitulo}>
                Informações da sua lavanderia favorita
              </Text>
            </View>
            <View style={styles.containerBody1}>
              <View style={styles.containerUnidadeEndereco}>
                <Text style={styleApp.textRegular}>
                  Você ainda não selecionou uma lavanderia favorita
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styleApp.buttonHC} onPress={atualizarStatus}>
              <MaterialIcons name="location-on" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonRegular} />
              <Text style={styleApp.textButtonRegular}>Pesquisar lavanderias</Text>
            </TouchableOpacity>

            <View style={styles.containerBody2}>
              {MontaMaquinario(null, "conjunto", false)}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView >
    )
  }

  //Com loja favoritada
  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>

        <View style={{ height: bodyHeight, paddingBottom: 96 }}>
          <View style={styles.containerHeader}>
            <Text style={styleApp.textTitulo}>
              Sua lavanderia fora de casa
            </Text>
          </View>
          <View style={styles.containerBody1}>
            <View style={styles.containerUnidadeEndereco}>
              {/*  <Image
                style={styles.imgLocalizacao}
                source={require('../../assets/icones/icon_local2.png')}
              /> */}
              <MaterialIcons name="location-on" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonRegular} />
              <Text style={styleApp.textSubtitulo}>
                Unidade: ASA NORTE
              </Text>
            </View>

            <View style={styles.containerHorarioFuncionamento}>
              {relogioOnOff == true ?
                <Image
                  style={styles.imgRelogio}
                  source={require('../../assets/icones/aqua_relogio_abertos.png')}
                /> :
                <Image
                  style={styles.imgRelogio}
                  source={require('../../assets/icones/aqua_relogio_fechados.png')}
                />
              }
              <Text style={styleApp.textRegular}>
                Abertos diariamente de 6h às 23h
              </Text>
            </View>

            <View style={styles.containerFacilidades}>
              <TouchableOpacity style={styleApp.buttonFlatHL_transp} disabled={false} onPress={atualizarStatus}>
                <Text style={styleApp.textButtonFlat}>Selecione outra loja aqui</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.containerBody2}>
            {MontaMaquinario(null, "conjunto", false)}

            <View style={styles.containerUltimaAtualizacao}>
              <Image
                style={styles.imgRelogio}
                source={require('../../assets/icones/aqua_relogio_comum.png')}
              />
              <Text style={styleApp.textRegular}>
                26/06/2024 08:36
              </Text>
            </View>

            {flagViewStatusMaquina == true ?
              <TouchableOpacity style={styleApp.buttonHC} onPress={atualizarStatus}>
                <Text style={styleApp.textButtonRegular}>Atualizar</Text>
              </TouchableOpacity> : ""
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}