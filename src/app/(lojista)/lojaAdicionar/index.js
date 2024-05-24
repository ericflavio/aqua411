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


//Tela principal
export default function ViewAddLoja() {
  const { user } = useContext(AuthContext);
  console.log("ViewAddLoja <inicio> user: ", user);

  const [cenario, setCenario] = useState(1);
  const [flagErro, setFlagErro] = useState(false);
  const [email, setEmail] = useState("");

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
  function validarSintaxeEmail(email) {
    //const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@a-zA-Z0-9?(?:\.a-zA-Z0-9?)*$/;
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
        <View style={myStyles.containerRecepcionista}>

          <View style={{ marginTop: 0 }}>
            {InputText(onChangeEmail, "seu_email@algo.com", 1, 4, "e-mail", flagEditavel, email, null, false)}
          </View>

          <TouchableOpacity style={myStylesComuns.button} disabled={!flagEditavel} onPress={prosseguir} >
            <View style={myStylesComuns.buttonContainerWithIconH}>
              {!flagEditavel ? <ActivityIndicator /> : ""}
              <Text style={myStylesComuns.buttonTextStyle}>
                {cenario == cenarioEditar || cenario == cenarioValidar ? "Entrar" : "Cadastrar"}</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}