import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert, Modal } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { InputText } from '../../../componentes/inputText';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { consultaCepService } from '../../../services/cepService';
import { schemaLojaEndereco } from '../../../schemas/lojaSchema';
import { atualizaEnderecoLoja, consultaEnderecoLoja } from '../../../services/lojaService';
import modalSimples from '../../../componentes/modalSimples';

export default function ViewEdtEnderecoLoja() {
  const { user } = useContext(AuthContext);

  const [cenario, setCenario] = useState(1);
  const [isLoadingData, setisLoadingData] = useState(true);
  const [flagShowModal, setflagShowModal] = useState(false);
  const [endereco, setEndereco] = useState(schemaLojaEndereco)

  //correções:
  //1.Menu loja: receber parm dados básicos (da lista seleção, ou pela view de criação dos dados básicos)
  //2.Menu loja: passar dados básicos da loja pra todos as views filhas
  //3.View dados básicos: colocar na sistmática de objeto completo
  //ok 4.View endereço: colocar na sistematica "parm" de validações de campos de tela
  //5.Services: colocar na sistematica de receber sempre parm "data"
  //6.View endereço: validar cep também na função prosseguir()

  //*Dados básicos: [mínimo: apelido, cnpj] !! Falta configurar pra ser chamado do menu de edição da loja.
  //ok - Endereço
  //ok - Localização geografica
  //horário de funcionamento
  //Franquia vinculada: url site da franquia, isFranquia, idFranquia. Obs: Pode remover a vinculação? (pensar sobre isso)
  //Contato: telefone, email
  //Maquinas: layout, flag mostrar status maquina, url de callback de status maquinas
  //Facilidades: alexa(comandos), wifi livre (nome da rede) a.c., mesa de dobra, qtd assentos, link da camera ao vivo, ver status máquina?, push de conclusão do ciclo?
  //CadastroComplementar: site, imagem de capa: uma foto da loja.

  //franquias
  //Flag permite visualização do status das maquinas
  //flag permite visualização das câmeras das máquinas

  //Cenarios
  const cenarioEditar = 1;
  const cenarioValidar = 11;
  var flagEditavel = true;
  cenario !== cenarioEditar || isLoadingData ? flagEditavel = false : flagEditavel = true;

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  //Carrega dados pre-existentes
  async function fetchDados() {
    try {
      res = await consultaEnderecoLoja();
    } catch {
      res = null;
      ShowErrorMessage("lj007");
    };
    if (res !== null) {
      setEndereco(res);
    }
    setisLoadingData(false);
  }

  //Valida campos de formulario
  function onChangeNumero(parm) {
    setEndereco({ ...endereco, numero: parm });
  }
  function onChangeComplemento(parm) {
    setEndereco({ ...endereco, complemento: parm });
  }
  async function onChangeCep(parm) {
    setEndereco({ ...endereco, cep: parm });

    if (parm.length >= 8) {
      if (!validarSintaxeCep(parm)) {
        ShowErrorMessage("vc010");
        return;
      }
      setCenario(cenarioValidar);

      try {
        const endCep = await consultaCepService(parm);
        if (endCep.erro) {
          ShowErrorMessage("vc011");
          setEndereco({ cep: parm, localidade: "", uf: "", ddd: "", bairro: "", logradouro: "", numero: "", complemento: "" });
          //setEndereco(null);
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
        }
        setCenario(cenarioEditar);
      } catch (e) {
        ShowErrorMessage("vc012");
        setEndereco({ cep: parm, localidade: "", uf: "", ddd: "", bairro: "", logradouro: "", numero: "", complemento: "" });
        setCenario(cenarioEditar);
      }
    }
  }
  function validarSintaxeCep(cep) {
    const regex = /^[0-9]{8}$/;
    const isCepValido = regex.test(cep);
    return isCepValido;
  }

  //Funções auxiliares 
  function handleCloseModal() {
    setflagShowModal(!flagShowModal);
  }
  function showMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  }

  //Ações ao clicar no botão principal (confirmar/prosseguir)
  async function prosseguir() {
    if (isLoadingData) { return };

    if (endereco.cep.length < 8 || !validarSintaxeCep(endereco.cep)) {
      ShowErrorMessage("vc010");
      return;
    };

    setCenario(cenarioValidar);
    try {
      const res = await atualizaEnderecoLoja(endereco);
      showMsgResultado();
    } catch {
      ShowErrorMessage("lj003");
    }
    setCenario(cenarioEditar);
  }

  //Apresentação da view principal
  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <MaterialIcons name="add-business" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Endereço</Text>
        </View>

        {modalSimples(flagShowModal, handleCloseModal, "Informações atualizadas!", "TipoMsg", "Título")}

        <View style={styles.containerPrincipal}>
          {InputText("CEP", onChangeCep, "CEP", 1, 8, "default", flagEditavel, endereco.cep, false)}
          {endereco && endereco !== null ?
            <View style={{ paddingLeft: 10, marginTop: 10 }}>
              <Text style={styleApp.textRegular}>{endereco.localidade} {endereco.uf}</Text>
              <Text style={styleApp.textRegular}>{endereco.bairro}</Text>
              <Text style={styleApp.textRegular}>{endereco.logradouro}</Text>
            </View>
            : <></>}
          {InputText("Número", onChangeNumero, "Número, ou s/n", 1, 5, "default", flagEditavel, endereco.numero, false)}
          {InputText("Complemento", onChangeComplemento, "Complemento", 1, 80, "default", flagEditavel, endereco.complemento, false)}

          <TouchableOpacity style={styleApp.buttonHC} disabled={!flagEditavel} onPress={prosseguir} >
            {!flagEditavel ? <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} /> : ""}
            <Text style={styleApp.textButtonRegular}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}