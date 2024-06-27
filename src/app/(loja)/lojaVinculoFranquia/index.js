import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Modal, } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { consultaDadosFranquia, consultaListaFranquias } from '../../../services/franquiaService';
import { consultaFranquiaVinculada } from '../../../services/lojaService';
import { schemaFranquiaDados } from '../../../schemas/franquiaSchema';
import { schemaLojaFranquiaVinculada } from '../../../schemas/lojaSchema';
import ModalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';
import { ViewDadoSimples } from '../../../componentes/viewDadoSimples';
import * as Animatable from 'react-native-animatable';
import { ModalSelecionaFranquia } from './modalSelecionaFranquia';
import { styleSize } from '../../../styles/styleSize';

//TODO:
//Quando franqueador mudar o stauts da solicitação, atualiar também o status na lojaServices (Status da solicitacao origemm)
//DFS
//TODO: Corrigir listagem (está crotando informações no bottom)
///Status solicitado: edição travada até que o franqueador se manifeste.
///status aprovado: edição travada até que o franqueador remova o vinculo.
///status reprovado ou removido: permite solicitar novamente (pra qualquer franquia)

export default function ViewLojaVinculoFranquia() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja, naviateParmOnlyConsulta } = useLocalSearchParams();
  navigateParmLoja && navigateParmLoja !== null ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  naviateParmOnlyConsulta ? parmOnlyConsulta = JSON.parse(naviateParmOnlyConsulta) : parmOnlyConsulta = true;

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: parmOnlyConsulta });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
  const [flagShowModal, setflagShowModal] = useState(false);

  //Outras declarações
  const [flagShowModalFranquias, setflagShowModalFranquias] = useState(false);
  const [franquiaVinculada, setFranquiaVinculada] = useState(schemaLojaFranquiaVinculada);
  const [franquia, setFranquia] = useState(schemaFranquiaDados);
  const [listaFranquias, setListaFranquias] = useState([]);
  const [selectedFranquia, setSelectedFranquia] = useState({ id: "0", nome: "Clique para selecionar" });

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

  async function carregaDadosObtidosNoLoading(res) {
    if (!res || res === null) {
      setFranquiaVinculada(schemaLojaFranquiaVinculada);
      return;
    }
    setFranquiaVinculada(res);
    //Busca dados da franquia vinculada
    if (res.idFranquia && res.idFranquia !== "") {
      try {
        fran = await consultaDadosFranquia("s");
        setFranquia(fran);
      } catch {
        throw "Erro";
      };
    }
  };

  function carregaDadosListaFranquias(res) {
    if (!res || res === null) {
      setListaFranquias(null);
      return;
    }
    setListaFranquias(res);
  }

  //Valida campos de formulario

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
  function handleShowModal() {
    setflagShowModal(!flagShowModal);
  }
  function handleShowModalFranquias() {
    setflagShowModalFranquias(!flagShowModalFranquias);
  }
  function showModalMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  }
  function handleSelectedFranquia(item) {
    setSelectedFranquia({ id: item.id, nome: item.nome });
    handleShowModalFranquias();
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
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <MaterialIcons name="copyright" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Vínculo com franquia</Text>
        </View>

        {ModalSimples(flagShowModal, handleShowModal, "Vínculo atualizado!", "TipoMsg", "Título", processing)}

        <Modal
          animationType={"slide"} //fade slide none
          transparent={true}
          visible={flagShowModalFranquias}
          onRequestClose={() => { }}>
          <View style={[styles.containerModal, {backgroundColor:'green'}]}>
            <View style={[styles.modalView, {backgroundColor:'pink'}]}>
              <View style={styles.modalClose}>
                <TouchableOpacity style={styleApp.buttonFlatHL_transp} disabled={false} onPress={handleShowModalFranquias} >
                  <MaterialIcons name="close" size={styleApp.size.iconSizeButtonLarge} color={styleApp.color.textButtonFlat} />
                </TouchableOpacity>
              </View>
              {ModalSelecionaFranquia(handleSelectedFranquia)}
            </View>
          </View>
        </Modal>

        {!processing.isLoading && (!franquiaVinculada.idFranquia || franquiaVinculada.idFranquia === null) ?
          <Animatable.View animation="fadeInRight" style={[styles.containerPrincipal, { backgroundColor: styleColor.aviso }]}>
            <Text style={styleApp.textSmallItalico}>
              Sua loja não tem vínculo com franquia
            </Text>
          </Animatable.View>
          :
          <></>}
        {!processing.isLoading && (franquiaVinculada.status && franquiaVinculada.status === "Solicitado") ?
          <Animatable.View animation="fadeInRight" style={[styles.containerPrincipal, { backgroundColor: styleColor.alerta }]}>
            <Text style={styleApp.textSmallItalico}>
              A franquia ainda está analisando sua solicitação de vínculo
            </Text>
          </Animatable.View>
          :
          <></>}

        <View style={styles.containerPrincipal}>
          {ViewDadoSimples("Franquia", franquia.nome)}
          {/*ViewDadoSimples("Data registro", franquiaVinculada.dataVinculo)*/}
          {ViewDadoSimples("Status do vínculo", franquiaVinculada.status)}
          {ViewDadoSimples("Data do vinculo confirmado", franquiaVinculada.dataInicioVinculoConfirmado)}
          {ViewDadoSimples("Data de confirmação do vínculo", franquiaVinculada.dataRegistroInicioVinculo)}
          {ViewDadoSimples("Data de fim do vínculo", franquiaVinculada.dataFimVinculoConfirmado)}
          {ViewDadoSimples("Data de registro do fim do vínculo", franquiaVinculada.dataRegistroFimVinculo)}
        </View>

        {processing.isOnlyConsulta ? <></> :
          <View style={[styles.containerPrincipal, { marginTop: 10 }]}>
            <Text style={styleApp.textSmallItalico}>
              Selecione uma franquia na lista abaixo. Ao confirmar, uma solicitação de aprovação de vínculo será enviada para análise pelo responsável.
            </Text>

            <TouchableOpacity onPress={handleShowModalFranquias}>
              <View style={styles.containerPicker}>
                <Text style={styleApp.textRegular}> {selectedFranquia.nome}</Text>
                <MaterialIcons name="arrow-drop-down" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={prosseguir} >
              <Text style={styleApp.textButtonRegular}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        }

      </ScrollView>
    </SafeAreaView >
  )
}