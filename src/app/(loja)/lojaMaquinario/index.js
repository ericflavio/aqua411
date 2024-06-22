import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from "react-native";
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
import { MontaMaquinario } from '../../../componentes/montaMaquinario';
import { Picker } from '@react-native-picker/picker';
import { styleSize } from '../../../styles/styleSize';

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
  const [selectedTipoExibicao, setTipoExibicao] = useState("conjunto");
  const [isEnabledStatus, setIsEnabledStatus] = useState(false);
  const toggleSwitch = () => setIsEnabledStatus(previousState => !previousState);
  const [maquinario, setMaquinario] = useState(schemaLojaMaquinario);
  const [maquinarioList, setMaquinarioList] = useState([]);
  const [lava, setLava] = useState(0);
  const [seca, setSeca] = useState(0);

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
  function onChangeLava(parm) {
    setLava(parm)
  };
  function onChangeSeca(parm) {
    setSeca(parm)
  };

  //Funções auxiliares 
  function handleShowModal() {
    setflagShowModal(!flagShowModal);
  }
  function showModalMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  };

  function infoViewStatus() {
    Alert.alert("STATUS", "Para resposta SIM, o status de cada máquina poderá ser visualizado pelos clientes. Isso vai depender de configurações com a provedora da informação e também do consentimento da Franqueadora, caso sua loja esteja vincualda a uma.");
  };

  async function incluiLava() {
    const cj = lava.toString() + seca.toString();
    const maq = {
      idMaquina: "UUID" + lava,
      tipo: "l",
      nrConjunto: cj,
      numeroLabel: lava,
      nomeLabel: "Lava",
      status: "Disponível",
    }
    setMaquinarioList(maquinarioList => [...maquinarioList, maq])
  };
  async function incluiSeca() {
    const cj = lava.toString() + seca.toString();
    const maq = {
      idMaquina: "UUID" + seca,
      tipo: "s",
      nrConjunto: cj,
      numeroLabel: seca,
      nomeLabel: "Seca",
      status: "Indisponível",
    }
    setMaquinarioList(maquinarioList => [...maquinarioList, maq])
  };
  async function incluiLavaSeca() {
    incluiLava();
    incluiSeca();
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

        <View style={[styles.containerPrincipal, { justifyContent: 'center', alignItems: 'center', marginBottom: 10 }]}>
          {processing.isOnlyConsulta ? <></> :
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 12, gap: 20, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 4, alignItems: 'center' }}>
                <Text style={styleApp.textRegular}>LAVA:</Text>
                {InputText("Número", onChangeLava, "0", 1, 2, "numeric", isEditavel, lava, false)}

              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 4, alignItems: 'center' }}>
                <Text style={styleApp.textRegular}>SECA:</Text>
                {InputText("Número", onChangeSeca, "0", 1, 2, "numeric", isEditavel, seca, false)}

              </View>
            </View>
          }

          {processing.isOnlyConsulta ? <></> :
            <View style={{ width: '85%', alignItems: 'stretch' }}>
              <TouchableOpacity style={styleApp.buttonFlatVBorda} disabled={!isEditavel} onPress={incluiLavaSeca} >
                <Text style={styleApp.textButtonFlat}>Adicionar o conjunto (lava e seca)</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
                <TouchableOpacity style={styleApp.buttonFlatVBorda} disabled={!isEditavel} onPress={incluiLava} >
                  <Text style={styleApp.textButtonFlat}>Adicionar Lava</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleApp.buttonFlatVBorda} disabled={!isEditavel} onPress={incluiSeca} >
                  <Text style={styleApp.textButtonFlat}>Adicionar Seca</Text>
                </TouchableOpacity>
              </View>
            </View>
          }
        </View>

        <View style={[styles.containerPrincipal, { justifyContent: 'center', alignItems: 'center', marginBottom: 10 }]}>

          {MontaMaquinario(maquinarioList, selectedTipoExibicao, true)}

          {maquinarioList.length <= 0 ? <></> :
            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10, borderRadius: 12, borderLeftWidth: 1, borderRightWidth: 1, borderColor: styleColor.erro }}>
              <MaterialIcons name="delete-forever" size={styleApp.size.iconSizeRegular} color={styleColor.erro} />
              <Text style={styleApp.textSmallItalico}>Pressione e segure para editar/excluir</Text>
            </View>
          }

        </View>

        <View style={{ alignItems: 'center' }}>
          <MaterialIcons name="more-horiz" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
        </View>

        <View style={[styles.containerPrincipal, { justifyContent: 'flex-start', alignItems: 'center', padding: 16 }]}>
          <Text style={[styleApp.textSmall, { alignSelf: "flex-start", marginLeft: 0 }]}>Como as máquina serão exibidas?</Text>
          <View style={styles.containerPicker}>
            <Picker
              enabled={isEditavel}
              selectedValue={selectedTipoExibicao}
              onValueChange={(itemValue, itemIndex) =>
                setTipoExibicao(itemValue)
              }>
              <Picker.Item label="Conjunto (Lavadora embaixo)" value="conjunto" />
              <Picker.Item label="Lista" value="lista" />
            </Picker>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', borderWidth: 0, width: '100%' }}>
            <View style={{ borderWidth: 0 }}>
              <Text style={[styleApp.textSmall, { alignSelf: "flex-start", marginLeft: 0 }]}>O status da máquina estará visível?</Text>
              <View style={{ flexDirection: 'row', marginLeft: 0, justifyContent: "flex-start", alignItems: "center", gap: 4, borderWidth: 0 }}>
                <Text style={[styleApp.textRegular, { color: isEnabledStatus ? styleColor.cinzaMedio : styleColor.tema30pPrincipal }]}>Não</Text>
                <Switch
                  disabled={!isEditavel}
                  trackColor={{ false: '#767577', true: '#767577' }}
                  thumbColor={isEnabledStatus ? styleColor.tema30pPrincipal : '#f4f3f4'}
                  ios_backgroundColor="#767577"
                  onValueChange={toggleSwitch}
                  value={isEnabledStatus}
                />
                <Text style={[styleApp.textRegular, { color: isEnabledStatus ? styleColor.tema30pPrincipal : styleColor.cinzaMedio }]}>Sim</Text>
              </View>
            </View>
            <View style={{ flexShrink: 1, justifyContent: 'center', alignItems: 'center', borderWidth: 0, borderColor: styleColor.cinzaClaro, width: '100%', height: '100%' }}>
              <TouchableOpacity disabled={false} onPress={infoViewStatus} >
                <MaterialIcons name="info-outline" size={styleSize.iconSizeLarge} color={styleColor.pretoRelativo} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView >
  )
}