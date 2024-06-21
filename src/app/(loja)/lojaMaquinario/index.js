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
import { MontaMaquinario } from '../../../componentes/montaMaquinario';

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
  const [maquinario, setMaquinario] = useState(schemaLojaMaquinario);
  const [maquinarioList, setMaquinarioList] = useState([]);
  const [lava, setLava] = useState("0");
  const [seca, setSeca] = useState("0");
  var mm = [];

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  //Carrega dados pre-existentes
  async function fetchDados() {
    try {
      //res = await consultaListaMaquinario();
      res = null
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
  function incluiLava() {
    const maq = {
      idMaquina: "UUID" + lava,
      tipo: "l",
      nrConjunto: 123,
      numeroLabel: lava,
      nomeLabel: "Lava",
      status: "Disponível",
    }
    return maq;
    var m = maquinarioList;
    m.push(maq);
    console.log("m.seca: ", m)
    setMaquinarioList(m)
  };
  function incluiSeca() {
    const maq = {
      idMaquina: "UUID" + seca,
      tipo: "s",
      nrConjunto: 123,
      numeroLabel: seca,
      nomeLabel: "Seca",
      status: "Disponível",
    }
    return maq;
    var m = maquinarioList;
    m.push(maq);
    console.log("m.lava: ", m)
    setMaquinarioList(m)
  };
  function incluiLavaSeca() {
    const m1 = incluiLava();
    const m2 = incluiSeca();
    //mm = maquinarioList;
    mm.push(m1);
    mm.push(m2);
    setMaquinarioList(mm)
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

        <View style={[styles.containerPrincipal, { justifyContent: 'center', alignItems: 'center' }]}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 12, gap: 12 }}>
            <View style={{ maxWidth: "50%", flexShrink: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styleApp.textRegular}>Lava</Text>
              {InputText("Número", onChangeLava, "1", 1, 2, "default", isEditavel, lava, false)}
              <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={incluiLava} >
                <Text style={styleApp.textButtonRegular}>+Lava</Text>
              </TouchableOpacity>
            </View>
            <View style={{ maxWidth: "50%", flexShrink: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styleApp.textRegular}>Seca</Text>
              {InputText("Número", onChangeSeca, "1", 1, 2, "default", isEditavel, seca, false)}
              <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={incluiSeca} >
                <Text style={styleApp.textButtonRegular}>+Seca</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={incluiLavaSeca} >
            <Text style={styleApp.textButtonRegular}>+Conjunto (lava e seca)</Text>
          </TouchableOpacity>

          {MontaMaquinario(maquinarioList, "conjunto", false)}

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