import React, { useState, useContext } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { myStyleColor } from "../../../styles/stylesColors";
import { InputText } from '../../../componentes/inputText';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import NewErrorMessage, { errorTextOops } from '../../../errors/errorMessage';
import { consultaCepService } from '../../../services/cepService';

//Tela principal
export default function ViewEdtHorario() {
  const { user } = useContext(AuthContext);
  console.log("ViewEdtHorarioLoja <inicio>");

  const { navigateParmLoja } = useLocalSearchParams();
  var loja = JSON.parse(navigateParmLoja)
  console.log("loja: ", loja.endereco);

  const [cenario, setCenario] = useState(1);
  const [flagErro, setFlagErro] = useState(false);
  const [email, setEmail] = useState(null);

  const voidEndereco = {
    cep: "",
    localidade: "",
    uf: "",
    ddd: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: ""
  };

  const [cep, setCep] = useState("70847060");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEndereco] = useState(voidEndereco)

  //url google maps
  //longitude e latitude

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

    router.navigate({
      pathname: "/lojaLocalizacao",
      params: {
        navigateParmLoja: JSON.stringify(loja)
      }
    })
  }

  function showMsgError(cod) {
    const error = NewErrorMessage(cod);
    Alert.alert(errorTextOops, error.message);
    if (!flagErro) setFlagErro(true);
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
        showMsgError("vc010");
        return;
      }
      setCenario(cenarioValidar);

      try {
        const endereco = await consultaCepService(cep);
        if (endereco.erro) {
          showMsgError("vc011");
          setEndereco(voidEndereco);
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
        showMsgError("vc012");
        setEndereco(voidEndereco);
        setCenario(cenarioEditar);
        return;
      }
    }
  }

  async function prosseguir() {
    if (cep.length < 8 || !validarSintaxeCep(cep)) {
      showMsgError("vc010");
      return;
    };
    goTo(); //Vai para próxima tela (levando parametros)
  }

  return (
    <SafeAreaView style={myStyleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerScroll} contentContainerStyle={myStyleApp.containerScrollContent} showsVerticalScrollIndicator={false}>

        <View style={myStyles.containerHeader}>
          <MaterialIcons name="access-time" size={myStyleApp.size.iconSizeRegular} color={myStyleColor.textoSubtitulo} />
          <Text style={myStyleApp.textoSubtitulo}>Horário de funcionamento</Text>
        </View>

        <View style={myStyles.containerPrincipal}>
          {InputText("CEP", onChangeCep, "CEP", 1, 8, "default", flagEditavel, cep, false)}
          <View style={{ paddingLeft: 10, marginTop: 10 }}>
            <Text style={myStyleApp.textoRegular}>{endereco.localidade} {endereco.uf}</Text>
            <Text style={myStyleApp.textoRegular}>{endereco.bairro}</Text>
            <Text style={myStyleApp.textoRegular}>{endereco.logradouro}</Text>
          </View>
          {InputText("Número", onChangeNumero, "Número, ou s/n", 1, 5, "default", flagEditavel, numero, false)}
          {InputText("Complemento", onChangeComplemento, "Complemento", 1, 80, "default", flagEditavel, complemento, false)}

          <TouchableOpacity style={myStyleApp.buttonHC} disabled={!flagEditavel} onPress={prosseguir} >
            {!flagEditavel ? <ActivityIndicator /> : ""}
            <Text style={myStyleApp.buttonTextStyle}>Continuar</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}