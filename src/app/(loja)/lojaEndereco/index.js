import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { InputText } from '../../../componentes/inputText';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { consultaCepService } from '../../../services/cepService';
import { schemaLojaEndereco } from '../../../schemas/lojaSchema';
import { atualizaEnderecoLoja, consultaEnderecoLoja } from '../../../services/lojaService';
import modalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';

export default function ViewEdtEnderecoLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;

  const [cenario, setCenario] = useState(1);
  const [isLoadingData, setisLoadingData] = useState(true);
  const [flagShowModal, setflagShowModal] = useState(false);
  const [endereco, setEndereco] = useState(schemaLojaEndereco)
 
  //Correções:
  //1. Inibir edições da loja se status "excluído" e "inativo" 
  //2. view dados básicos: E tratar campos adicionais.
  //3. Regex cnpj 

  //*Dados básicos: tratar campos adicionais (além do mínimo)
  //ok - Endereço
  //ok - Localização geografica
  //horário de funcionamento
  //Franquia vinculada: url site da franquia, isFranquia, idFranquia. Obs: Pode remover a vinculação? (pensar sobre isso)
  //Contato: telefone, email
  //Maquinas: layout, flag mostrar status maquina, url de callback de status maquinas
  //Facilidades: alexa(comandos), wifi livre (nome da rede) a.c., mesa de dobra, qtd assentos, link da camera ao vivo, ver status máquina?, push de conclusão do ciclo?
  //CadastroComplementar: site, imagem de capa: uma foto da loja.

  //franquias
  //Flag permite visualização do status das maquinas
  //flag permite visualização das câmeras das máquinas

  //Cenarios
  const cenarioEditar = 1;
  const cenarioValidar = 11;
  var flagEditavel = true;
  cenario !== cenarioEditar || isLoadingData ? flagEditavel = false : flagEditavel = true;

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  //Carrega dados pre-existentes
  async function fetchDados() {
    try {
      res = await consultaEnderecoLoja();
    } catch {
      res = null;
      ShowErrorMessage("lj007");
    };
    if (res !== null) {
      setEndereco(res);
    }
    setisLoadingData(false);
  }

  //Valida campos de formulario
  function onChangeNumero(parm) {
    setEndereco({ ...endereco, numero: parm });
  }
  function onChangeComplemento(parm) {
    setEndereco({ ...endereco, complemento: parm });
  }
  async function onChangeCep(parm) {
    setEndereco({ ...endereco, cep: parm });

    if (parm.length >= 8) {
      if (!validarSintaxeCep(parm)) {
        ShowErrorMessage("vc010");
        return;
      }

      setCenario(cenarioValidar);
      const isCepValido = await consultaCepWeb(parm);
      setCenario(cenarioEditar);
    }
  }
  function validarSintaxeCep(cep) {
    const regex = /^[0-9]{8}$/;
    const isCepValido = regex.test(cep);
    return isCepValido;
  }
  async function consultaCepWeb(parm) {
    var endCep = {};
    try {
      endCep = await consultaCepService(parm);
    } catch {
      ShowErrorMessage("vc012");
      setEndereco({ cep: parm, localidade: "", uf: "", ddd: "", bairro: "", logradouro: "", numero: "", complemento: "" });
      return false;
    };

    if (endCep.erro) {
      ShowErrorMessage("vc011");
      setEndereco({ cep: parm, localidade: "", uf: "", ddd: "", bairro: "", logradouro: "", numero: "", complemento: "" });
      return false;
    } else {
      schemaLojaEndereco.cep = parm;
      schemaLojaEndereco.localidade = endCep.localidade;
      schemaLojaEndereco.uf = endCep.uf;
      schemaLojaEndereco.ddd = endCep.ddd;
      schemaLojaEndereco.bairro = endCep.bairro;
      schemaLojaEndereco.logradouro = endCep.logradouro;
      schemaLojaEndereco.numero = "";
      schemaLojaEndereco.complemento = "";
      setEndereco(schemaLojaEndereco)
      return true;
    }
  }

  //Funções auxiliares 
  function handleCloseModal() {
    setflagShowModal(!flagShowModal);
  }
  function showMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  }

  //Ações ao clicar no botão principal (confirmar/prosseguir)
  async function prosseguir() {
    if (isLoadingData) { return }; //ignora o botão, ainda clicável, até que os dados sejam carregados

    if (endereco.cep.length < 8 || !validarSintaxeCep(endereco.cep)) {
      ShowErrorMessage("vc010");
      return;
    };

    setCenario(cenarioValidar);

    const isCepValido = await consultaCepWeb(endereco.cep);
    if (!isCepValido) {
      setCenario(cenarioEditar)
      return;
    }

    try {
      const res = await atualizaEnderecoLoja(endereco);
      showMsgResultado();
    } catch {
      ShowErrorMessage("lj003");
    }
    setCenario(cenarioEditar);
  }

  //Apresentação da view principal
  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <MaterialIcons name="add-business" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Endereço</Text>
        </View>

        {modalSimples(flagShowModal, handleCloseModal, "Informações atualizadas!", "TipoMsg", "Título")}

        <View style={styles.containerPrincipal}>
          {InputText("CEP", onChangeCep, "CEP", 1, 8, "default", flagEditavel, endereco.cep, false)}
          {endereco && endereco !== null ?
            <View style={{ paddingLeft: 10, marginTop: 10 }}>
              <Text style={styleApp.textRegular}>{endereco.localidade} {endereco.uf}</Text>
              <Text style={styleApp.textRegular}>{endereco.bairro}</Text>
              <Text style={styleApp.textRegular}>{endereco.logradouro}</Text>
            </View>
            : <></>}
          {InputText("Número", onChangeNumero, "Número, ou s/n", 1, 5, "default", flagEditavel, endereco.numero, false)}
          {InputText("Complemento", onChangeComplemento, "Complemento", 1, 80, "default", flagEditavel, endereco.complemento, false)}

          <TouchableOpacity style={styleApp.buttonHC} disabled={!flagEditavel} onPress={prosseguir} >
            {!flagEditavel ? <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} /> : ""}
            <Text style={styleApp.textButtonRegular}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}