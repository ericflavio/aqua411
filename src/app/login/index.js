import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { myStyles } from "./styles";
import { myStylesComuns } from '../../styles/stylesComuns';
import { InputText } from '../../componentes/inputText';
import { GradienteFill } from '../../componentes/gradienteFill';

//Tela principal
export default function ViewLogin() {
  const [cenario, setCenario] = useState(1);
  const [flagErro, setFlagErro] = useState(false);
  const [email, setEmail] = useState("ericflavio@gmail.com");
  const [senhaUm, setSenhaUm] = useState("1234567890");
  const [senhaDois, setSenhaDois] = useState("1234567890");
  const [token, setToken] = useState("abcd");

  const cenarioEntrarEditar = 1; // Edita dados de login
  const cenarioEntrarValidar = 11; // Valida dados fornecidos para login
  const cenarioCadastrarEditar = 2; // Edita dados de cadastramento
  const cenarioCadastrarValidar = 21; // Valida dados de cadastramento
  const cenarioCadastrarEditarToken = 3; // Edita token enviado por email
  const cenarioCadastrarValidarToken = 31; // Valida token

  var textoRecepcionista = "";
  var flagEditavel = true;
  cenario > 10 ? flagEditavel = false : flagEditavel = true;

  //console.log("flagErro: ", flagErro);
  //console.log("flagEditavel: ", flagEditavel);

  //Monta texto da recepcionista
  switch (cenario) {
    case cenarioEntrarEditar:
      if (!flagErro) {
        textoRecepcionista = "Já tem cadastro? Então informe os dados para prosseguir";
      }
      else {
        textoRecepcionista = "oops! Algo deu errado. Verifique as informações e tente novamente";
      }
      break;
    case cenarioEntrarValidar:
      textoRecepcionista = "Estamos validando seus dados. Aguarde um instante....";
      break;
    case cenarioCadastrarEditar:
      if (!flagErro) {
        textoRecepcionista = "Para se cadastrar, informe os dados abaixo e clique em prosseguir";
      }
      else {
        textoRecepcionista = "oops! Algo deu errado. Verifique as informações e tente novamente";
      }
      break;
    case cenarioCadastrarValidar:
      textoRecepcionista = "Estamos cadastrando seus dados. Aguarde um instante....";
      break;
    case cenarioCadastrarEditarToken:
      if (!flagErro) {
        textoRecepcionista = "Ok! Para finalizar, digite o código que enviamos para o seu e-mail";
      }
      else {
        textoRecepcionista = "oops! Algo deu errado. Verifique o código e tente novamente";
      }
      break;
    case cenarioCadastrarValidarToken:
      textoRecepcionista = "Estamos validando o código. Aguarde um instante....";
      break;
  };

  function fluxoEntrar() {
    setFlagErro(false);
    setCenario(cenarioEntrarEditar);
  }
  function fluxoCadastrar() {
    setFlagErro(false);
    setCenario(cenarioCadastrarEditar);
  }
  function onChangeEmail(emailEdt) {
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
  function validarSintaxeSenha(senha) {
    if (!senha || senha.length < 8) return false;
    return true;
  }
  function onChangeToken(tokenEdt) {
    setToken(tokenEdt);
  }
  function validarSintaxeToken(token) {
    if (!token || token.length < 4) return false;
    return true;
  }
  async function reenviarToken() {
    Alert.alert('Tudo certo', 'Enviamos um novo código de confirmação para o seu e-mail', [
      {
        text: '',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'FECHAR', onPress: () => console.log('OK Pressed') },
    ]);
  }
  function prosseguir() {
    //console.log("cenario: ", cenario)
    switch (cenario) {
      case cenarioEntrarEditar:
        if (!validarSintaxeEmail(email) || !validarSintaxeSenha(senhaUm)) {
          setFlagErro(true);
          return;
        };
        setCenario(cenarioEntrarValidar); //Renderiza tela no modo aguardando realização do login

        //TODO: Realizar login
        timer = setInterval(() => {
          if (email === "ericflavio@gmail.com" && senhaUm === "1234567890") {
            //TODO: Navegar para página main
            setCenario(cenarioCadastrarEditar);
          } else {
            setFlagErro(true);
            setCenario(cenarioEntrarEditar);
          }
          clearInterval(timer);
        }, 3000);
        break;
      case cenarioCadastrarEditar:
        if (!validarSintaxeEmail(email) || !validarSintaxeSenha(senhaUm) ||
          !validarSintaxeSenha(senhaDois) || senhaUm !== senhaDois) {
          setFlagErro(true);
          return;
        };
        setCenario(cenarioCadastrarValidar); //Renderiza tela no modo aguardando realização do cadastramento

        //TODO: Realizar cadastramento
        timer = setInterval(() => {
          if (email === "ericflavio@gmail.com" && senhaUm === "1234567890") {
            //TODO: Navegar para página de login
            setCenario(cenarioCadastrarEditarToken);
          } else {
            setFlagErro(true);
            setCenario(cenarioCadastrarEditar);
          }
          clearInterval(timer);
        }, 3000);
        break;
      case cenarioCadastrarEditarToken:
        if (!validarSintaxeToken(token)) {
          setFlagErro(true);
          return;
        };
        setCenario(cenarioCadastrarValidarToken); //Renderiza tela no modo aguardando

        //TODO: Realizar cadastramento
        timer = setInterval(() => {
          if (token === "abcd") {
            //TODO: Navegar para página de login
            setCenario(cenarioEntrarEditar);
          } else {
            setFlagErro(true);
            setCenario(cenarioCadastrarEditarToken);
          }
          clearInterval(timer);
        }, 3000);
        break;
    };
    setFlagErro(false);
  }

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={myStylesComuns.textoTituloPagina}>
            Que bom você por aqui
          </Text>
        </View>

        <View style={myStyles.containerRecepcionista}>
          <View style={myStyles.containerAvatar}>
            <Image
              style={myStyles.imgAvatar}
              source={require('../../assets/outros/sheep_padrao.png')}
            />
            <MaterialIcons name="textsms" size={36} color={(flagErro ? myStylesComuns.corErro : myStylesComuns.corAzulClaro)} />
          </View>

          <Text style={myStylesComuns.textoComum}>
            {textoRecepcionista}
          </Text>

          {cenario == cenarioCadastrarEditarToken || cenario == cenarioCadastrarValidarToken ?
            <View style={{ marginTop: 0 }}>
              {InputText(onChangeToken, "Código de confirmação", 1, 4, "default", flagEditavel, token, null, false)}
            </View>
            :
            <View style={{ marginTop: 18 }}>
              {InputText(onChangeEmail, "seu_email@", 1, 60, "email-address", flagEditavel, email, null, false)}
              {InputText(setSenhaUm, "sua senha", 1, 10, "default", flagEditavel, senhaUm, null, true)}
            </View>
          }

          {cenario == cenarioCadastrarEditar || cenario == cenarioCadastrarValidar ?
            <View style={{ marginTop: 0 }}>
              {InputText(setSenhaDois, "repita a mesma senha", 1, 10, "default", flagEditavel, senhaDois, null, true)}
            </View>
            : ""
          }

          <TouchableOpacity style={myStylesComuns.button} disabled={!flagEditavel} onPress={prosseguir} >
            <View style={{ flexDirection: "row" }}>
              <Text style={myStylesComuns.buttonTextoStyle}>Prosseguir</Text>
              {!flagEditavel ? <ActivityIndicator /> : ""}
            </View>
          </TouchableOpacity>
        </View>

        {cenario == cenarioEntrarEditar || cenario == cenarioEntrarValidar ?
          <View style={myStyles.containerFacilidades}>
            <TouchableOpacity style={myStylesComuns.buttonFlat} disabled={!flagEditavel} onPress={fluxoCadastrar}>
              <Text style={myStylesComuns.buttonTextoStyleFlat}>Precisa de ajuda com a senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={myStylesComuns.buttonFlat} disabled={!flagEditavel} onPress={fluxoCadastrar}>
              <Text style={myStylesComuns.buttonTextoStyleFlat}>Clique aqui para se cadastrar</Text>
            </TouchableOpacity>
          </View>
          : ""}

        {cenario == cenarioCadastrarEditar || cenario == cenarioCadastrarValidar ?
          <View style={myStyles.containerFacilidades}>
            <TouchableOpacity style={myStylesComuns.buttonFlat} disabled={!flagEditavel} onPress={fluxoEntrar}>
              <Text style={myStylesComuns.buttonTextoStyleFlat}>Clique aqui se já tiver cadastro</Text>
            </TouchableOpacity>
          </View>
          : ""}

        {cenario == cenarioCadastrarEditarToken || cenario == cenarioCadastrarValidarToken ?
          <View style={myStyles.containerFacilidades}>
            <TouchableOpacity style={myStylesComuns.buttonFlat} disabled={!flagEditavel} onPress={reenviarToken}>
              <Text style={myStylesComuns.buttonTextoStyleFlat}>Clique aqui para receber outro código</Text>
            </TouchableOpacity>
          </View>
          : ""}
      </ScrollView>
    </SafeAreaView >
  )
}