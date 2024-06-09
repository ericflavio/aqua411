import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { consultaLojaEmEdicao, atualizaDadosBasicosLoja } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { InputText } from '../../../componentes/inputText';

console.log("ViewLojaCadastroBasico <inicio>");

//Tela principal
export default function ViewLojaCadastroBasico() {
  const { user } = useContext(AuthContext);
  const [cenario, setCenario] = useState(1);
  const [lojaDadosBasicos, setLojaDadosBasicos] = useState({ status: "", nome: "", apelido: "", cnpj: "" });
  const [isLoadingData, setisLoadingData] = useState(true);
  const [apelido, setApelido] = useState("");
  const [cnpj, setCnpj] = useState("");

  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;

  const cenarioEditar = 1;
  const cenarioValidar = 11;
  var flagEditavel = true;
  cenario !== cenarioEditar || isLoadingData ? flagEditavel = false : flagEditavel = true;

  useEffect(() => {
    fetchDados();
  }, [])

  async function fetchDados() {
    try {
      res = await consultaLojaEmEdicao("s"); //Verifica se já possui alguma sendo criada
    } catch {
      res = null; //Não encontrou uma Loja me estágio de criação para continuar.
      ShowErrorMessage("lj008");
    };
    if (res !== null) {
      statusInicial = res.status;
      setLojaDadosBasicos(res);
      console.log("res<2>: ", res)

      if (res.apelido && res.apelido !== null && res.apelido !== "") {
        setApelido(res.apelido)
      } else {
        setApelido(res.nome)
      }
      if (res.cnpj && res.cnpj !== null && res.cnpj !== "") {
        setCnpj(res.cnpj)
      }
    }
    setisLoadingData(false);
  }

  function goTo() {
    router.navigate({
      pathname: "/lojaMenu",
      params: {
        navigateParmLoja: JSON.stringify(lojaDadosBasicos)
      }
    })
  }

  function onChangeApelido(apelido) {
    setApelido(apelido);
  }
  function onChangeCnpj(cnpj) {
    setCnpj(cnpj)
  }

  function validarSintaxeCnpj(cnpj) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    const isCnpjValido = regex.test(cnpj);
    return isCnpjValido;
  }

  async function prosseguir() {
    if (isLoadingData) { return };

    if (apelido.length < 8) {
      ShowErrorMessage("lj004");
      return;
    };
    if (cnpj !== "" && (cnpj.length < 18 || !validarSintaxeCnpj(cnpj))) {
      ShowErrorMessage("lj005");
      return;
    };

    setCenario(cenarioValidar);
    try {
      const res = await atualizaDadosBasicosLoja(lojaDadosBasicos);
      //TODO: evitar que retorne para tela anterior.
      setCenario(cenarioEditar);
      goTo(); //Menu completo de configuração da loja
    } catch {
      ShowErrorMessage("lj006");
      setCenario(cenarioEditar);
    }
  }

  return (
    <SafeAreaView style={styleApp.containerSafeAreaSemPadding}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScrollFull} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <Image
          style={styles.imgNovaLoja}
          source={require('../../../assets/outros/sheep_novaLoja_01.png')}
        />

        {isLoadingData ? <></> :
          <>
            {lojaDadosBasicos !== null && lojaDadosBasicos.nome !== "" ?
              <View style={styles.containerDadosLoja}>
                <Text style={styleApp.textRegular}>Você já iniciou o cadastramento de uma loja.</Text>
              </View>
              :
              <View style={styles.containerDadosLoja}>
                <Text style={styleApp.textRegular}>Cadastre sua loja para que seus clientes possam receber avisos, alertas de promoções, orientações e muito mais.</Text>
              </View>
            }
          </>
        }

        <View style={styles.containerFormulario}>
          {InputText("Apelido da loja", onChangeApelido, "Apelido", 1, 40, "default", flagEditavel, apelido, false)}
          {InputText("CNPJ (opcional) 00.000.000/0000-00", onChangeCnpj, "CNPJ", 1, 18, "default", flagEditavel, cnpj, false)}

          <TouchableOpacity style={styleApp.buttonHC} disabled={!flagEditavel} onPress={prosseguir}>
            {!flagEditavel ? <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} /> : ""}
            <Text style={styleApp.textButtonRegular}>Confirmar e prosseguir</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 18 }}>
            <Text style={styleApp.textSmallItalico}>As informações Apelido e CNPJ são restritas; Só você pode consultar.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}