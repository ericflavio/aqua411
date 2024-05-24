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
export default function ViewAddLoja() {
  const { user } = useContext(AuthContext);
  console.log("ViewAddLoja <inicio> user: ", user);

  const [cenario, setCenario] = useState(1);
  const [flagErro, setFlagErro] = useState(false);
  const [email, setEmail] = useState(null);

  const [cep, setCep] = useState(null);
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEndereco] = useState({
    cep: "",
    localidade: "",
    uf: "",
    ddd: "",
    bairro: "",
    logradouro: "",
    numero: "",
    complemento: "",
  })

  //cep
  //complemento do cep

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

  const cenarioEditar = 1; // Edita dados de login
  const cenarioValidar = 11; // Valida dados fornecidos para login

  var flagEditavel = true;
  cenario > 10 ? flagEditavel = false : flagEditavel = true;

  function showMsgError(cod) {
    const error = NewErrorMessage(cod);
    Alert.alert(errorTextOops, error.message);
    if (!flagErro) setFlagErro(true);
  }

  function onChangeEmail(emailEdt) {
    //TODO: configurar Upercase -- automaticupscale = false
    //console.log("email: ", emailEdt)
    //if (emailEdt === undefined) emailEdt = "";
    //var emailEdtLC = emailEdt.toLowerCase();
    //console.log("emailEdtLC: ", emailEdtLC)
    setEmail(emailEdt);
  }
  async function onChangeEndereco(endereco) {
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
          setCenario(cenarioEditar);
        }
        return;
      } catch (e) {
        showMsgError("vc12");
        setEndereco(null);
        setCenario(cenarioEditar);
        return;
      }
    }
  }

  function validarSintaxeEmail(email) {
    if (!email || email.length <= 5) return false;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    return regex.test(email);
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

        <View style={myStyles.containerPrincipal}>
          <MaterialIcons name="add-business" size={myStylesComuns.iconSizeButtonRegular} color={myStylesColors.corTextoPadrao} />
          {InputText(onChangeCep, "CEP", 1, 8, "default", flagEditavel, cep, null, false)}
          <View>
            <Text style={myStylesComuns.textoComum}>{endereco.localidade} - {endereco.uf}</Text>
            <Text style={myStylesComuns.textoComum}>DDD {endereco.ddd}</Text>
            <Text style={myStylesComuns.textoComum}>Bairro {endereco.bairro}</Text>
            <Text style={myStylesComuns.textoComum}>{endereco.logradouro}</Text>
          </View>
          {InputText(onChangeEndereco, "Número, ou s/n", 1, 5, "default", flagEditavel, numero, null, false)}
          {InputText(onChangeEndereco, "Complemento", 1, 80, "default", flagEditavel, complemento, null, false)}

          {/*InputText(onChangeEmail, "seu_email@algo.com", 1, 4, "e-mail", flagEditavel, email, null, false)*/}

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