import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { InputText } from '../../../componentes/inputText';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { schemaLojaExpediente } from '../../../schemas/lojaSchema';
import { atualizaExpedienteLoja, consultaExpedienteLoja } from '../../../services/lojaService';
import modalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';
import SempreAberto from '../../../componentes/sempreAberto';

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
  const [expedienteSeg, setExpedienteSeg] = useState({ inicio: "", fim: "" })
  const [expedienteTer, setExpedienteTer] = useState({ inicio: "", fim: "" })
  const [expedienteQua, setExpedienteQua] = useState({ inicio: "", fim: "" })
  const [expedienteQui, setExpedienteQui] = useState({ inicio: "", fim: "" })
  const [expedienteSex, setExpedienteSex] = useState({ inicio: "", fim: "" })
  const [expedienteSab, setExpedienteSab] = useState({ inicio: "", fim: "" })
  const [expedienteDom, setExpedienteDom] = useState({ inicio: "", fim: "" })
  const [is24h, set24h] = useState(false)
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
  function incluiDoisPontos(h1, h2) {
    if (h1.length === 2 && h2.length <= 2) {
      return h1 + ":"
    } else {
      return h1
    }
  }
  function inibirCaractere(parm) {
    const r = /[a-z]|[A-Z]/;
    return r.test(parm);
  }
  function verifica24h(hri, hrf) {
    if (hri === hrf && hrf === "00:00" && is24h === false) {
      set24h(true)
    } else {
      set24h(false)
    }
  }
  //Padrao
  function onChangeExpedientePadraoIncio(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedientePadrao.inicio);
    setExpedientePadrao({ ...expedientePadrao, inicio: parm });
    onChangeSegInicio(parm);
    onChangeTerInicio(parm);
    onChangeQuaInicio(parm);
    onChangeQuiInicio(parm);
    onChangeSexInicio(parm);
    onChangeSabInicio(parm);
    onChangeDomInicio(parm);
  }
  function onChangeExpedientePadraoFim(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedientePadrao.fim);
    setExpedientePadrao({ ...expedientePadrao, fim: parm });
    onChangeSegFim(parm);
    onChangeTerFim(parm);
    onChangeQuaFim(parm);
    onChangeQuiFim(parm);
    onChangeSexFim(parm);
    onChangeSabFim(parm);
    onChangeDomFim(parm);
  }
  //Segunda
  function onChangeSegInicio(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteSeg.inicio);
    setExpedienteSeg({ ...expedienteSeg, inicio: parm });
    verifica24h(parm, expedienteSeg.fim);
  }
  function onChangeSegFim(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteSeg.fim);
    setExpedienteSeg({ ...expedienteSeg, fim: parm });
    verifica24h(expedienteSeg.inicio, parm);
  }
  //Terça
  function onChangeTerInicio(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteTer.inicio);
    setExpedienteTer({ ...expedienteTer, inicio: parm });
    verifica24h(parm, expedienteTer.fim);
  }
  function onChangeTerFim(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteTer.fim);
    setExpedienteTer({ ...expedienteTer, fim: parm });
    verifica24h(expedienteTer.inicio, parm);
  }
  //Quarta
  function onChangeQuaInicio(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteQua.inicio);
    setExpedienteQua({ ...expedienteQua, inicio: parm });
    verifica24h(parm, expedienteQua.fim);
  }
  function onChangeQuaFim(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteQua.fim);
    setExpedienteQua({ ...expedienteQua, fim: parm });
    verifica24h(expedienteQua.inicio, parm);
  }
  //Quinta
  function onChangeQuiInicio(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteQui.inicio);
    setExpedienteQui({ ...expedienteQui, inicio: parm });
    verifica24h(parm, expedienteQui.fim);
  }
  function onChangeQuiFim(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteQui.fim);
    setExpedienteQui({ ...expedienteQui, fim: parm });
    verifica24h(expedienteQui.inicio, parm);
  }
  //Sexta
  function onChangeSexInicio(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteSex.inicio);
    setExpedienteSex({ ...expedienteSex, inicio: parm });
    verifica24h(parm, expedienteSex.fim);
  }
  function onChangeSexFim(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteSex.fim);
    setExpedienteSex({ ...expedienteSex, fim: parm });
    verifica24h(expedienteSex.inicio, parm);
  }
  //Sábado
  function onChangeSabInicio(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteSab.inicio);
    setExpedienteSab({ ...expedienteSab, inicio: parm });
    verifica24h(parm, expedienteSab.fim);
  }
  function onChangeSabFim(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteSab.fim);
    setExpedienteSab({ ...expedienteSab, fim: parm });
    verifica24h(expedienteSab.inicio, parm);
  }
  //Domingo
  function onChangeDomInicio(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteDom.inicio);
    setExpedienteDom({ ...expedienteDom, inicio: parm });
    verifica24h(parm, expedienteDom.fim);
  }
  function onChangeDomFim(parm) {
    if (inibirCaractere(parm)) { return }
    parm = incluiDoisPontos(parm, expedienteDom.fim);
    setExpedienteDom({ ...expedienteDom, fim: parm });
    verifica24h(expedienteDom.inicio, parm);
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
          <View style={styles.containerTimer}>
            {InputText("Abertura", onChangeExpedientePadraoIncio, "00:00", 1, 5, "default", isEditavel, expedientePadrao.inicio, false)}
            <Text>até</Text>
            {InputText("Fechamento", onChangeExpedientePadraoFim, "00:00", 1, 5, "default", isEditavel, expedientePadrao.fim, false)}
          </View>
          <Text style={[styleApp.textButtonFlat, { color: styleColor.cinzaEscuro, alignSelf: 'center', marginTop: 8 }]}>Replicar para todos os dias</Text>
        </View>

        <View style={styles.containerPrincipal}>
          {is24h ? SempreAberto() :<></>}

          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[0]}</Text>
            </View>
            {InputText("", onChangeSegInicio, "00:00", 1, 5, "default", isEditavel, expedienteSeg.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeSegFim, "00:00", 1, 5, "default", isEditavel, expedienteSeg.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[1]}</Text>
            </View>
            {InputText("", onChangeTerInicio, "00:00", 1, 5, "default", isEditavel, expedienteTer.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeTerFim, "00:00", 1, 5, "default", isEditavel, expedienteTer.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[2]}</Text>
            </View>
            {InputText("", onChangeQuaInicio, "00:00", 1, 5, "default", isEditavel, expedienteQua.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeQuaFim, "00:00", 1, 5, "default", isEditavel, expedienteQua.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[3]}</Text>
            </View>
            {InputText("", onChangeQuiInicio, "00:00", 1, 5, "default", isEditavel, expedienteQui.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeQuiFim, "00:00", 1, 5, "default", isEditavel, expedienteQui.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[4]}</Text>
            </View>
            {InputText("", onChangeSexInicio, "00:00", 1, 5, "default", isEditavel, expedienteSex.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeSexFim, "00:00", 1, 5, "default", isEditavel, expedienteSex.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[5]}</Text>
            </View>
            {InputText("", onChangeSabInicio, "00:00", 1, 5, "default", isEditavel, expedienteSab.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeSabFim, "00:00", 1, 5, "default", isEditavel, expedienteSab.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isChecked} onValueChange={setChecked} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[6]}</Text>
            </View>
            {InputText("", onChangeDomInicio, "00:00", 1, 5, "default", isEditavel, expedienteDom.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeDomFim, "00:00", 1, 5, "default", isEditavel, expedienteDom.fim, false)}
          </View>

        </View>
        <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={prosseguir} >
          <Text style={styleApp.textButtonRegular}>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView >
  )
}