import React, { useState, useContext, useEffect } from 'react';
import { router } from 'expo-router';
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
import { atualizaEndereco, consultaEndereco } from '../../../services/lojaService';
import modalSimples from '../../../componentes/modalSimples';

export default function ViewEdtEnderecoLoja() {
  const { user } = useContext(AuthContext);

  const [cenario, setCenario] = useState(1);
  const [isLoadingData, setisLoadingData] = useState(true);
  const [flagShowModal, setflagShowModal] = useState(false);
  const [cep, setCep] = useState("70847060");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEndereco] = useState(null)

  //*Dados básicos: [mínimo: apelido, cnpj] !! Falta configurar pra ser chamado do menu de edição da loja.
  //ok - Endereço
  //Localização geografica
  //horário de funcionamento
  //vincular franquia: url site da franquia, isFranquia, idFranquia
  //Contato: telefone, email
  //Maquinas: layout, flag mostrar status maquina, url de callback de status maquinas
  //Facilidades: alexa, mesa de dobra, qtd assentos, link da camera ao vivo, etc
  //CadastroComplementar: site, etc

  //Cenarios
  const cenarioEditar = 1;
  const cenarioValidar = 11;
  var flagEditavel = true;
  cenario !== cenarioEditar || isLoadingData ? flagEditavel = false : flagEditavel = true;

  //Ações ao final da construção do componente
  useEffect(() => {
    console.log("useEffect, consultadados")
    fetchDados();
  }, [])

  //Carrega dados pre-existentes
  async function fetchDados() {
    try {
      res = await consultaEndereco("s");
    } catch {
      res = null;
      ShowErrorMessage("lj007");
    };
    if (res !== null) {
      setEndereco(res);
      setCep(res.cep);
      setNumero(res.numero);
      setComplemento(res.complemento);
      /*       statusInicial = resLoja.status;
            setLojaDadosBasicos(resLoja);
            console.log("resLoja<2>: ", resLoja)
      
            if (resLoja.apelido && resLoja.apelido !== null && resLoja.apelido !== "") {
              setApelido(resLoja.apelido)
            } else {
              setApelido(resLoja.nome)
            }
            if (resLoja.cnpj && resLoja.cnpj !== null && resLoja.cnpj !== "") {
              setCnpj(resLoja.cnpj)
            } */
    }
    setisLoadingData(false);
  }

  //Valida campos de formulario
  function onChangeNumero(numero) {
    setNumero(numero);
  }
  function onChangeComplemento(complemento) {
    setComplemento(complemento);
  }
  async function onChangeCep(cep) {
    setCep(cep);

    if (cep.length >= 8) {
      if (!validarSintaxeCep(cep)) {
        ShowErrorMessage("vc010");
        return;
      }
      setCenario(cenarioValidar);

      try {
        const endereco = await consultaCepService(cep);
        if (endereco.erro) {
          ShowErrorMessage("vc011");
          setEndereco(null);
          setNumero(null);
          setComplemento(null);
        } else {
          setEndereco({
            cep: endereco.cep,
            localidade: endereco.localidade,
            uf: endereco.uf,
            ddd: endereco.ddd,
            bairro: endereco.bairro,
            logradouro: endereco.logradouro,
            numero: "",
            complemento: "",
          })
          setNumero(null);
          setComplemento(null);
        }
        setCenario(cenarioEditar);
        return;
      } catch (e) {
        ShowErrorMessage("vc012");
        setEndereco(null);
        setCenario(cenarioEditar);
        return;
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

    if (cep.length < 8 || !validarSintaxeCep(cep)) {
      ShowErrorMessage("vc010");
      return;
    };

    setCenario(cenarioValidar);
    try {
      const res = await atualizaEndereco(endereco);
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
          {InputText("CEP", onChangeCep, "CEP", 1, 8, "default", flagEditavel, cep, false)}
          {endereco && endereco !== null ?
            <View style={{ paddingLeft: 10, marginTop: 10 }}>
              <Text style={styleApp.textRegular}>{endereco.localidade} {endereco.uf}</Text>
              <Text style={styleApp.textRegular}>{endereco.bairro}</Text>
              <Text style={styleApp.textRegular}>{endereco.logradouro}</Text>
            </View>
            : <></>}
          {InputText("Número", onChangeNumero, "Número, ou s/n", 1, 5, "default", flagEditavel, numero, false)}
          {InputText("Complemento", onChangeComplemento, "Complemento", 1, 80, "default", flagEditavel, complemento, false)}

          <TouchableOpacity style={styleApp.buttonHC} disabled={!flagEditavel} onPress={prosseguir} >
            {!flagEditavel ? <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} /> : ""}
            <Text style={styleApp.textButtonRegular}>Confirmar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}