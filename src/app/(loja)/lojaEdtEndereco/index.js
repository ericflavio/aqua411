import React, { useState, useContext } from 'react';
import { router } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { myStyles } from "./styles";
import { myStylesComuns } from '../../../styles/stylesComuns';
import { myStylesColors } from "../../../styles/stylesColors";
import { InputText } from '../../../componentes/inputText';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import NewErrorMessage, { errorTextOops } from '../../../errors/errorMessage';
import { consultaCepService } from '../../../services/cepService';

//Tela principal
export default function ViewEdtEnderecoLoja() {
  const { user } = useContext(AuthContext);
  console.log("ViewEdtEnderecoLoja <inicio> user: ", user);

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

  const [cep, setCep] = useState(null);
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

  function showMsgError(cod) {
    const error = NewErrorMessage(cod);
    Alert.alert(errorTextOops, error.message);
    if (!flagErro) setFlagErro(true);
  }

  async function onChangeNumero(numero) {
    setNumero(numero);
  }
  async function onChangeComplemento(complemento) {
    setComplemento(complemento);
  }

  async function onChangeCep(cep) {
    setCep(cep);
    if (cep.length >= 8) {
      const regex = /^[0-9]{8}$/;
      const isCepValido = regex.test(cep);

      if (!isCepValido) {
        showMsgError("vc10");
        return;
      }
      setCenario(cenarioValidar);

      try {
        const endereco = await consultaCepService(cep);
        if (endereco.erro) {
          showMsgError("vc11");
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
        showMsgError("vc12");
        setEndereco(voidEndereco);
        setCenario(cenarioEditar);
        return;
      }
    }
  }

  async function prosseguir() {
    //console.log("cenario: ", cenario)
    switch (cenario) {
      case cenarioEditar:
        if (!validarSintaxeEmail(email)) {
          showMsgError("ob101");
          return;
        };
        setCenario(cenarioValidar); //Renderiza tela no modo aguardando realização do login

        /*      try {
               const user = await logIn(email, senhaUm);
               if (user.isLiveAccount && user.isLiveAccount == true) {
                 router.replace('/'); //Conta ativa
               } else {
                 if (flagErro) setFlagErro(false);
                 setCenario(cenarioCadastrarEditarToken); //Conta não ativa
               }
             } catch (e) {
               showMsgError("ob104", e);
               setCenario(cenarioEditar);
               return;
             } */
        break;
    };
  }

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>

        <View style={myStyles.containerHeader}>
          <MaterialIcons name="add-business" size={myStylesComuns.iconSizeButtonRegular} color={myStylesColors.corTextoPadrao} />
          <Text style={myStylesComuns.textoSubtitulo}>Endereço</Text>
        </View>

        <View style={myStyles.containerPrincipal}>
          {InputText(onChangeCep, "CEP", 1, 8, "default", flagEditavel, cep, null, false)}
          <View style={{ paddingLeft: 10 }}>
            <Text style={myStylesComuns.textoComum}>{endereco.localidade} {endereco.uf}</Text>
            <Text style={myStylesComuns.textoComum}>{endereco.bairro}</Text>
            <Text style={myStylesComuns.textoComum}>{endereco.logradouro}</Text>
          </View>
          {InputText(onChangeNumero, "Número, ou s/n", 1, 5, "default", flagEditavel, numero, null, false)}
          {InputText(onChangeComplemento, "Complemento", 1, 80, "default", flagEditavel, complemento, null, false)}

          <TouchableOpacity style={myStylesComuns.button} disabled={!flagEditavel} onPress={prosseguir} >
            <View style={myStylesComuns.buttonContainerWithIconHC}>
              {!flagEditavel ? <ActivityIndicator /> : ""}
              <Text style={myStylesComuns.buttonTextStyle}>Continuar</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}