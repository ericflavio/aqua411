import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { InputText } from '../../../componentes/inputText';
import { AuthContext } from "../../../contexts/auth";
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { schemaLojaMaquinario, schemaStatusMaquinario, schemaTipoViewMaquinario } from '../../../schemas/lojaSchema';
import { consultaListaMaquinario } from '../../../services/lojaService';
import ModalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';
import { MontaMaquinario } from '../../../componentes/montaMaquinario';
import { Picker } from '@react-native-picker/picker';
import { styleSize } from '../../../styles/styleSize';
import { ModalEditarMaquinario } from './modalEditarMaquinario';

export default function ViewMaquinarioLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja, naviateParmOnlyConsulta } = useLocalSearchParams();
  navigateParmLoja && navigateParmLoja !== null ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  naviateParmOnlyConsulta ? parmOnlyConsulta = JSON.parse(naviateParmOnlyConsulta) : parmOnlyConsulta = false;

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: parmOnlyConsulta });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
  const [flagShowModal, setflagShowModal] = useState(false);

  //Outras declarações
  const [flagShowModalEdicao, setflagShowModalEdicao] = useState(false);
  const [selectedTipoExibicao, setTipoExibicao] = useState(schemaTipoViewMaquinario.conjunto);
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
      const res = await consultaListaMaquinario();
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
  function handleShowModalEdicao() {
    setflagShowModalEdicao(!flagShowModalEdicao);
  }

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
      status: schemaStatusMaquinario.disponivel,
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
      status: schemaStatusMaquinario.disponivel,
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

  //Edição de cada maquina
  function handleEditarMaquinario() {
  }

  //Apresentação da view principal
  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <MaterialIcons name="local-laundry-service" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Maquinário</Text>
        </View>

        {ModalSimples(flagShowModal, handleShowModal, "Máquinas atualizadas!", "TipoMsg", "Título", processing)}

        <Modal
          animationType={"slide"} //fade slide none
          transparent={true}
          visible={flagShowModalEdicao}
          onRequestClose={() => { }}>
          <View style={styles.containerModal}>
            <View style={styles.modalView}>
              <View style={styles.modalClose}>
                <TouchableOpacity style={styleApp.buttonFlatHL_transp} disabled={false} onPress={handleShowModalEdicao} >
                  <MaterialIcons name="close" size={styleApp.size.iconSizeButtonLarge} color={styleApp.color.textButtonFlat} />
                </TouchableOpacity>
              </View>
              {ModalEditarMaquinario(handleEditarMaquinario)}
            </View>
          </View>
        </Modal>

        {processing.isOnlyConsulta ? <></> :
          <View style={styles.containerPrincipal}>
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
          </View>
        }

        <View style={styles.containerPrincipal}>
          {MontaMaquinario(maquinarioList, selectedTipoExibicao, isEnabledStatus)}

          {/*       {maquinarioList.length <= 0 ? <></> :
            <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10, borderRadius: 12, borderLeftWidth: 1, borderRightWidth: 1, borderColor: styleColor.erro }}>
              <MaterialIcons name="delete-forever" size={styleApp.size.iconSizeRegular} color={styleColor.erro} />
              <Text style={styleApp.textSmallItalico}>Pressione e segure para editar/excluir</Text>
            </View>
          } */}
        </View>

        <View style={{ alignItems: 'center' }}>
          <MaterialIcons name="more-horiz" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
        </View>

        <View style={[styles.containerPrincipal, { justifyContent: 'flex-start', alignItems:'flex-start', padding: 16 }]}>
          <Text style={styleApp.textSmall}>Como as máquina serão exibidas?</Text>
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

          <View style={styles.containerFlagStatus}>
            <View style={{ borderWidth: 0 }}>
              <Text style={[styleApp.textSmall, { alignSelf: "flex-start"}]}>O status da máquina estará visível?</Text>
              <View style={styles.containerTogle}>
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
            <View style={styles.containerInfo}>
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