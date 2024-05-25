import React, { useState, useContext } from 'react';
import { router } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { myStyles } from "./styles";
import { myStyleApp } from '../../styles/styleApp';
import { myStyleColor } from "../../styles/stylesColors";
import { InputText } from '../../componentes/inputText';
import { GradienteFill } from '../../componentes/gradienteFill';
import { AuthContext } from "../../contexts/auth";
import NewErrorMessage, { errorTextOops } from '../../errors/errorMessage';


//Tela principal
export default function ViewLogin() {
  const { user, logIn, signIn, checkToken } = useContext(AuthContext);
  console.log("ViewLogin <inicio> user: ", user);

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

  //Monta texto da recepcionista
  switch (cenario) {
    case cenarioEntrarEditar:
      !flagErro
        ? textoRecepcionista = "Entre com seus dados ou crie um novo cadastro"
        : textoRecepcionista = "Verifique as informações e tente novamente";
      break;
    case cenarioEntrarValidar:
      textoRecepcionista = "validando...";
      break;
    case cenarioCadastrarEditar:
      !flagErro
        ? textoRecepcionista = "Informe os dados abaixo para se cadastrar"
        : textoRecepcionista = "Verifique as informações e tente novamente";
      break;
    case cenarioCadastrarValidar:
      textoRecepcionista = "cadastrando você...";
      break;
    case cenarioCadastrarEditarToken:
      !flagErro
        ? textoRecepcionista = "Por segurança, informe o código enviado para o seu e-mail"
        : textoRecepcionista = "Verifique o código e tente novamente";
      break;
    case cenarioCadastrarValidarToken:
      textoRecepcionista = "validando o código...";
      break;
  };

  function showMsgError(cod) {
    const error = NewErrorMessage(cod);
    Alert.alert(errorTextOops, error.message);
    if (!flagErro) setFlagErro(true);
  }
  function fluxoEntrar() {
    if (flagErro) setFlagErro(false);
    setCenario(cenarioEntrarEditar);
  }
  function fluxoCadastrar() {
    if (flagErro) setFlagErro(false);
    setCenario(cenarioCadastrarEditar);
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
  function validarSintaxeSenha(senha) {
    if (!senha || senha.length < 8) return false;
    return true;
  }
  function onChangeToken(tokenEdt) {
    setToken(tokenEdt);
  }
  function validarSintaxeToken(token) {
    if (!token || token.length !== 4) return false;
    return true;
  }
  async function reenviarToken() {
    //TODO: Reenviar token
    Alert.alert('Tudo certo', 'Enviamos um novo código de confirmação para o seu e-mail', [
      {
        text: '',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'FECHAR', onPress: () => console.log('OK Pressed') },
    ]);
  }
  async function prosseguir() {
    //console.log("cenario: ", cenario)
    switch (cenario) {
      case cenarioEntrarEditar:
        if (!validarSintaxeEmail(email)) {
          showMsgError("ob101");
          return;
        };
        if (!validarSintaxeSenha(senhaUm)) {
          showMsgError("ob102");
          return;
        };
        setCenario(cenarioEntrarValidar); //Renderiza tela no modo aguardando realização do login

        try {
          const user = await logIn(email, senhaUm);
          if (user.isLiveAccount && user.isLiveAccount == true) {
            router.replace('/'); //Conta ativa
          } else {
            if (flagErro) setFlagErro(false);
            setCenario(cenarioCadastrarEditarToken); //Conta não ativa
          }
        } catch (e) {
          showMsgError("ob104", e);
          setCenario(cenarioEntrarEditar);
          return;
        }
        break;

      case cenarioCadastrarEditar:
        if (!validarSintaxeEmail(email)) {
          showMsgError("ob101");
          return;
        };
        if (!validarSintaxeSenha(senhaUm)) {
          showMsgError("ob102");
          return;
        };
        if (!validarSintaxeSenha(senhaDois)) {
          showMsgError("ob102");
          return;
        };
        if (senhaUm !== senhaDois) {
          showMsgError("ob103");
          return;
        };
        setCenario(cenarioCadastrarValidar); //Renderiza tela no modo aguardando realização do cadastramento

        try {
          const auth = await signIn(email, senhaUm);
          setCenario(cenarioCadastrarEditarToken);
          if (flagErro) setFlagErro(false);
        } catch (e) {
          showMsgError("ob108");
          setCenario(cenarioCadastrarEditar);
          return;
        }
        break;

      case cenarioCadastrarEditarToken:
        if (!validarSintaxeToken(token)) {
          showMsgError("ob105");
          return;
        };
        setCenario(cenarioCadastrarValidarToken); //Renderiza tela no modo aguardando

        try {
          const isTokenValido = await checkToken(user, token);
          if (isTokenValido) {
            router.replace('/');
          } else {
            showMsgError("ob107");
            setCenario(cenarioCadastrarEditarToken);
            return;
          }
        } catch (e) {
          showMsgError("ob106");
          setCenario(cenarioCadastrarEditarToken);
          return;
        }
        break;
    };
  }

  return (
    <SafeAreaView style={myStyleApp.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={myStyleApp.textoTituloPagina}>
            Que bom você por aqui
          </Text>
        </View>

        <View style={myStyles.containerRecepcionista}>
          <View style={myStyles.containerAvatar}>
            <Image
              style={myStyles.imgAvatar}
              source={require('../../assets/outros/sheep_padrao.png')}
            />
            <MaterialIcons name="textsms" size={myStyleApp.size.iconSizeSmall} color={(flagErro ? myStyleColor.corErro : myStyleColor.corAzulClaro)} />
          </View>

          <View style={myStyles.conteinerTextoAvatar}>
            <Text style={myStyleApp.textoComum}>
              {textoRecepcionista}
            </Text>
          </View>

          {cenario == cenarioCadastrarEditarToken || cenario == cenarioCadastrarValidarToken ?
            <View style={{ marginTop: 0 }}>
              {InputText("Código de validação", onChangeToken, "Código de confirmação", 1, 4, "default", flagEditavel, token, false)}
            </View>
            :
            <View style={{ marginTop: 18 }}>
              {InputText("E-mail", onChangeEmail, "seu_email@", 1, 60, "email-address", flagEditavel, email, false)}
              {InputText("Senha", setSenhaUm, "sua senha", 1, 10, "default", flagEditavel, senhaUm, true)}
            </View>
          }

          {cenario == cenarioCadastrarEditar || cenario == cenarioCadastrarValidar ?
            <View style={{ marginTop: 0 }}>
              {InputText("Confirmação de senha", setSenhaDois, "repita a mesma senha", 1, 10, "default", flagEditavel, senhaDois, true)}
            </View>
            : ""
          }

          <TouchableOpacity style={myStyleApp.button} disabled={!flagEditavel} onPress={prosseguir} >
            {!flagEditavel ? <ActivityIndicator /> : ""}
            <Text style={myStyleApp.buttonTextStyle}>
              {cenario == cenarioEntrarEditar || cenario == cenarioEntrarValidar ? "Entrar" : "Cadastrar"}</Text>
          </TouchableOpacity>
        </View>

        {cenario == cenarioEntrarEditar || cenario == cenarioEntrarValidar ?
          <>
            <TouchableOpacity style={myStyleApp.buttonFlat} disabled={!flagEditavel} onPress={fluxoEntrar} >
              <MaterialIcons name="lock-reset" size={myStyleApp.size.iconSizeButtonSmall} color={myStyleColor.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={myStyleApp.buttonFlat} disabled={!flagEditavel} onPress={fluxoCadastrar} >
              <MaterialIcons name="person-add-alt" size={myStyleApp.size.iconSizeButtonSmall} color={myStyleColor.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Clique aqui para novo cadastro</Text>
            </TouchableOpacity>
          </>
          : ""}

        {cenario == cenarioCadastrarEditar || cenario == cenarioCadastrarValidar ?
          <TouchableOpacity style={myStyleApp.buttonFlat} disabled={!flagEditavel} onPress={fluxoEntrar} >
            <MaterialIcons name="login" size={myStyleApp.size.iconSizeButtonSmall} color={myStyleColor.corTextoPadrao} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Clique aqui se já possuir cadastro</Text>
          </TouchableOpacity>
          : ""}

        {cenario == cenarioCadastrarEditarToken || cenario == cenarioCadastrarValidarToken ?
          <TouchableOpacity style={myStyleApp.buttonFlat} disabled={!flagEditavel} onPress={reenviarToken} >
            <MaterialIcons name="mail-outline" size={myStyleApp.size.iconSizeButtonSmall} color={myStyleColor.corTextoPadrao} />
            <Text style={myStyleApp.buttonTextStyleFlat}>Me envie um novo código</Text>
          </TouchableOpacity>
          : ""}
      </ScrollView>
    </SafeAreaView >
  )
}