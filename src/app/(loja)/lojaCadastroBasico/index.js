import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { styleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { consultaLojaEmEdicao, atualizaDadosBasicosLoja } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { InputText } from '../../../componentes/inputText';
import { schemaLojaDadosBasicos } from '../../../schemas/lojaSchema';

//Tela principal
export default function ViewLojaCadastroBasico() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja } = useLocalSearchParams();
  const { inMinimoOuCompleto } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  console.log("in ", inMinimoOuCompleto)

  const [cenario, setCenario] = useState(1);
  const [lojaDadosBasicos, setLojaDadosBasicos] = useState(schemaLojaDadosBasicos);
  const [isLoadingData, setisLoadingData] = useState(true);

  console.log("parmloja ", parmLoja)

  //Cenarios
  const cenarioEditar = 1;
  const cenarioValidar = 11;
  var flagEditavel = true;
  cenario !== cenarioEditar || isLoadingData ? flagEditavel = false : flagEditavel = true;

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  async function fetchDados() {
    try {
      res = await consultaLojaEmEdicao("n"); //Verifica se já possui alguma sendo criada
    } catch {
      res = null; //Erro na pesquisad de Loja em estágio de criação para continuar.
      ShowErrorMessage("lj008");
    };
    if (res !== null) {
      goTo();
      statusInicial = res.status;
      setLojaDadosBasicos(res);
    }
    setisLoadingData(false);
  }

  //Valida campos de formulario
  function onChangeApelido(parm) {
    setLojaDadosBasicos({ ...lojaDadosBasicos, apelido: parm });
  }
  function onChangeCnpj(parm) {
    setLojaDadosBasicos({ ...lojaDadosBasicos, cnpj: parm });
  }

  function validarSintaxeCnpj() {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    const isCnpjValido = regex.test(lojaDadosBasicos.cnpj);
    return isCnpjValido;
  }

  //Funcoes auxiliares
  function goTo() {
    router.navigate({
      pathname: "/lojaMenu",
      params: {
        navigateParmLoja: JSON.stringify(lojaDadosBasicos)
      }
    })
  }

  //Funcao no botão de ação principal
  async function prosseguir() {
    if (isLoadingData) { return }; //ignora o botão, ainda clicável, até que os dados sejam carregados

    if (lojaDadosBasicos.apelido.length < 8) {
      ShowErrorMessage("lj004");
      return;
    };
    if (lojaDadosBasicos.cnpj !== "" && (lojaDadosBasicos.cnpj.length < 18 || !validarSintaxeCnpj())) {
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

        {!parmLoja || parmLoja === null ?
          <>
            <Image
              style={styles.imgNovaLoja}
              source={require('../../../assets/outros/sheep_novaLoja_01.png')}
            />
            <View style={styles.containerDadosLoja}>
              <Text style={styleApp.textRegular}>Cadastre sua loja para seus clientes receberem avisos, promoções, etc.</Text>
            </View>
          </>
          : <></>}

        <View style={styles.containerHeader}>
          <MaterialIcons name="add-business" size={styleApp.size.iconSizeRegular} color={styleApp.color.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Informações da loja</Text>
        </View>

        <View style={styles.containerPrincipal}>
          {InputText("Apelido da loja", onChangeApelido, "Apelido", 1, 40, "default", flagEditavel, lojaDadosBasicos.apelido, false)}
          {InputText("CNPJ (opcional) 00.000.000/0000-00", onChangeCnpj, "CNPJ", 1, 18, "default", flagEditavel, lojaDadosBasicos.cnpj, false)}

          <TouchableOpacity style={styleApp.buttonHC} disabled={!flagEditavel} onPress={prosseguir}>
            {!flagEditavel ? <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} /> : ""}
            <Text style={styleApp.textButtonRegular}>Confirmar</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 18 }}>
            <Text style={styleApp.textSmallItalico}>As informações Apelido e CNPJ são restritas; Só você pode consultar.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}