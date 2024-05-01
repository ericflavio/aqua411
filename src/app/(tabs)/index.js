//efa
import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from "react-native";
import { myStyles } from "../styles/stylesPageIndex";
import { myStylesComuns } from '../styles/stylesComuns';
import { GradienteFill } from '../componentes/gradienteFill';

var cenarioTeste = 1;
var seca = [1, 1, 1];
var lava = [1, 1, 1];
var relogioOnOff = true;
var inViewStatusMaquina = true; //TODO: não está sendo usado

//Monta cada máquina com seu respectivo status
function maquina(tipMaq, idMaq, status, view) {
  if (!tipMaq) tipMaq = "lava"; // Espera "lava" ou "seca"
  if (!idMaq) idMaq = 0;
  if (!status) status = 1;
  if (!view) inViewStatusMaquina = false;

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

        {inViewStatusMaquina == true ?
          <Text style={myStyles.textoLavaSeca}>
            {txStatus}
          </Text> : ""}
      </View>
    </View>
  )
}

//Seta cor do icone de horário de funcionamento
function horarioFuncionamento(in24h, horaIni, horaFim) {
  if (!horaIni) horaIni = "00:00"
  if (!horaFim) horaFim = "23:59"
  if (!in24h) in24h = false;

  //TODO: tratar horário faltando zeros na frente

  if (in24h) return true;

  hora1 = horaIni.split(":");
  hora2 = horaFim.split(":");

  var d = new Date();
  var dataAbre = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora1[0], hora1[1]); //Horário abertura
  var dataFecha = new Date(d.getFullYear(), d.getMonth(), d.getDate(), hora2[0], hora2[1]); //Horario fechamento

  var dataAgora = new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes());

  if (dataAgora >= dataAbre & dataAgora < dataFecha) {
    console.log("<<Aberta");
    return true;
  } else {
    console.log("<<Fechada");
    return false;
  }
  //return data1 > data2;
};

//Tela principal HOME
export default function ViewHome() {
  const [cenario, setCenario] = useState(cenarioTeste);
  const imgBkg = require('../../../assets/outros/img_background_aqua411.png');

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
    screenHeight = myStylesComuns.containerTamanhoMedioTelas;
  };
  let headerHeight = 0; //Eventual header na página
  let bodyHeight = screenHeight - headerHeight + 0;
  //console.log("screenHeight: ", screenHeight);
  //console.log("headerHeight: ", headerHeight);
  //console.log("bodyHeight  : ", bodyHeight);

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      {/*
      <LinearGradient
        // Background Linear Gradient
        colors={['white', 'rgba(201,237,255,100)']}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: bodyHeight,
        }}
      />
      */}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>

        <View style={{ height: bodyHeight, paddingBottom: 96 }}>
          <View style={myStyles.containerHeader}>
            <Text style={myStylesComuns.textoTituloPagina}>
              Sua lavanderia fora de casa
            </Text>
          </View>
          <View style={myStyles.containerBody1}>
            <View style={myStyles.containerUnidadeEndereco}>
              <Image
                style={myStyles.imgLocalizacao}
                source={require('../../../assets/icones/icon_local.png')}
              />
              <Text style={myStylesComuns.textoSubtitulo}>
                Unidade: ASA NORTE
              </Text>
            </View>

            <View style={myStyles.containerHorarioFuncionamento}>
              {relogioOnOff == true ?
                <Image
                  style={myStyles.imgRelogio}
                  source={require('../../../assets/icones/aqua_relogio_abertos.png')}
                /> :
                <Image
                  style={myStyles.imgRelogio}
                  source={require('../../../assets/icones/aqua_relogio_fechados.png')}
                />
              }
              <Text style={myStylesComuns.textoComum}>
                Abertos diariamente de 6h às 23h
              </Text>
            </View>
          </View>

          <View style={myStyles.containerBody2}>
            {/*
            <View style={myStyles.containerBroadcast}>
              <Text style={myStylesComuns.textoComum}>
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
                source={require('../../../assets/icones/aqua_relogio_comum.png')}
              />
              <Text style={myStylesComuns.textoComum}>
                26/06/2024 08:36
              </Text>
            </View>

            {inViewStatusMaquina == true ?
              <TouchableOpacity style={myStylesComuns.button} onPress={atualizarStatus}>
                <Text>Atualizar</Text>
              </TouchableOpacity> : ""
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}