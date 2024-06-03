import React, { useState, useContext } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../styles/styleApp';
import { GradienteFill } from '../../componentes/gradienteFill';
import { AuthContext } from "../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";

var cenarioTeste = 1;
var seca = [1, 1, 1];
var lava = [1, 1, 1];
var relogioOnOff = true;
var flagViewStatusMaquina = true; //TODO: não está sendo usado
var imgMaq = {};

//Monta cada máquina com seu respectivo status
function maquina(tipMaq, idMaq, status, view) {
  if (tipMaq == undefined) tipMaq = "lava"; // Espera "lava" ou "seca"
  if (idMaq == undefined) idMaq = 0;
  if (status == undefined) status = 1;
  if (view == undefined || view == false) flagViewStatusMaquina = false;

  var txStatus = "Indefinido";
  tipMaq = tipMaq.toUpperCase();

  if (!flagViewStatusMaquina) { status = 1 };

  switch (status) {
    case 1:
      txStatus = "Disponível";
      if (tipMaq == undefined || tipMaq == "LAVA") {
        imgMaq = require('../../assets/maquinas/lava_disp.png')
      } else {
        imgMaq = require('../../assets/maquinas/seca_disp.png')
      }
      break;
    case 2:
      txStatus = "Ocupada";
      if (tipMaq == undefined || tipMaq == "LAVA") {
        imgMaq = require('../../assets/maquinas/lava_emuso.png')
      } else {
        imgMaq = require('../../assets/maquinas/seca_emuso.png')
      }
      break;
    case 3:
      txStatus = "Manutenção";
      if (tipMaq == undefined || tipMaq == "LAVA") {
        imgMaq = require('../../assets/maquinas/lava_manut.png')
      } else {
        imgMaq = require('../../assets/maquinas/seca_manut.png')
      }
      break;
    default:
      txStatus = "Disponível";
      if (tipMaq == undefined || tipMaq == "LAVA") {
        imgMaq = require('../../assets/maquinas/lava_disp.png')
      } else {
        imgMaq = require('../../assets/maquinas/seca_disp.png')
      }
  };

  if (tipMaq == "SECA") {
    return (
      <View>
        <View style={myStyles.containerLavaSeca}>
          <Text style={myStyleApp.textoPequeno}>
            {tipMaq + " " + idMaq}
          </Text>
          {flagViewStatusMaquina == true ?
            <Text style={myStyleApp.textoPequeno}>
              {txStatus}
            </Text> : ""}
        </View>
        <Image
          style={myStyles.imgMaquina}
          source={imgMaq}
        />
      </View>
    )
  } else {
    return (
      <View>
        <Image
          style={myStyles.imgMaquina}
          source={imgMaq}
        />
        <View style={myStyles.containerLavaSeca}>
          <Text style={myStyleApp.textoPequeno}>
            {tipMaq + " " + idMaq}
          </Text>
          {flagViewStatusMaquina == true ?
            <Text style={myStyleApp.textoPequeno}>
              {txStatus}
            </Text> : ""}
        </View>
      </View>
    )
  }
}

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
export default function ViewLojaMaquinas() {
  const { user } = useContext(AuthContext);
  console.log("(main)/index <inicio>");

  const [cenario, setCenario] = useState(cenarioTeste);

  //Consulta API com novos status dos equipamentos
  function atualizarStatus() {
    //console.log("cenarioTeste :", cenarioTeste);
    relogioOnOff = horarioFuncionamento(false, "06:00", "23:00");
    //
    switch (cenarioTeste) {
      case 1:
        seca = [1, 1, 1];
        lava = [1, 1, 1];
        cenarioTeste = 2;
        setCenario(cenarioTeste);
        break;
      case 2:
        seca = [2, 1, 1];
        lava = [1, 2, 2];
        cenarioTeste = 3;
        setCenario(cenarioTeste);
        break;
      case 3:
        seca = [1, 2, 2];
        lava = [2, 3, 2];
        cenarioTeste = 4;
        setCenario(cenarioTeste);
        break;
      case 4:
        seca = [3, 3, 3];
        lava = [3, 3, 3];
        cenarioTeste = 1;
        setCenario(cenarioTeste);
        break;
    };
  }

  //Seta tamanho ideal das VIEWS baseado no tamanho da tela do aparelho
  let screenHeight = 0;
  try {
    screenHeight = Dimensions.get('window').height;
  } catch {
    screenHeight = myStyleApp.containerTamanhoMedioTelas;
  };
  let headerHeight = 0; //Eventual header na página
  let bodyHeight = screenHeight - headerHeight + 0;

  //sem loja favoritada OU loja com status diferente de "ativa"
  if (!user.idFavoriteStore || user.idFavoriteStore == null) {
    return (
      <SafeAreaView style={myStyleApp.containerSafeArea}>
        {GradienteFill()}
        <ScrollView style={myStyleApp.containerScroll} contentContainerStyle={myStyleApp.containerScrollContent} showsVerticalScrollIndicator={false}>

          <View style={{ height: bodyHeight, paddingBottom: 96 }}>
            <View style={myStyles.containerHeader}>
              <Text style={myStyleApp.textoTituloPagina}>
                Informações da sua lavanderia favorita
              </Text>
            </View>
            <View style={myStyles.containerBody1}>
              <View style={myStyles.containerUnidadeEndereco}>
                <Text style={myStyleApp.textoSubtitulo}>
                  Você ainda não selecionou uma lavanderia favorita
                </Text>
              </View>
            </View>

            <TouchableOpacity style={myStyleApp.buttonHC} onPress={atualizarStatus}>
              {/*  <Image
                style={myStyles.imgLocalizacao}
                source={require('../../assets/icones/icon_local2.png')}
              /> */}
              <MaterialIcons name="location-on" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.buttonText} />
              <Text style={myStyleApp.buttonTextStyle}>Pesquisar lavanderias</Text>
            </TouchableOpacity>

            <View style={myStyles.containerBody2}>
              <View style={myStyles.containerMaquinas}>
                {maquina("seca", 2, seca[1], false)}
                {maquina("seca", 4, seca[1], false)}
                {maquina("seca", 6, seca[1], false)}
              </View>
              <View style={myStyles.containerMaquinas}>
                {maquina("lava", 1, lava[1], false)}
                {maquina("lava", 3, lava[1], false)}
                {maquina("lava", 5, lava[1], false)}
              </View>
              <Text style={myStyleApp.textoRegular}>
                Esta é uma imagem ilustrativa
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView >
    )
  }

  //Com loja favoritada
  return (
    <SafeAreaView style={myStyleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerScroll} contentContainerStyle={myStyleApp.containerScrollContent} showsVerticalScrollIndicator={false}>

        <View style={{ height: bodyHeight, paddingBottom: 96 }}>
          <View style={myStyles.containerHeader}>
            <Text style={myStyleApp.textoTituloPagina}>
              Sua lavanderia fora de casa
            </Text>
          </View>
          <View style={myStyles.containerBody1}>
            <View style={myStyles.containerUnidadeEndereco}>
              {/*  <Image
                style={myStyles.imgLocalizacao}
                source={require('../../assets/icones/icon_local2.png')}
              /> */}
              <MaterialIcons name="location-on" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.buttonText} />
              <Text style={myStyleApp.textoSubtitulo}>
                Unidade: ASA NORTE
              </Text>
            </View>

            <View style={myStyles.containerHorarioFuncionamento}>
              {relogioOnOff == true ?
                <Image
                  style={myStyles.imgRelogio}
                  source={require('../../assets/icones/aqua_relogio_abertos.png')}
                /> :
                <Image
                  style={myStyles.imgRelogio}
                  source={require('../../assets/icones/aqua_relogio_fechados.png')}
                />
              }
              <Text style={myStyleApp.textoRegular}>
                Abertos diariamente de 6h às 23h
              </Text>
            </View>

            <View style={myStyles.containerFacilidades}>
              <TouchableOpacity style={myStyleApp.buttonFlatHL_transp} disabled={false} onPress={atualizarStatus}>
                <Text style={myStyleApp.buttonTextStyleFlat}>Selecione outra loja aqui</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={myStyles.containerBody2}>
            {/*
            <View style={myStyles.containerBroadcast}>
              <Text style={myStyleApp.textoRegular}>
                Excepcionalmente hoje, 25/04/2024, quinta-feira, funcionaremos de 6h às 15h
              </Text>
            </View>
            */}
            <View style={myStyles.containerMaquinas}>
              {maquina("seca", 2, seca[0], true)}
              {maquina("seca", 4, seca[1], true)}
              {maquina("seca", 6, seca[2], true)}
            </View>
            <View style={myStyles.containerMaquinas}>
              {maquina("lava", 1, lava[0], true)}
              {maquina("lava", 3, lava[1], true)}
              {maquina("lava", 5, lava[2], true)}
            </View>
            <Text></Text>

            <View style={myStyles.containerUltimaAtualizacao}>
              <Image
                style={myStyles.imgRelogio}
                source={require('../../assets/icones/aqua_relogio_comum.png')}
              />
              <Text style={myStyleApp.textoRegular}>
                26/06/2024 08:36
              </Text>
            </View>

            {flagViewStatusMaquina == true ?
              <TouchableOpacity style={myStyleApp.buttonHC} onPress={atualizarStatus}>
                <Text style={myStyleApp.buttonTextStyle}>Atualizar</Text>
              </TouchableOpacity> : ""
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}