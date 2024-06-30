import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Switch } from "react-native";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { styleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { consultaExistenciaLojaEmCriacao, atualizaDadosBasicosLoja } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { InputText } from '../../../componentes/inputText';
import { schemaLojaDados, schemaLojaDadosMinimos } from '../../../schemas/lojaSchema';
import ModalSimples from '../../../componentes/modalSimples';

//Tela principal
export default function ViewFranquiaCadastroBasico() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja, naviateParmOnlyConsulta } = useLocalSearchParams();
  navigateParmLoja && navigateParmLoja !== null ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  naviateParmOnlyConsulta ? parmOnlyConsulta = JSON.parse(naviateParmOnlyConsulta) : parmOnlyConsulta = true;
  //Duas situações sobre o parâmetro navigateParmLoja:
  //a) Se chegar null, significa que uma nova loja está sendo criada (status "Criando")
  //b) Se chegar <> null, siginifica que a loja já foi criada e está sendo editada.

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: false, isExecuting: false, isOnlyConsulta: parmOnlyConsulta });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
  const [flagShowModal, setflagShowModal] = useState(false);

  //Outras declarações
  const [lojaDados, setLojaDados] = useState(schemaLojaDados);
  const [flagExibirStatus, setFlagExibirStatus] = useState(false);

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  async function fetchDados() {
    //No caso de edição de loja existente: consulta dados adicionais aos que já chegaram via parâmetro
    if (parmLoja !== null) {
      setProcessing({ ...processing, isLoading: true });
      try {
        res = await consultaExistenciaLojaEmCriacao("s"); //Verifica se já possui alguma sendo criada
        res !== null ? setLojaDados(res) : setLojaDados(schemaLojaDados);
        setProcessing({ ...processing, isLoading: false });
      } catch {
        ShowErrorMessage("lj008");
        setProcessing({ ...processing, isLoading: false, isOnlyConsulta: true });
      }
    }
  }

  //Valida campos de formulario
  function onChangeCnpj(parm) {
    setLojaDados({ ...lojaDados, cnpj: parm });
  }

  function validarSintaxeCnpj() {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
    const isCnpjValido = regex.test(lojaDados.cnpj);
    return isCnpjValido;
  }

  //Funcoes auxiliares
  function showModalMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  }
  function handleShowModal() {
    setflagShowModal(!flagShowModal);
  }
  function onChangeExibirStatus() {
    setFlagExibirStatus(!flagExibirStatus)
  }

  function goTo() {
    parm = lojaDados;
    parm.status = "Criando";
    router.replace({
      pathname: "/franquiaMenu",
      params: {
        navigateParmLoja: JSON.stringify(parm)
      }
    })
  }

  //Funcao no botão de ação principal
  async function prosseguir() {
    if (processing.isLoading) { return }; //ignora o botão, ainda clicável, até que os dados sejam carregados

    if (lojaDados.cnpj !== "" && (lojaDados.cnpj.length < 18 || !validarSintaxeCnpj())) {
      ShowErrorMessage("lj005");
      return;
    };

    setProcessing({ ...processing, isExecuting: true });
    try {
      const res = await atualizaDadosBasicosLoja(lojaDados);
    } catch {
      ShowErrorMessage("lj006");
      setProcessing({ ...processing, isExecuting: false });
    }

    setProcessing({ ...processing, isExecuting: false });
    if (parmLoja === null) {
      //TODO: evitar que retorne para tela anterior.
      goTo(); //Menu completo de configuração da loja
    } else {
      showModalMsgResultado();
    }
  }

  return (
    <SafeAreaView style={[styleApp.containerSafeArea, { paddingTop: 0 }]}>
      <ScrollView style={[styleApp.containerScroll, { width: '100%' }]} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        {ModalSimples(flagShowModal, handleShowModal, "Informações atualizadas!", "TipoMsg", "Título", processing)}

        {!parmLoja || parmLoja === null ?
          <>
            <Image
              style={styles.imgNovaLoja}
              source={require('../../../assets/outros/img_franquia_criar.png')}
            />
            <View style={styles.containerDadosLoja}>
              <Text style={styleApp.textRegular}>Cadastre sua franquia e apoie a gestão das unidades franqueadas</Text>
            </View>
          </>
          : <></>}

        <View style={styles.containerHeader}>
          <MaterialIcons name="business" size={styleApp.size.iconSizeRegular} color={styleApp.color.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Cadastro</Text>
        </View>

        <View style={styles.containerPrincipal}>
          {InputText("CNPJ 00.000.000/0000-00", onChangeCnpj, "CNPJ opcional", 1, 18, "default", isEditavel, lojaDados.cnpj, false)}
          {InputText("E-mail", onChangeCnpj, "emailda@franquia.com", 1, 80, "default", isEditavel, lojaDados.email, false)}
          {InputText("Data constituição", onChangeCnpj, "dd/mm/aaaa", 1, 10, "default", isEditavel, lojaDados.email, false)}
          {InputText("Site oficial", onChangeCnpj, "cole aqui", 1, 100, "default", isEditavel, lojaDados.email, false)}
          {InputText("URI da logomarca (link)", onChangeCnpj, "cole aqui", 1, 100, "default", isEditavel, lojaDados.email, false)}
          {InputText("Cor principal em Hexa", onChangeCnpj, "#f1f1f1", 1, 9, "default", isEditavel, lojaDados.email, false)}
        </View>

        <View style={styles.containerPrincipal}>
          <View style={styles.containerTogle}>
            <Text style={styleApp.textRegular}>Exibir status das máquinas</Text>
            <Switch
              disabled={!isEditavel}
              trackColor={{ false: '#767577', true: '#767577' }}
              thumbColor={flagExibirStatus ? styleApp.color.tema30pPrincipal : '#f4f3f4'}
              ios_backgroundColor="#767577"
              onValueChange={onChangeExibirStatus}
              value={flagExibirStatus}
            />
          </View>
          {flagExibirStatus ?
            <>
              {InputText("API de consulta", onChangeCnpj, "API", 1, 60, "default", isEditavel, lojaDados.cnpj, false)}
              {InputText("Credencial da API", onChangeCnpj, "Token", 1, 60, "default", isEditavel, lojaDados.cnpj, false)}
              {InputText("Atributo (json) do tipo (lava/seca)", onChangeCnpj, "ex: tipo", 1, 20, "default", isEditavel, lojaDados.cnpj, false)}
              {InputText("Atributo (json) do identificador", onChangeCnpj, "ex: 1", 1, 20, "default", isEditavel, lojaDados.cnpj, false)}
            </>
            : <></>}
        </View>
      </ScrollView>

      {processing.isOnlyConsulta ? <></> :
        <>
          <View style={styleApp.containerButtonBottom}>
            <Text style={styleApp.textSmallItalico}>O CNPJ é uma informação restrita. Só você poderá visualizar.</Text>
            <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={prosseguir}>
              <Text style={styleApp.textButtonRegular}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </SafeAreaView >
  )
}