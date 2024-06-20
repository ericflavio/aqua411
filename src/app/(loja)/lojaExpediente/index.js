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
import { schemaLojaExpediente } from '../../../schemas/lojaSchema';
import { atualizaExpedienteLoja, consultaExpedienteLoja } from '../../../services/lojaService';
import ModalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';
import MostraTag24horas from '../../../componentes/mostraTag24Horas';
import { Picker } from '@react-native-picker/picker';

export default function ViewExpedienteLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja, naviateParmOnlyConsulta } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  naviateParmOnlyConsulta ? parmOnlyConsulta = JSON.parse(naviateParmOnlyConsulta) : parmOnlyConsulta = true;

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: parmOnlyConsulta });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
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
  const [isCheckedSeg, setCheckedSeg] = useState(true);
  const [isCheckedTer, setCheckedTer] = useState(true);
  const [isCheckedQua, setCheckedQua] = useState(true);
  const [isCheckedQui, setCheckedQui] = useState(true);
  const [isCheckedSex, setCheckedSex] = useState(true);
  const [isCheckedSab, setCheckedSab] = useState(true);
  const [isCheckedDom, setCheckedDom] = useState(true);
  const [selectedResposta, setSelectedResposta] = useState("0"); //0-não selecionado, 1-sim, 2-não

  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  //Carrega dados pre-existentes
  async function fetchDados() {
    try {
      carregaDadosObtidosNoLoading(await consultaExpedienteLoja("s"));
      setProcessing({ ...processing, isLoading: false });
    } catch {
      ShowErrorMessage("lj011");
      setProcessing({ ...processing, isLoading: false, isOnlyConsulta: true });
    };
  }

  function carregaDadosObtidosNoLoading(res) {
    if (res === null) {
      setExpediente(schemaLojaExpediente);
      return;
    }
    setExpediente(res);

    for (var i = 0; i < res.dia.length; i++) {
      console.log("dia ", res.dia[i])
      switch (res.dia[i]) {
        case "Seg":
          res.aberto[i] === "s" ? setCheckedSeg(true) : setCheckedSeg(false);
          setExpedienteSeg({ inicio: res.hrInicio[i], fim: res.hrFim[i], })
          break;
        case "Ter":
          res.aberto[i] === "s" ? setCheckedTer(true) : setCheckedTer(false);
          setExpedienteTer({ inicio: res.hrInicio[i], fim: res.hrFim[i], })
          break;
        case "Qua":
          res.aberto[i] === "s" ? setCheckedQua(true) : setCheckedQua(false);
          setExpedienteQua({ inicio: res.hrInicio[i], fim: res.hrFim[i], })
          break;
        case "Qui":
          res.aberto[i] === "s" ? setCheckedQui(true) : setCheckedQui(false);
          setExpedienteQui({ inicio: res.hrInicio[i], fim: res.hrFim[i], })
          break;
        case "Sex":
          res.aberto[i] === "s" ? setCheckedSex(true) : setCheckedSex(false);
          setExpedienteSex({ inicio: res.hrInicio[i], fim: res.hrFim[i], })
          break;
        case "Sab":
          res.aberto[i] === "s" ? setCheckedSab(true) : setCheckedSab(false);
          setExpedienteSab({ inicio: res.hrInicio[i], fim: res.hrFim[i], })
          break;
        case "Dom":
          res.aberto[i] === "s" ? setCheckedDom(true) : setCheckedDom(false);
          setExpedienteDom({ inicio: res.hrInicio[i], fim: res.hrFim[i], })
          break;
      }
    }

    set24h(res.inPermanentementeAberto);
    res.inAtendeChamadosForaDoExpediente ? setSelectedResposta(res.inAtendeChamadosForaDoExpediente) : setSelectedResposta("0");
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
  function handleShowModal() {
    setflagShowModal(!flagShowModal);
  }
  function showModalMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  }
  function validaSitaxeHorario(hr) {
    //Hora inicio
    if (hr === undefined || hr.inicio === undefined || hr.inicio === null || hr.inicio === "") {
      return false
    }
    var hm = hr.inicio.split(":"); //Quebra "HH:MM" mem duas ocorrencias de um array
    const hi = Number(hm[0]); //Transforma HH em numero
    const mi = Number(hm[1]); //Transforma MM em numero
    if (hi > 23 || hi < 0 || mi < 0 || mi >= 60) {
      return false
    }

    //Hora fim
    if (hr === undefined || hr.fim === undefined || hr.fim === null || hr.fim === "") {
      return false
    }
    hm = hr.fim.split(":"); //Quebra "HH:MM" mem duas ocorrencias de um array
    const hf = Number(hm[0]); //Transforma HH em numero
    const mf = Number(hm[1]); //Transforma MM em numero
    if (hf > 23 || hf < 0 || mf < 0 || mf >= 60) {
      return false
    }

    //Comparação entre as duas
    if ((hi > hf && hf !== 0) || (hi > hf && hf === 0 && mf !== 0)) {
      return false
    }
    if (hi === hf && mi >= mf && mi !== 0) {
      return false
    }

    //Tudo ok
    return true;
  }

  //Ações ao clicar no botão principal (confirmar/prosseguir)
  async function prosseguir() {
    if (processing.isLoading) { return }; //ignora o botão, ainda clicável, até que os dados sejam carregados

    if (isCheckedSeg) {
      if (!validaSitaxeHorario(expedienteSeg)) {
        ShowErrorMessage("lj012");
        return;
      };
    } else {
      setExpedienteSeg({ inicio: "", fim: "" });
    }
    if (isCheckedTer) {
      if (!validaSitaxeHorario(expedienteTer)) {
        ShowErrorMessage("lj012");
        return;
      };
    } else {
      setExpedienteTer({ inicio: "", fim: "" });
    }
    if (isCheckedQua) {
      if (!validaSitaxeHorario(expedienteQua)) {
        ShowErrorMessage("lj012");
        return;
      };
    } else {
      setExpedienteQua({ inicio: "", fim: "" });
    }
    if (isCheckedQui) {
      if (!validaSitaxeHorario(expedienteQui)) {
        ShowErrorMessage("lj012");
        return;
      };
    } else {
      setExpedienteQui({ inicio: "", fim: "" });
    }
    if (isCheckedSex) {
      if (!validaSitaxeHorario(expedienteSex)) {
        ShowErrorMessage("lj012");
        return;
      };
    } else {
      setExpedienteSex({ inicio: "", fim: "" });
    }
    if (isCheckedSab) {
      if (!validaSitaxeHorario(expedienteSab)) {
        ShowErrorMessage("lj012");
        return;
      };
    } else {
      setExpedienteSab({ inicio: "", fim: "" });
    }
    if (isCheckedDom) {
      if (!validaSitaxeHorario(expedienteDom)) {
        ShowErrorMessage("lj012");
        return;
      };
    } else {
      setExpedienteDom({ inicio: "", fim: "" });
    }

    setProcessing({ ...processing, isExecuting: true });

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

        {ModalSimples(flagShowModal, handleShowModal, "Expediente atualizado!", "TipoMsg", "Título", processing)}

        {processing.isOnlyConsulta ? <></> :
          <View style={styles.containerPrincipal}>
            <Text style={[styleApp.textRegular, { color: styleColor.cinzaEscuro, alignSelf: 'center', marginTop: 8, }]}>
              Informe abaixo o horário comum dos dias de funcionamento
            </Text>
            <View style={styles.containerTimer}>
              {InputText("Abertura", onChangeExpedientePadraoIncio, "00:00", 1, 5, "default", isEditavel, expedientePadrao.inicio, false)}
              <Text>até</Text>
              {InputText("Fechamento", onChangeExpedientePadraoFim, "00:00", 1, 5, "default", isEditavel, expedientePadrao.fim, false)}
            </View>
          </View>
        }

        <View style={styles.containerPrincipal}>
          {is24h ? MostraTag24horas() : <></>}

          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isCheckedSeg} onValueChange={setCheckedSeg} disabled={!isEditavel} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[0]}</Text>
            </View>
            {InputText("", onChangeSegInicio, "00:00", 1, 5, "default", isEditavel, expedienteSeg.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeSegFim, "00:00", 1, 5, "default", isEditavel, expedienteSeg.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isCheckedTer} onValueChange={setCheckedTer} disabled={!isEditavel} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[1]}</Text>
            </View>
            {InputText("", onChangeTerInicio, "00:00", 1, 5, "default", isEditavel, expedienteTer.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeTerFim, "00:00", 1, 5, "default", isEditavel, expedienteTer.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isCheckedQua} onValueChange={setCheckedQua} disabled={!isEditavel} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[2]}</Text>
            </View>
            {InputText("", onChangeQuaInicio, "00:00", 1, 5, "default", isEditavel, expedienteQua.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeQuaFim, "00:00", 1, 5, "default", isEditavel, expedienteQua.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isCheckedQui} onValueChange={setCheckedQui} disabled={!isEditavel} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[3]}</Text>
            </View>
            {InputText("", onChangeQuiInicio, "00:00", 1, 5, "default", isEditavel, expedienteQui.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeQuiFim, "00:00", 1, 5, "default", isEditavel, expedienteQui.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isCheckedSex} onValueChange={setCheckedSex} disabled={!isEditavel} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[4]}</Text>
            </View>
            {InputText("", onChangeSexInicio, "00:00", 1, 5, "default", isEditavel, expedienteSex.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeSexFim, "00:00", 1, 5, "default", isEditavel, expedienteSex.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isCheckedSab} onValueChange={setCheckedSab} disabled={!isEditavel} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[5]}</Text>
            </View>
            {InputText("", onChangeSabInicio, "00:00", 1, 5, "default", isEditavel, expedienteSab.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeSabFim, "00:00", 1, 5, "default", isEditavel, expedienteSab.fim, false)}
          </View>
          <View style={styles.containerTimer}>
            <Checkbox style={{ margin: 8 }} value={isCheckedDom} onValueChange={setCheckedDom} disabled={!isEditavel} />
            <View style={{ width: 50, borderWidth: 0 }}>
              <Text style={styleApp.textRegular}>{expediente.dia[6]}</Text>
            </View>
            {InputText("", onChangeDomInicio, "00:00", 1, 5, "default", isEditavel, expedienteDom.inicio, false)}
            <Text>até</Text>
            {InputText("", onChangeDomFim, "00:00", 1, 5, "default", isEditavel, expedienteDom.fim, false)}
          </View>

        </View>

        <View style={styles.containerEspecial}>
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="local-laundry-service" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
            <MaterialIcons name="emoji-people" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          </View>
          <Text style={[styleApp.textRegular, { color: styleColor.cinzaEscuro, alignSelf: 'center', marginTop: 8, }]}>
            Os clientes podem contatar a loja para negociar a possibilidade de realizar serviços fora do horário de atendimento padrão?
          </Text>

          <View style={styles.containerPicker}>
            <Picker
              enabled={isEditavel}
              selectedValue={selectedResposta}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedResposta(itemValue)
              }>
              <Picker.Item label="Não determinado" value="0" />
              <Picker.Item label="SIM, com certeza!" value="1" />
              <Picker.Item label="NÂO, infelizmente" value="2" />
            </Picker>
          </View>

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