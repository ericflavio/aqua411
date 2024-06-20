import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { InputText } from '../../../componentes/inputText';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { schemaLojaMaquinario } from '../../../schemas/lojaSchema';
import { consultaListaMaquinario } from '../../../services/lojaService';
import ModalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';

export default function ViewMaquinarioLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja, naviateParmOnlyConsulta } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  naviateParmOnlyConsulta ? parmOnlyConsulta = JSON.parse(naviateParmOnlyConsulta) : parmOnlyConsulta = true;

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: parmOnlyConsulta });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
  const [flagShowModal, setflagShowModal] = useState(false);

  //Outras declarações
  const [maquinario, setMaquinario] = useState(schemaLojaMaquinario)
  const [maquinarioList, setMaquinarioList] = useState([])

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  //Carrega dados pre-existentes
  async function fetchDados() {
    try {
      res = await consultaListaMaquinario();
      res !== null ? setMaquinarioList(res) : setMaquinarioList([]);
      setProcessing({ ...processing, isLoading: false });
    } catch {
      ShowErrorMessage("lj013");
      setProcessing({ ...processing, isLoading: false, isOnlyConsulta: true });
    };
  }

  //Valida campos de formulario
  function onChangeLatitude(parm) {
    //setMaquinario({ ...maquinario, latitude: parm });
  }

  //Funções auxiliares 
  function handleShowModal() {
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
    if (processing.isLoading) { return };

/*     if (!validarSintaxeLatitude()) {
      ShowErrorMessage("gu012");
      return;
    }; */

/*     setProcessing({ ...processing, isExecuting: true });

    try {
      const res = await atualizaLocalizacaoLoja(maquinario);
      showModalMsgResultado();
    } catch {
      ShowErrorMessage("lj010");
    }
    setProcessing({ ...processing, isExecuting: false }); */
  }

  //Apresentação da view principal
  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <MaterialIcons name="local-laundry-service" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Maquinário</Text>
        </View>

        {ModalSimples(flagShowModal, handleShowModal, "Máquinas atualizadas!", "TipoMsg", "Título", processing)}

        <View style={styles.containerPrincipal}>
          {InputText("Latitude", onChangeLatitude, "ex. 15,23456", 1, 12, "default", isEditavel, maquinario.idMaquina, false)}

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