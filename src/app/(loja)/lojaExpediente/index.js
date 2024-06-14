import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { InputText } from '../../../componentes/inputText';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { consultaCepService } from '../../../services/cepService';
import { schemaLojaExpediente } from '../../../schemas/lojaSchema';
import { atualizaExpedienteLoja, consultaExpedienteLoja } from '../../../services/lojaService';
import modalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';

export default function ViewExpedienteLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja, naviateParmOnlyConsulta } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  naviateParmOnlyConsulta ? parmOnlyConsulta = JSON.parse(naviateParmOnlyConsulta) : parmOnlyConsulta = false;

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: parmOnlyConsulta });
  const [flagShowModal, setflagShowModal] = useState(false);
  //Outras declarações
  const [expediente, setExpediente] = useState(schemaLojaExpediente)
  const [expedientePadrao, setExpedientePadrao] = useState({ inicio: "", fim: "" })
  const [isChecked, setChecked] = useState(true);

  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  //Carrega dados pre-existentes
  async function fetchDados() {
    try {
      res = await consultaExpedienteLoja();
    } catch {
      res = null;
      ShowErrorMessage("lj011");
    };
    if (res !== null) {
      setExpediente(res);
    }
    setProcessing({ ...processing, isLoading: false });
  }

  //Valida campos de formulario
  function onChangeCep(parm) {
    //setExpediente({ ...expediente, numero: parm });
  }
  function onChangeExpedientePadraoIncio(parm) {
    setExpedientePadrao({ ...expedientePadrao, inicio: parm });
  }
  function onChangeExpedientePadraoFim(parm) {
    setExpedientePadrao({ ...expedientePadrao, fim: parm });
  }

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

  function replicarExpediente() {
    const hrf = new Array(7).fill(expedientePadrao.fim);
    const hri = new Array(7).fill(expedientePadrao.inicio);
    setExpediente({ ...expediente, hrFim: hrf, hrInicio: hri });
  }

  //Ações ao clicar no botão principal (confirmar/prosseguir)
  async function prosseguir() {
    if (processing.isLoading) { return }; //ignora o botão, ainda clicável, até que os dados sejam carregados

    /*     if (expediente.cep.length < 8 || !validarSintaxeCep(expediente.cep)) {
          ShowErrorMessage("vc010");
          return;
        };
     */
    setProcessing({ ...processing, isExecuting: true });

    /*     const isCepValido = await consultaCepWeb(expediente.cep);
        if (!isCepValido) {
          setProcessing({ ...processing, isExecuting: false });
          return;
        } */

    try {
      const res = await atualizaExpedienteLoja(expediente);
      showModalMsgResultado();
    } catch {
      ShowErrorMessage("lj003");
    }
    setProcessing({ ...processing, isExecuting: false });
  }

  //Apresentação da view principal
  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <MaterialIcons name="access-time" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Expediente</Text>
        </View>

        {modalSimples(flagShowModal, handleCloseModal, "Informações atualizadas!", "TipoMsg", "Título", processing)}

        <View style={[styles.containerPrincipal, { marginBottom: 12 }]}>
          <View style={{ flexDirection: "row", columnGap: 8, justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: "green", alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styleApp.textSubtitulo, { color: 'white' }]}>24h</Text>
            </View>

            {InputText("Início", onChangeExpedientePadraoIncio, "00", 1, 2, "default", isEditavel, expedientePadrao.inicio, false)}
            <Text>:</Text>
            {InputText("Fim", onChangeExpedientePadraoFim, "00", 1, 2, "default", isEditavel, expedientePadrao.fim, false)}

          </View>

          <TouchableOpacity style={styleApp.buttonFlatHL} disabled={!isEditavel} onPress={replicarExpediente} >
            <MaterialIcons name="arrow-drop-down" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
            <Text style={[styleApp.textButtonFlat, { color: styleColor.cinzaEscuro }]}>Replicar para todos os dias</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerPrincipal}>

          <View style={{ flexDirection: "row", columnGap: 8, justifyContent: "center", alignItems: "center" }}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[0]}</Text>
            </View>
            {InputText("Início", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrInicio[0], false)}
            <Text>:</Text>
            {InputText("Fim", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrFim[0], false)}
          </View>
          <View style={{ flexDirection: "row", columnGap: 8, justifyContent: "center", alignItems: "center" }}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[1]}</Text>
            </View>
            {InputText("Início", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrInicio[1], false)}
            <Text>:</Text>
            {InputText("Fim", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrFim[1], false)}
          </View>
          <View style={{ flexDirection: "row", columnGap: 8, justifyContent: "center", alignItems: "center" }}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[2]}</Text>
            </View>
            {InputText("Início", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrInicio[2], false)}
            <Text>:</Text>
            {InputText("Fim", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrFim[2], false)}
          </View>
          <View style={{ flexDirection: "row", columnGap: 8, justifyContent: "center", alignItems: "center" }}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[3]}</Text>
            </View>
            {InputText("Início", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrInicio[3], false)}
            <Text>:</Text>
            {InputText("Fim", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrFim[3], false)}
          </View>
          <View style={{ flexDirection: "row", columnGap: 8, justifyContent: "center", alignItems: "center" }}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[4]}</Text>
            </View>
            {InputText("Início", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrInicio[4], false)}
            <Text>:</Text>
            {InputText("Fim", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrFim[4], false)}
          </View>
          <View style={{ flexDirection: "row", columnGap: 8, justifyContent: "center", alignItems: "center" }}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[5]}</Text>
            </View>
            {InputText("Início", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrInicio[5], false)}
            <Text>:</Text>
            {InputText("Fim", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrFim[5], false)}
          </View>
          <View style={{ flexDirection: "row", columnGap: 8, justifyContent: "center", alignItems: "center" }}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[6]}</Text>
            </View>
            {InputText("Início", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrInicio[6], false)}
            <Text>:</Text>
            {InputText("Fim", onChangeCep, "00", 1, 2, "default", isEditavel, expediente.hrFim[6], false)}
          </View>


        </View>
        <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={prosseguir} >
          <Text style={styleApp.textButtonRegular}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView >
  )
}