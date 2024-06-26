import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, FlatList } from "react-native";
import Checkbox from 'expo-checkbox';
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { InputText } from '../../../componentes/inputText';
import { AuthContext } from "../../../contexts/auth";
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { schemaLojaTiposFacilidades, schemaLojaFacilidades } from '../../../schemas/lojaSchema';
import { consultaTiposFacilidades, consultaLojaFacilidades } from '../../../services/lojaService';
import ModalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { styleSize } from '../../../styles/styleSize';

export default function ViewLojaFacilidades() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja, naviateParmOnlyConsulta } = useLocalSearchParams();
  navigateParmLoja && navigateParmLoja !== null ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  naviateParmOnlyConsulta ? parmOnlyConsulta = JSON.parse(naviateParmOnlyConsulta) : parmOnlyConsulta = true;

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: parmOnlyConsulta });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
  const [flagShowModal, setflagShowModal] = useState(false);

  //Outras declarações
  const [tipoFacilidadeList, setTipoFacilidadeList] = useState([])
  const [facilidadeLojaList, setFacilidadeLojaList] = useState([])
  const [facilidade, setFacilidade] = useState({})
  const [isChecked, setChecked] = useState([]);

  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;

  //TODO: Persistir e ler tipos de facilidades localmente + ts ultima atualizacao
  //TODO: em caso de nova facilidade, nos enviar um email

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  async function fetchDados() {
    try {
      const resTiposFacilidades = await consultaTiposFacilidades();
      carregaTiposFacilidades(resTiposFacilidades);
      const resFacilidades = await consultaLojaFacilidades();
      carregaFacilidadesLoja(resFacilidades);
      montaFacilidades(resTiposFacilidades, resFacilidades);
      setProcessing({ ...processing, isLoading: false });
    } catch (e) {
      ShowErrorMessage(e);
      setProcessing({ ...processing, isLoading: false, isOnlyConsulta: true });
    };
  }

  function carregaTiposFacilidades(res) {
    if (res === null) {
      throw "lj018"
    }
    setTipoFacilidadeList(res);
  }
  function carregaFacilidadesLoja(res) {
    if (res === null) {
      throw "lj019"
    }
    setFacilidadeLojaList(res);
  }
  function handleChecked(indice) {
    var check = isChecked;
    check[indice] = !check[indice]; //liga/desliga
    setChecked(check);
  }
  function handleTouchable(indice) {
    handleChecked(indice)
  }

  //Monta Facilidades
  function montaFacilidades(resTiposFacilidades, resFacilidadesLoja) {
    var index = 0;
    for (var i = 0; i < resTiposFacilidades.length; i++) {
      //Para cada Faclidade (geral do app), verifica se a loja o possui
      index = resFacilidadesLoja.findIndex((elemento) => elemento.codigo === resTiposFacilidades[i].codigo);
      if (index !== -1) { //Localizado (a loja possui)
        resTiposFacilidades[i].checked = true
      } else {
        resTiposFacilidades[i].checked = false
      }
    }
    setTipoFacilidadeList(resTiposFacilidades);
  }

  const renderItem = ({ item }) => (
    <View style={styles.containerFacilidade}>
      <View style={{ minWidth: '10%', borderWidth: 0 }}>
        <MaterialIcons name={item.nomeIcone_MaterialIcons} size={styleApp.size.iconSizeSmall} color={styleColor.textSubtitulo} />
      </View>
      <View style={{ width: '80%', flexShrink: 1, borderWidth: 0 }}>
        <Text style={styleApp.textSmall}>{item.titulo}</Text>
      </View>
      <View style={{ minWidth: '10%', borderWidth: 0 }}>
        <Checkbox
          disabled={!isEditavel}
          value={item.checked || false}
          onValueChange={(newValue) => {
            // Atualize o estado do item quando o checkbox for alterado
            setTipoFacilidadeList((prevData) =>
              prevData.map((prevItem) =>
                prevItem.codigo === item.codigo
                  ? { ...prevItem, checked: newValue }
                  : prevItem
              )
            );
          }}
        />
      </View>
    </View>
  );

  //Valida campos de formulario

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
    if (processing.isLoading) { return }; //ignora o botão, ainda clicável, até que os dados sejam carregados

    /*     if (isCheckedSeg) {
          if (!validaSitaxeHorario(expedienteSeg)) {
            ShowErrorMessage("lj012");
            return;
          };
        } else {
          setExpedienteSeg({ inicio: "", fim: "" });
        } */

    setProcessing({ ...processing, isExecuting: true });

    /*     try {
          const res = await atualizaExpedienteLoja(expediente);
          showModalMsgResultado();
        } catch {
          ShowErrorMessage("lj003");
        } */
    setProcessing({ ...processing, isExecuting: false });
  }

  //Apresentação da view principal
  return (
    <SafeAreaView style={[styleApp.containerSafeArea, {paddingHorizontal: styleSize.containerDistanciamentoHorizontalRegular}]}>
      <View style={styles.containerHeader}>
        <MaterialIcons name="stars" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
        <Text style={styleApp.textSubtitulo}>Facilidades</Text>
      </View>
      <Text style={styleApp.textSmall}>
        Gerencie as facilidades que a sua loja oferece para os clientes
      </Text>

      {ModalSimples(flagShowModal, handleShowModal, "Facilidades atualizadas!", "TipoMsg", "Título", processing)}

      <View style={[styles.containerPrincipal, { flex: 1 }]}>
        {!processing.isLoading ?
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={tipoFacilidadeList}
            keyExtractor={(item) => item.codigo}
            renderItem={renderItem}
          />
          : <></>}
      </View>

      {processing.isOnlyConsulta ? <></> :
        <View style={styleApp.containerButtonBottom}>
          <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={prosseguir} >
            <Text style={styleApp.textButtonRegular}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      }
    </SafeAreaView >
  )
}