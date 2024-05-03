import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { myStyles } from "../styles/stylesPageLogin";
import { myStylesComuns } from '../styles/stylesComuns';
import { InputText } from '../componentes/inputText';
import { GradienteFill } from '../componentes/gradienteFill';

//Tela principal
export default function ViewLogin() {
  const [cenario, setCenario] = useState(0);
  const [flagErro, setFlagErro] = useState(false);
  const [email, SetEmail] = useState("");
  const [senhaUm, setSenhaUm] = useState("");
  const [senhaDois, setSenhaDois] = useState("");

  const cenarioMostarOpcoes = 0;
  const cenarioEntrarEditar = 1;
  const cenarioEntrarValidar = 11;
  const cenarioCadastrarEditar = 2;
  const cenarioCadastrarValidar = 21;

  var textoRecepcionista = "";
  var flagEditavel = true;

  //Monta texto da recepcionista
  switch (cenario) {
    //Inicio
    case cenarioMostarOpcoes:
      textoRecepcionista = "Se você está chegando agora, clique em Cadastrar. Se já possui cadastro, clique em Entrar";
      break;
    //Entrar: edição dos dados
    case cenarioEntrarEditar:
      flagEditavel = true;
      if (!flagErro) {
        textoRecepcionista = "Para entrar, informe abaixo o seu e-mail e senha e clique em Prosseguir";
      }
      else {
        textoRecepcionista = "oops! Tem algo errado. Verifique as informações e tente novamente";
      }
      break;
    //Entrar: edição travada enquanto aguarda retorno da login
    case cenarioEntrarValidar:
      flagEditavel = false;
      textoRecepcionista = "Estamos validando seus dados. Aguarde um instante....";
      break;
    //Cadastrar: edição dos dados
    case cenarioCadastrarEditar:
      if (!flagErro) {
        textoRecepcionista = "Para se cadastrar, informe os dados abaixo e clique em prosseguir. Por segurança, enviaremos para o seu e-mail um código de confirmação";
      }
      else {
        textoRecepcionista = "oops! Erro ao tentar cadastrar o e-mail informado";
      }
      break;
    //Cadastrar
  };

  function entrar() {
    setCenario(cenarioEntrarEditar);
  }
  function cadastrar() {
    setCenario(cenarioCadastrarEditar);
  }
  function recomecar() {
    setFlagErro(false);
    setCenario(cenarioMostarOpcoes);
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
  function prosseguir() {
    switch (cenario) {
      //Entrar
      case cenarioEntrarEditar:
        if (!validarSintaxeEmail(email) || !validarSintaxeSenha(senhaUm)) {
          setFlagErro(true);
          return;
        };
        setCenario(cenarioEntrarValidar); //Renderiza tela no modo aguardando realização do login

        //TODO: Realizar login

        break;
      case 2: textoRecepcionista = "...escreva uma senha e clieque em Prosseguir";
        break;
      //Cadastrar
    };
    setFlagErro(false);
  }

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={{ paddingBottom: 96 }}>
          <View style={myStyles.containerHeader}>
            <Text style={myStylesComuns.textoTituloPagina}>
              Que bom você por aqui
            </Text>
          </View>

          <View style={myStyles.containerRecepcionista}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={myStyles.imgRecepcionista}
                source={require('../../../assets/outros/sheep_padrao.png')}
              />
              <MaterialIcons name="textsms" size={36} color={(flagErro ? myStylesComuns.corErro : myStylesComuns.corAzulClaro)} />
            </View>
            <Text style={myStylesComuns.textoComum}>
              {textoRecepcionista}
            </Text>
            {cenario == cenarioMostarOpcoes ?
              <View style={myStyles.containerEntrarCadastrar}>
                <TouchableOpacity style={myStylesComuns.button} onPress={entrar}>
                  <Text sytle={myStylesComuns.textoButton}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={myStylesComuns.button} onPress={cadastrar}>
                  <Text sytle={myStylesComuns.textoButton}>Cadastrar</Text>
                </TouchableOpacity>
              </View>
              : ""}

            {cenario == cenarioEntrarEditar || cenario == cenarioEntrarValidar ?
              <View style={{ marginTop: 18 }}>
                {InputText(SetEmail, "seu_email@", 1, 60, "email-address", flagEditavel, email, null, false)}
                {InputText(setSenhaUm, "sua senha", 1, 10, "default", flagEditavel, senhaUm, null, true)}
                <View style={myStyles.containerEntrarCadastrar}>
                  <TouchableOpacity style={myStylesComuns.button} onPress={recomecar}>
                    <Text sytle={myStylesComuns.textoButton}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={myStylesComuns.button} onPress={prosseguir}>
                    <Text sytle={myStylesComuns.textoButton}>Prosseguir</Text>
                  </TouchableOpacity>
                </View>
              </View>
              : ""}

            {cenario == cenarioCadastrarEditar ?
              <View style={{ marginTop: 18 }}>
                {InputText(SetEmail, "seu_email@", 1, 60, "email-address", flagEditavel, email, null, false)}
                {InputText(setSenhaUm, "nova senha de 8 a 10 dígitos", 1, 10, "default", flagEditavel, senhaUm, null, true)}
                {InputText(setSenhaDois, "repita a mesma senha", 1, 10, "default", flagEditavel, senhaDois, null, true)}
                <View style={myStyles.containerEntrarCadastrar}>
                  <TouchableOpacity style={myStylesComuns.button} onPress={recomecar}>
                    <Text sytle={myStylesComuns.textoButton}>Voltar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={myStylesComuns.button} onPress={prosseguir}>
                    <Text sytle={myStylesComuns.textoButton}>Prosseguir</Text>
                  </TouchableOpacity>
                </View>
              </View>
              : ""}
          </View>
          {cenario == cenarioEntrarEditar ?
            <View>
              <Text sytle={myStylesComuns.textoButton}>Clique se precisar de ajuda com a senha</Text>
            </View>
            : ""}
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}