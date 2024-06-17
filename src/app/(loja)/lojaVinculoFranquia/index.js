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
import { consultaDadosFranquia, consultaListaFranquias } from '../../../services/franquiaService';
import { consultaFranquiaVinculada } from '../../../services/lojaService';
import { schemaFranquiaDados } from '../../../schemas/franquiaSchema';
import { schemaLojaFranquiaVinculada } from '../../../schemas/lojaSchema';
import modalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';

export default function ViewLojaVinculoFranquia() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja, naviateParmOnlyConsulta } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  naviateParmOnlyConsulta ? parmOnlyConsulta = JSON.parse(naviateParmOnlyConsulta) : parmOnlyConsulta = true;

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: parmOnlyConsulta });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
  const [flagShowModal, setflagShowModal] = useState(false);

  //Outras declarações
  const [franquiaVinculada, setFranquiaVinculada] = useState(schemaLojaFranquiaVinculada);
  const [franquia, setFranquia] = useState(schemaFranquiaDados);
  const [listaFranquias, setListaFranquias] = useState(null);
  const [selectedFranquiaId, setSelectedFranquiaId] = useState(null);

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  //Carrega dados pre-existentes
  async function fetchDados() {
    //Dados da franquia vinculada, se existir.
    try {
      carregaDadosObtidosNoLoading(await consultaFranquiaVinculada("s"));
    } catch {
      ShowErrorMessage("fr001");
      setProcessing({ ...processing, isLoading: false, isOnlyConsulta: true });
      return;
    };
    //Lista de franquias existentes
    try {
      carregaDadosListaFranquias(await consultaListaFranquias("s"));
      setProcessing({ ...processing, isLoading: false });
    } catch {
      ShowErrorMessage("fr002");
      setProcessing({ ...processing, isLoading: false, isOnlyConsulta: true });
      return;
    };
  }

  function carregaDadosObtidosNoLoading(res) {
    if (!res || res === null) {
      setFranquiaVinculada(schemaLojaFranquiaVinculada);
      return;
    }
    setFranquiaVinculada(res);
  };
  function carregaDadosListaFranquias(res) {
    if (!res || res === null) {
      setListaFranquias(null);
      return;
    }
    setListaFranquias(res);
  }

  //Valida campos de formulario
  function onChangeSelectedFranquia(parm) {
    setSelectedFranquiaId(parm);
  }

  async function onChangeCep(parm) {
    /*     setEndereco({ ...endereco, cep: parm });
    
        if (parm.length >= 8) {
          if (!validarSintaxeCep(parm)) {
            ShowErrorMessage("vc010");
            return;
          }
    
          setProcessing({ ...processing, isExecuting: true });
          const isCepValido = await consultaCepWeb(parm);
          setProcessing({ ...processing, isExecuting: false });
        } */
  }
  /*
async function consultaCepWeb(parm) {
  var endCep = {};
  try {
    endCep = await consultaCepService(parm);
  } catch {
    ShowErrorMessage("vc012");
    schemaLojaEndereco.cep = parm;
    setEndereco(schemaLojaEndereco);
    return false;
  };

  if (endCep.erro) {
    ShowErrorMessage("vc011");
    schemaLojaEndereco.cep = parm;
    setEndereco(schemaLojaEndereco);
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
*/
  //Funções auxiliares 
  function handleCloseModal() {
    setflagShowModal(!flagShowModal);
  }
  function showModalMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  }

  //Ações ao clicar no botão principal (confirmar/prosseguir)
  async function prosseguir() {
    if (processing.isLoading) { return }; //ignora o botão, ainda clicável, até que os dados sejam carregados

    /*     if (endereco.cep.length < 8 || !validarSintaxeCep(endereco.cep)) {
          ShowErrorMessage("vc010");
          return;
        }; */
    /* 
        setProcessing({ ...processing, isExecuting: true });
    
        const isCepValido = await consultaCepWeb(endereco.cep);
        if (!isCepValido) {
          setProcessing({ ...processing, isExecuting: false });
          return;
        }
    
        try {
          const res = await atualizaEnderecoLoja(endereco);
          showModalMsgResultado();
        } catch {
          ShowErrorMessage("lj003");
        }
        setProcessing({ ...processing, isExecuting: false }); */
  }

  //Apresentação da view principal
  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <MaterialIcons name="copyright" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Vínculo com franquia</Text>
        </View>

        {modalSimples(flagShowModal, handleCloseModal, "Vínculo atualizado!", "TipoMsg", "Título", processing)}

        <View style={styles.containerPrincipal}>
          {franquiaVinculada.idFranquia !== "" ? <></> : <></> }

          {InputText("CEP", onChangeCep, "CEP", 1, 8, "default", isEditavel, selectedFranquiaId, false)}

          {processing.isOnlyConsulta ? <></> :
            <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={prosseguir} >
              <Text style={styleApp.textButtonRegular}>Confirmar</Text>
            </TouchableOpacity>
          }
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}