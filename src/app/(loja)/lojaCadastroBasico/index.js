import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { consultaListaStatusLoja, consultaLojaEmEdicao } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';

console.log("ViewLojaCadastroBasico <inicio>");

//Tela principal
export default function ViewLojaCadastroBasico() {
  const { user } = useContext(AuthContext);
  const [lojaDadosBasicos, setLojaDadosBasicos] = useState({ status: "", nome: "" });
  const [disabled, setDisabled] = useState(true);

  //Caso criação de nova loja: não chega parâmetro
  //Caso edição (loja selecionada na lista): chega parâmetro
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;

  useEffect(() => {
    console.log("useEffetc>>><1>")
    fetchLoja();
  }, [])

  async function fetchLoja() {
    let statusInicial = "";
    try {
      resLoja = await consultaLojaEmEdicao("s"); //Verifica se já possui alguma sendo criada
    } catch {
      resLoja = null; //Não encontrou uma Loja me estágio de criação para continuar.
    };
    if (resLoja !== null) {
      statusInicial = resLoja.status;
      setLojaDadosBasicos(resLoja);
      setDisabled(false); // Libera edição das demais opções
    }
  }

  function goTo() {
    router.navigate({
      pathname: "/lojaEndereco",
      params: {
        navigateParmLojaId: JSON.stringify(idLoja)
      }
    })
  }

  console.log("dadosBasicos :", lojaDadosBasicos)
  return (
    <SafeAreaView style={myStyleApp.containerSafeAreaSemPadding}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerScrollWB} contentContainerStyle={myStyleApp.containerScrollContent} showsVerticalScrollIndicator={false}>
        <Image
          style={myStyles.imgNovaLoja}
          source={require('../../../assets/outros/sheep_novaLoja_01.png')}
        />

        {lojaDadosBasicos !== null && lojaDadosBasicos.nome !== "" ?
          <View style={myStyles.containerDadosLoja}>
            <Text style={myStyleApp.textoTituloPagina}>{lojaDadosBasicos.nome}</Text>
            <Text style={myStyleApp.textoRegular}>Status: <Text style={myStyles.textoStatus}>{lojaDadosBasicos.status}</Text></Text>
          </View>
          :
          <View style={myStyles.containerDadosLoja}>
            <Text style={myStyleApp.textoRegular}>Cadastre sua loja para que seus clientes possam receber avisos, alertas de promoções, orientações e muito mais.</Text>
          </View>
        }

        <View style={{ marginLeft: 12, marginRight: 12 }}>
          <Text> Input APELIDO</Text>
          <Text> Input CNPJ do priprietario</Text>

          <TouchableOpacity style={myStyleApp.buttonHC} onPress={{}}>
            <View style={myStyles.containerButton}>
              <Text style={myStyleApp.buttonTextStyle}>Confirmar e prosseguir</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}