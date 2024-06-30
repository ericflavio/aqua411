import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp, divisorSection } from '../../../styles/styleApp';
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

//TODO: persistir máquinas localmente + ts_ultima_atualizacao

export default function ViewMaquinarioLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja, naviateParmOnlyConsulta } = useLocalSearchParams();
  navigateParmLoja && navigateParmLoja !== null ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  naviateParmOnlyConsulta ? parmOnlyConsulta = JSON.parse(naviateParmOnlyConsulta) : parmOnlyConsulta = true;

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: parmOnlyConsulta });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
  const [flagShowModal, setflagShowModal] = useState(false);

  //Outras declarações
  const [flagShowModalEdicao, setflagShowModalEdicao] = useState({ show: false, maq: null });
  const [selectedTipoExibicao, setTipoExibicao] = useState(schemaTipoViewMaquinario.conjunto);
  const [selectedAcao, setSelectedAcao] = useState("selecionar");
  const [selectedAcao2, setSelectedAcao2] = useState("selecionar");
  const [isEnabledStatus, setIsEnabledStatus] = useState(false);
  const toggleSwitch = () => setIsEnabledStatus(previousState => !previousState);
  const [maquinario, setMaquinario] = useState(schemaLojaMaquinario);
  const [maquinarioList, setMaquinarioList] = useState([]);
  const [lava, setLava] = useState("");
  const [seca, setSeca] = useState("");
  //Edição
  const [statusManutencao, setStatusManutencao] = useState(false);

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
    const showHide = flagShowModalEdicao.show;
    setflagShowModalEdicao({ ...flagShowModalEdicao, show: !showHide });
  }

  function infoViewStatus() {
    Alert.alert("STATUS", "Para resposta SIM, o status de cada máquina poderá ser visualizado pelos clientes. Isso vai depender de configurações com a provedora da informação e também do consentimento da Franqueadora, caso sua loja esteja vincualda a uma.");
  };

  function validaNumeroMaquina(tipo) {
    if (tipo === 'l') { //Lava 
      if (lava === "" || lava === "0" || lava === "00" || lava === null) {
        return "lj016";
      }
      const existe = maquinarioList.findIndex((item) => item.numeroLabel === lava);
      if (existe !== -1) {
        return "lj014";
      }
    } else { //Seca
      if (seca === "" || seca === "0" || seca === "00" || seca === null) {
        return "lj017";
      }
      const existe = maquinarioList.findIndex((item) => item.numeroLabel === seca);
      if (existe !== -1) {
        return "lj015";
      }
    }
    return "ok";
  }

  function handleLava() {
    const e = validaNumeroMaquina("l");
    if (e !== "ok") { //Número inválido
      ShowErrorMessage(e)
      return
    };

    incluiLava();

  }
  function handleSeca() {
    const e = validaNumeroMaquina("s");
    if (e !== "ok") { //Número inválido
      ShowErrorMessage(e)
      return
    };

    incluiSeca();
  }
  function handleConjunto() {
    var e = validaNumeroMaquina("l");
    if (e !== "ok") { //Número inválido
      ShowErrorMessage(e)
      return
    };
    var e = validaNumeroMaquina("s");
    if (e !== "ok") { //Número inválido
      ShowErrorMessage(e)
      return
    };

    incluiLava(true);
    incluiSeca(true);
  }

  async function incluiLava(isConjunto) {
    //Código do conjunto (ou unidade separada)
    var cj = "";
    if (isConjunto !== undefined && isConjunto === true) { //Clicou no botão incluir conjunto
      cj = lava.toString() + seca.toString()
    } else {
      cj = lava.toString()
    };

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

  async function incluiSeca(isConjunto) {
    //Código do conjunto (ou unidade separada)
    var cj = "";
    if (isConjunto !== undefined && isConjunto === true) { //Clicou no botão incluir conjunto
      cj = lava.toString() + seca.toString();
    } else {
      cj = seca.toString()
    }

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

  function handleEditarMaquinario(item) {
    console.log("maquina selecionada ", item)
  }
  function handleSelecionarMaquinario(maq) {
    //Recebe a maquina selecionada na modal MontarMaquinário e abre a modal de edição
    setflagShowModalEdicao({ ...flagShowModalEdicao, show: true, maq: maq });
    setSelectedAcao("selecionar");
    setSelectedAcao2("selecionar");
  }

  //Ações ao clicar no botão principal (confirmar/prosseguir)
  async function prosseguir() {
    if (processing.isLoading) { return };

    /*     if (!validarSintaxeLatitude()) {
          ShowErrorMessage("gu012");
        return;
        }; */

    /*     setProcessing({...processing, isExecuting: true });

        try {
          const res = await atualizaLocalizacaoLoja(maquinario);
        showModalMsgResultado();
        } catch {
          ShowErrorMessage("lj010");
        }
        setProcessing({...processing, isExecuting: false }); */
  }

  async function confirmaExclusaoMaquina() {
    if (selectedAcao === "excluir" || selectedAcao2 === "excluir") {
      Alert.alert('CONFIRMAÇÃO', 'Você realmente deseja excluir este maquinário?', [
        {
          text: 'NÃO',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'EXCLUIR', onPress: () => console.log('exclir') },
      ]);
    }

    //TODO: realizar exclusoes
    //TODO: atualizar status manutenção (colocar ou remover o status)
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
        {ModalEdicaoMaquina()}

        {processing.isLoading ? <View style={{ width: 310, height: 310 }}></View> :
          <View style={styles.containerPrincipal}>
            {maquinarioList && maquinarioList !== null && maquinarioList.length > 0 ?
              <Text style={styleApp.textSmallItalico}>Clique na máquina para editar/excluir</Text>
              : <></>}
            {MontaMaquinario(maquinarioList, selectedTipoExibicao, isEnabledStatus, handleSelecionarMaquinario)}
          </View>
        }

        {processing.isOnlyConsulta ? <></> :
          <View style={styles.containerPrincipal}>
            {divisorSection("Incluir novas máquinas")}

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginTop: 0, gap: 20, marginBottom: 0 }}>
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
              <TouchableOpacity style={styleApp.buttonFlatVBorda} disabled={!isEditavel} onPress={handleConjunto} >
                <Text style={styleApp.textButtonFlat}>Adicionar conjunto (Lava e Seca)</Text>
              </TouchableOpacity>

              <View style={{ flexDirection: 'row', gap: 6, marginTop: 6 }}>
                <TouchableOpacity style={styleApp.buttonFlatVBorda} disabled={!isEditavel} onPress={handleLava} >
                  <Text style={styleApp.textButtonFlat}>Adicionar Lava</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleApp.buttonFlatVBorda} disabled={!isEditavel} onPress={handleSeca} >
                  <Text style={styleApp.textButtonFlat}>Adicionar Seca</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }

        {divisorSection("Exibição")}

        <View style={[styles.containerPrincipal, { justifyContent: 'flex-start', alignItems: 'flex-start', padding: 16 }]}>
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
              <Text style={[styleApp.textSmall, { alignSelf: "flex-start" }]}>O status da máquina estará visível?</Text>
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

  function ModalEdicaoMaquina() {
    return (
      <Modal
        animationType={"slide"} //fade slide none
        transparent={true}
        visible={flagShowModalEdicao.show}
        onRequestClose={() => { }}>
        <View style={styles.containerModal}>
          <View style={styles.modalView}>
            <View style={styles.modalClose}>
              <TouchableOpacity style={styleApp.buttonFlatHL_transp} disabled={false} onPress={handleShowModalEdicao} >
                <MaterialIcons name="close" size={styleApp.size.iconSizeButtonLarge} color={styleApp.color.textButtonFlat} />
              </TouchableOpacity>
            </View>

            <View style={styles.containerEdicao}>
              <View style={{ flexDirection: 'row', gap: 4 }}>
                <Text style={styleApp.textSmall}>Selecione a opção de edição</Text>
                <MaterialIcons name="edit" size={styleApp.size.iconSizeButtonLarge} color={styleApp.color.textButtonFlat} />
                <MaterialIcons name="delete-forever" size={styleApp.size.iconSizeButtonLarge} color={styleApp.color.textButtonFlat} />
              </View>
              <View style={[styles.containerMaquinaEdicao, { backgroundColor: selectedAcao === "excluir" || selectedAcao2 === "excluir" ? styleColor.erro : "white" }]}>
                {Array.isArray(flagShowModalEdicao.maq) ?
                  <>
                    {!flagShowModalEdicao.maq[0] || flagShowModalEdicao.maq[0] === null ? <></> :
                      <View style={styles.containerEdicaoAcao}>
                        <Text style={styleApp.textSubtitulo}>{flagShowModalEdicao.maq[0].nomeLabel} {flagShowModalEdicao.maq[0].numeroLabel}</Text>
                        <View style={[styles.containerPicker, { width: '70%' }]}>
                          <Picker
                            enabled={isEditavel}
                            selectedValue={selectedAcao}
                            onValueChange={(itemValue, itemIndex) =>
                              setSelectedAcao(itemValue)
                            }>
                            <Picker.Item label="Selecionar" value="selecionar" />
                            {
                              flagShowModalEdicao.maq[0].status === schemaStatusMaquinario.manutencao ?
                                <Picker.Item label="Em Atividade" value="atividade" />
                                :
                                <Picker.Item label="Em Manutenção" value="manutencao" />
                            }
                            <Picker.Item label="Excluir" value="excluir" />
                          </Picker>
                        </View>
                      </View>
                    }
                    {!flagShowModalEdicao.maq[1] || flagShowModalEdicao.maq[1] === null ? <></> :
                      <View style={styles.containerEdicaoAcao}>
                        <Text style={styleApp.textSubtitulo}>{flagShowModalEdicao.maq[1].nomeLabel} {flagShowModalEdicao.maq[1].numeroLabel}</Text>
                        <View style={[styles.containerPicker, { width: '70%' }]}>
                          <Picker
                            enabled={isEditavel}
                            selectedValue={selectedAcao2}
                            onValueChange={(itemValue, itemIndex) =>
                              setSelectedAcao2(itemValue)
                            }>
                            <Picker.Item label="Selecionar" value="selecionar" />
                            {
                              flagShowModalEdicao.maq[1].status === schemaStatusMaquinario.manutencao ?
                                <Picker.Item label="Em Atividade" value="atividade" />
                                :
                                <Picker.Item label="Em Manutenção" value="manutencao" />
                            }
                            <Picker.Item label="Excluir" value="excluir" />
                          </Picker>
                        </View>
                      </View>
                    }
                  </>
                  :
                  <>
                    <Text style={styleApp.textRegular}>Oops! As informações do maquinário não foram recuperadas.</Text>
                  </>
                }
              </View>

              {processing.isOnlyConsulta ? <></> :
                <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={confirmaExclusaoMaquina} >
                  <Text style={styleApp.textButtonRegular}>Confirmar</Text>
                </TouchableOpacity>
              }
            </View>

          </View>
        </View>
      </Modal>
    )
  }
}