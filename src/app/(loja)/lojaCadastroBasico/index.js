import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { styleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { consultaExistenciaLojaEmCriacao, atualizaDadosBasicosLoja } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { InputText } from '../../../componentes/inputText';
import { schemaLojaDados, schemaLojaDadosMinimos } from '../../../schemas/lojaSchema';
import modalSimples from '../../../componentes/modalSimples';

//Tela principal
export default function ViewLojaCadastroBasico() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  //Duas situações sobre o parâmetro navigateParmLoja:
  //a) Se chegar null, significa que uma nova loja está sendo criada (status "Criando")
  //b) Se chegar <> null, siginifica que a loja já foi criada e está sendo editada.

  //Controles básicos
  const [cenario, setCenario] = useState(1);
  const [isProcessing, setProcessing] = useState(true);
  const [flagShowModal, setflagShowModal] = useState(false);
  //Outras declarações
  const [lojaDados, setLojaDados] = useState(schemaLojaDados);

  //Cenarios
  const cenarioEditar = 1;
  const cenarioValidar = 11;
  cenario !== cenarioEditar || isProcessing ? isEditavel = false : isEditavel = true;

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  async function fetchDados() {
    //No caso de edição de loja existente: consulta dados adicionais aos que já chegaram via parâmetro
    if (parmLoja !== null) {
      try {
        res = await consultaExistenciaLojaEmCriacao("s"); //Verifica se já possui alguma sendo criada
      } catch {
        res = null; //Erro na pesquisad de Loja em estágio de criação para continuar.
        ShowErrorMessage("lj008");
      };
      if (res !== null) {
        setLojaDados(res);
      }
    }
    setProcessing(!isProcessing);
  }

  //Valida campos de formulario
  function onChangeApelido(parm) {
    setLojaDados({ ...lojaDados, apelido: parm });
  }
  function onChangeCnpj(parm) {
    setLojaDados({ ...lojaDados, cnpj: parm });
  }

  function validarSintaxeCnpj() {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    const isCnpjValido = regex.test(lojaDados.cnpj);
    return isCnpjValido;
  }

  //Funcoes auxiliares
  function goTo() {
    parm = lojaDados;
    parm.status = "Criando";
    router.navigate({
      pathname: "/lojaMenu",
      params: {
        navigateParmLoja: JSON.stringify(parm)
      }
    })
  }
  function showModalMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  }
  function handleCloseModal() {
    setflagShowModal(!flagShowModal);
  }

  //Funcao no botão de ação principal
  async function prosseguir() {
    if (isProcessing) { return }; //ignora o botão, ainda clicável, até que os dados sejam carregados

    if (lojaDados.apelido.length < 8) {
      ShowErrorMessage("lj004");
      return;
    };
    if (lojaDados.cnpj !== "" && (lojaDados.cnpj.length < 18 || !validarSintaxeCnpj())) {
      ShowErrorMessage("lj005");
      return;
    };

    setCenario(cenarioValidar);
    try {
      const res = await atualizaDadosBasicosLoja(lojaDados);
    } catch {
      ShowErrorMessage("lj006");
      setCenario(cenarioEditar);
    }

    setCenario(cenarioEditar);
    console.log("parm------>", parmLoja)
    if (parmLoja === null) {
      //TODO: evitar que retorne para tela anterior.
      goTo(); //Menu completo de configuração da loja
    } else {
      showModalMsgResultado();
    }
  }

  return (
    <SafeAreaView style={styleApp.containerSafeAreaSemPadding}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScrollFull} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        {modalSimples(flagShowModal, handleCloseModal, "Informações atualizadas!", "TipoMsg", "Título")}

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
          {InputText("Apelido da loja", onChangeApelido, "Apelido", 1, 40, "default", isEditavel, lojaDados.apelido, false)}
          {InputText("CNPJ (opcional) 00.000.000/0000-00", onChangeCnpj, "CNPJ", 1, 18, "default", isEditavel, lojaDados.cnpj, false)}

          {parmLoja && parmLoja !== null ?
            <>
              {InputText("E-mail", onChangeApelido, "emailda@loja.com", 1, 80, "default", isEditavel, lojaDados.email, false)}
            </>
            : <></>
          }

          <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={prosseguir}>
            {!isEditavel ? <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} /> : ""}
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