import React, { useState, useContext } from 'react';
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
import modalSucess from '../../../componentes/modalSucess';

//Tela principal
export default function ViewEdtEnderecoLoja() {
  const { user } = useContext(AuthContext);
  console.log("ViewEdtEnderecoLoja <inicio>");

  const [cenario, setCenario] = useState(1);
  const [flagErro, setFlagErro] = useState(false);
  const [flagModal, setFlagModal] = useState(false);
  const [cep, setCep] = useState("70847060");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEndereco] = useState(null)

  //horário de funcionamento
  //url site da loja
  //url site da franquia
  //telefone de contato
  //flag mostrar status maquina
  //url de callback de status maquinas

  //layout de exibição das maquinas
  ///+ adicionar maquinas

  //flag is Franquia
  /// selecionar franquia
  /// id da franquia

  //link da camera ao vivo

  const cenarioEditar = 1;
  const cenarioValidar = 11;

  var flagEditavel = true;
  cenario > 10 ? flagEditavel = false : flagEditavel = true;

  function goTo() {
    //Compoe a parte do endereco no objeto LOJA e passa adiante
    const loja = {};
    loja.endereco = endereco;
    loja.endereco.numero = numero;
    loja.endereco.complemento = complemento;

    //Alert.alert("SUCESSO!", "");
    setFlagModal(!flagModal);
    setTimeout(() => {
      setFlagModal(false);
    }, styleApp.size.modalTimeClose);

    console.log("sucesso")
    /*     router.navigate({
          pathname: "/lojaLocalizacao",
          params: {
            navigateParmLoja: JSON.stringify(loja)
          }
        }) */
  }

  function onChangeNumero(numero) {
    setNumero(numero);
  }

  function onChangeComplemento(complemento) {
    setComplemento(complemento);
  }

  function validarSintaxeCep(cep) {
    const regex = /^[0-9]{8}$/;
    const isCepValido = regex.test(cep);
    return isCepValido;
  }

  async function onChangeCep(cep) {
    setCep(cep);

    if (cep.length >= 8) {
      if (!validarSintaxeCep(cep)) {
        ShowErrorMessage("vc010");
        if (!flagErro) setFlagErro(true);
        return;
      }
      setCenario(cenarioValidar);

      try {
        const endereco = await consultaCepService(cep);
        if (endereco.erro) {
          ShowErrorMessage("vc011");
          if (!flagErro) setFlagErro(true);
          setEndereco(null);
        } else {
          setEndereco({
            cep: endereco.cep,
            localidade: endereco.localidade,
            uf: endereco.uf,
            ddd: endereco.ddd,
            bairro: endereco.bairro,
            logradouro: endereco.logradouro,
            numero: numero,
            complemento: complemento,
          })
        }
        setCenario(cenarioEditar);
        return;
      } catch (e) {
        ShowErrorMessage("vc012");
        if (!flagErro) setFlagErro(true);;
        setEndereco(null);
        setCenario(cenarioEditar);
        return;
      }
    }
  }

  async function prosseguir() {
    if (cep.length < 8 || !validarSintaxeCep(cep)) {
      ShowErrorMessage("vc010");
      if (!flagErro) setFlagErro(true);
      return;
    };
    goTo(); //Vai para próxima tela (levando parametros)
  }

  function closeModal() {
    setFlagModal(!flagModal);
  }

  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>

        <View style={styles.containerHeader}>
          <MaterialIcons name="add-business" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>Endereço</Text>
        </View>

        <View style={styles.containerPrincipal}>

          {modalSucess(flagModal, closeModal)}

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