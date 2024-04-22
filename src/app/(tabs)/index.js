import React, {useState} from 'react';
import { View, Text , Image, SafeAreaView, ScrollView, TouchableOpacity} from "react-native";
import { myStyles } from "../../styles";

var cenarioTeste = 1;
var seca = [ 1 , 1 , 1];
var lava = [ 1 , 1 , 1];

//Monta cada máquina com seu respectivo status
function maquina(tipMaq, idMaq, status) {
  if (!tipMaq) tipMaq = "lava"; // Espera "lava" ou "seca"
  if (!idMaq) idMaq = 0;
  if (!status) status = 1;

  txStatus = "Indefinido";

  switch (status) {
    case 1:
      txStatus = "Disponível"
      if (tipMaq == "lava") {
        imgMaq=require('../../../assets/maquinas/lava_disp.png')
      } else {
        imgMaq=require('../../../assets/maquinas/seca_disp.png')
      }
      break;
    case 2:
      txStatus = "Ocupada"
      if (tipMaq == "lava") {
        imgMaq=require('../../../assets/maquinas/lava_emuso.png')
      } else {
        imgMaq=require('../../../assets/maquinas/seca_emuso.png')
      }
      break;
    case 3:
      txStatus = "Manutenção"
      if (tipMaq == "lava") {
        imgMaq=require('../../../assets/maquinas/lava_manut.png')
      } else {
        imgMaq=require('../../../assets/maquinas/seca_manut.png')
      }
      break;
    default:
      txStatus = "Disponível"
      if (tipMaq == "lava") {
        imgMaq=require('../../../assets/maquinas/lava_disp.png')
      } else {
        imgMaq=require('../../../assets/maquinas/seca_disp.png')
      }
  };

  return (
    <View>            
      <Image
        style={{
        width: 84,
        height: 84,
        resizeMode: 'contain',
        }}
        source={imgMaq}
      />
      <View style={{
        flexDirection: 'column',
        alignItems: "center",
        borderWidth:0}}> 
        <Text style={myStyles.textoMaquinas}>
            {tipMaq + " " + idMaq}
        </Text>
        <Text style={myStyles.textoMaquinas}>
            {txStatus}
        </Text>
      </View>
  </View>
)
}

//Tela principal HOME
export default function ViewHome() {
  const [cenario, setCenario] = useState(cenarioTeste);

  //Consulta API com novos status dos equipamentos
  function atualizarStatus () {
    console.log("cenarioTeste :", cenarioTeste);
    console.log("seca: ", seca[0] , seca[1], seca[2]);
    switch (cenarioTeste) {
      case 1:
        seca = [ 1 , 1 , 1];
        lava = [ 1 , 1 , 1];
        cenarioTeste = 2;
        setCenario(cenarioTeste);
        break;
      case 2:
        seca = [ 2 , 1 , 1];
        lava = [ 1 , 2 , 2];
        cenarioTeste = 3;
        setCenario(cenarioTeste);
        break;
      case 3:
        seca = [ 1 , 2 , 2];
        lava = [ 2 , 3 , 2];
        cenarioTeste = 4;
        setCenario(cenarioTeste);
        break;
      case 4:
        seca = [ 3 , 3 , 3];
        lava = [ 3 , 3 , 3];
        cenarioTeste = 1;
        setCenario(cenarioTeste);
        break;
    };
  }

  return (
    <SafeAreaView style={myStyles.containerPrincipal}>
      <ScrollView style={{backgroundColor:"white"}}>
          <Text style={myStyles.textoTituloPrincipal}>
            Sua lavanderia fora de casa
          </Text>
          <Text style={myStyles.textoSubtitulo}>
            Unidade: ASA NORTE, Brasília
          </Text>
          <View style={{flexDirection:"row", alignItems:"center", paddingTop:10}}>
              <Image
                style={{width: 30, height: 30, resizeMode: 'contain'}}
                source={require('../../../assets/icones/icon_local.png')}
              />
              <Text style={myStyles.textoComumSemPadding}>CLN 411 Bloco "E"</Text>
          </View>
          {/*
          <Text style={myStyles.textoComum}>
            Cuide bem das suas roupas com nossos modernos equipamentos
          </Text>
         */}

          <View style={myStyles.containerMaquinas}>  
              {maquina("seca" , 2 , seca[0])}
              {maquina("seca" , 4 , seca[1])}
              {maquina("seca" , 6 , seca[2])}
          </View>
          <View style={myStyles.containerMaquinas}>  
              {maquina("lava" , 1 , lava[0])}
              {maquina("lava" , 3 , lava[1])}
              {maquina("lava" , 5 , lava[2])}
          </View>
          <Text></Text>
          <TouchableOpacity style={myStyles.button} onPress={atualizarStatus}>
              <Text>Atualizar</Text>
          </TouchableOpacity>
        
        </ScrollView>
    </SafeAreaView>
  )
}