import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { myStyles } from "../styles/stylesPageIndex";
import { myStylesComuns } from '../styles/stylesComuns';

var cenarioTeste = 1;
var seca = [1, 1, 1];
var lava = [1, 1, 1];

//Monta cada máquina com seu respectivo status
function maquina(tipMaq, idMaq, status, inViewStatusMaquina) {
  if (!tipMaq) tipMaq = "lava"; // Espera "lava" ou "seca"
  if (!idMaq) idMaq = 0;
  if (!status) status = 1;
  if (!inViewStatusMaquina) inViewStatusMaquina = 2; //1-ver 2-não ver

  var tipMaquina = tipMaq.toUpperCase();
  var txStatus = "Indefinido";

  switch (status) {
    case 1:
      txStatus = "Disponível"
      if (tipMaquina == "LAVA") {
        imgMaq = require('../../../assets/maquinas/lava_disp.png')
      } else {
        imgMaq = require('../../../assets/maquinas/seca_disp.png')
      }
      break;
    case 2:
      txStatus = "Ocupada"
      if (tipMaquina == "LAVA") {
        imgMaq = require('../../../assets/maquinas/lava_emuso.png')
      } else {
        imgMaq = require('../../../assets/maquinas/seca_emuso.png')
      }
      break;
    case 3:
      txStatus = "Manutenção"
      if (tipMaquina == "LAVA") {
        imgMaq = require('../../../assets/maquinas/lava_manut.png')
      } else {
        imgMaq = require('../../../assets/maquinas/seca_manut.png')
      }
      break;
    default:
      txStatus = "Disponível"
      if (tipMaquina == "LAVA") {
        imgMaq = require('../../../assets/maquinas/lava_disp.png')
      } else {
        imgMaq = require('../../../assets/maquinas/seca_disp.png')
      }
  };

  return (
    <View>
      <Image
        style={myStyles.imgMaquina}
        source={imgMaq}
      />
      <View style={myStyles.containerLavaSeca}>
        <Text style={myStyles.textoLavaSeca}>
          {tipMaquina + " " + idMaq}
        </Text>

        {inViewStatusMaquina == 1 ?
          <Text style={myStyles.textoLavaSeca}>
            {txStatus}
          </Text> : ""}
      </View>
    </View>
  )
}

//Seta cor do icone de horário de funcionamento
function horarioFuncionamento (horaIni , horaFim) {
  if (!horaIni) horaIni = "00:00"
  if (!horaFim) horaFim = "23:59"

  hora1 = horaIni.split(":");
  hora2 = horaFim.split(":");

  var d = new Date();
  var data1 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora1[0], hora1[1]);
  var data2 = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora2[0], hora2[1]);

  var datax = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());

  console.log("<<hora-agora: ", datax)
  console.log("<<hora1: ", data1)
  console.log("<<hora2: ", data2)

  if (datax > data2) console.log ("<<fora da janela");
  if (datax < data2) console.log ("<<na janela");
  //return data1 > data2;
};

//Tela principal HOME
export default function ViewHome() {
  const [cenario, setCenario] = useState(cenarioTeste);
  const imgBkg = require('../../../assets/outros/img_background_aqua411.png');

  //Consulta API com novos status dos equipamentos
  function atualizarStatus() {
    //console.log("cenarioTeste :", cenarioTeste);
    horarioFuncionamento("06:00" , "23:00");
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

  return (
    <SafeAreaView style={myStyles.containerPrincipalSafeArea}>
      <ScrollView style={myStyles.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <Text style={myStylesComuns.textoTituloPagina}>
          Sua lavanderia fora de casa
        </Text>
        <View style={myStyles.containerUnidadeEndereco}>
          <Image
            style={myStyles.imgLocalizacao}
            source={require('../../../assets/icones/icon_local.png')}
          />
          <Text style={myStylesComuns.textoDestacado}>
            Unidade: ASA NORTE, Brasília-DF
          </Text>
        </View>
        <View style={myStyles.containerHorarioFuncionamento}>
          <Image
            style={myStyles.imgLocalizacao}
            source={require('../../../assets/icones/aqua_relogio_abertos.png')}
          />
          <Text style={myStylesComuns.textoComum}>
            Abertos diariamente de 6h às 23h
          </Text>
        </View>
        <View style={myStyles.containerBroadcast}>
          <Text style={myStylesComuns.textoComum}>
            Excepcionalmente hoje, 25/04/2024, quinta-feira, funcionaremos de 6h às 15h
          </Text>
        </View>

        {/*
        <Text style={myStylesComuns.textoComumSemPadding}>CLN 411 Bloco "E"</Text>
        <Text style={myStyles.textoComum}>
            Cuide bem das suas roupas com nossos modernos equipamentos
        </Text>
         */}

        <View style={myStyles.containerMaquinas}>
          {maquina("seca", 2, seca[0], 2)}
          {maquina("seca", 4, seca[1], 2)}
          {maquina("seca", 6, seca[2], 2)}
        </View>
        <View style={myStyles.containerMaquinas}>
          {maquina("lava", 1, lava[0], 2)}
          {maquina("lava", 3, lava[1], 2)}
          {maquina("lava", 5, lava[2], 2)}
        </View>
        <Text></Text>

        <TouchableOpacity style={myStylesComuns.button} onPress={atualizarStatus}>
          <Text>Atualizar</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}