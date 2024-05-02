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

  var textoRecepcionista = "";

  switch (cenario) {
    //Inicio
    case 0: textoRecepcionista = "Se você já tem cadastro, clique em Entrar, caso contrário, clique em Cadastrar";
      break;
    //Entrar
    case 1:
      if (!flagErro) { textoRecepcionista = "Para entrar, informe abaixo o seu e-mail e senha e clique em Prosseguir"; }
      else { textoRecepcionista = "oops! Não conseguimos validar seus dados. Verifique se estão corretos e tente novamente"; }
      break;
    case 2:
      if (!flagErro) { textoRecepcionista = "Para se cadastrar, informe abaixo o seu e-mail e senha (2 vezes) e clique em Prosseguir para receber o código de confirmação no e-mail informado"; }
      else { textoRecepcionista = "oops! Erro ao tentar cadastrar o e-mail informado"; }
      break;
      break;
    //Cadastrar
  };

  function onChangeEmail() {
    return;
  }
  function entrar() {
    setCenario(1);
  }
  function cadastrar() {
    setCenario(2);
  }
  function recomecar() {
    setFlagErro(false);
    setCenario(0);
  }
  function validarEmail() {
    setFlagErro(true);
  }
  function prosseguir() {
    switch (cenario) {
      //Entrar
      case 1:
        //TODO: Validar email informado; Verificar se existe na base
        //validarEmail();
        setCenario(2);
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
            {cenario == 0 ?
              <View style={myStyles.containerEntrarCadastrar}>
                <TouchableOpacity style={myStylesComuns.button} onPress={entrar}>
                  <Text sytle={myStylesComuns.textoButton}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={myStylesComuns.button} onPress={cadastrar}>
                  <Text sytle={myStylesComuns.textoButton}>Cadastrar</Text>
                </TouchableOpacity>
              </View>
              : ""}

            {cenario == 1 ?
              <View style={{ marginTop: 18 }}>
                {InputText(null, null, "seuemail@", true, false, "email-address", onChangeEmail)}
                {InputText(null, null, "senha", true, true, "default", onChangeEmail)}
                <View style={myStyles.containerEntrarCadastrar}>
                  <TouchableOpacity style={myStylesComuns.button} onPress={recomecar}>
                    <Text sytle={myStylesComuns.textoButton}>Recomeçar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={myStylesComuns.button} onPress={prosseguir}>
                    <Text sytle={myStylesComuns.textoButton}>Prosseguir</Text>
                  </TouchableOpacity>
                </View>
              </View>
              : ""}

            {cenario == 2 ?
              <View style={{ marginTop: 18 }}>
                {InputText(null, null, "seu_email@", true, false, "email-address", onChangeEmail)}
                {InputText(null, null, "crie uma senha de 8 dígitos", true, true, "default", onChangeEmail)}
                {InputText(null, null, "repita a mesma senha", true, true, "default", onChangeEmail)}
                <View style={myStyles.containerEntrarCadastrar}>
                  <TouchableOpacity style={myStylesComuns.button} onPress={recomecar}>
                    <Text sytle={myStylesComuns.textoButton}>Recomeçar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={myStylesComuns.button} onPress={prosseguir}>
                    <Text sytle={myStylesComuns.textoButton}>Prosseguir</Text>
                  </TouchableOpacity>
                </View>
              </View>
              : ""}
          </View>
          {cenario == 1 ?
            <View>
              <Text sytle={myStylesComuns.textoButton}>Clique se precisar de ajuda com a senha</Text>
            </View>
            : ""}
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}