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
import { pingUrl } from '../../../services/urlService';

//Tela principal
export default function ViewEdtLocalizacaoLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja } = useLocalSearchParams();
  var loja = JSON.parse(navigateParmLoja)
  console.log("ViewEdtLocalizacaoLoja <inicio> loja: ", loja.endereco);

  const [cenario, setCenario] = useState(1);
  const [flagErro, setFlagErro] = useState(false);

  const [urlGoogleMaps, setUrlGoogleMaps] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  //horário de funcionamento
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

  function validarSintaxeUrl(url) {
    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const isValid = regex.test(url);
    return isValid;
  }
  function validarSintaxeLongitude(longitude) {
    if (longitude.length < 10) { return false } else { return true };
  }
  function validarSintaxeLatitude(latitude) {
    if (latitude.length < 10) { return false } else { return true };
  }

  function onChangeLatitude(latitude) {
    setLatitude(latitude);
  }
  function onChangeLongitude(longitude) {
    setLongitude(longitude);
  }
  async function onChangeUrl(urlGoogleMaps) {
    setUrlGoogleMaps(urlGoogleMaps);
  }

  function goTo() {
    //Compoe dados e passa adiante como parametro
    const localizacao = {
      latitude: latitude,
      longitude: longitude,
      urlGoogleMapas: urlGoogleMaps
    }
    loja.localizacao = localizacao;
    console.log("xxxxx ", loja)

    router.navigate({
      pathname: "/lojaEdtHorario",
      params: {
        navigateParmLoja: JSON.stringify(loja)
      }
    })
  }

  async function prosseguir() {
    switch (cenario) {
      case cenarioEditar:

        if (latitude.length > 0 && !validarSintaxeLatitude(latitude)) {
          showMsgError("gu12");
          return;
        }
        if (longitude.length > 0 && !validarSintaxeLongitude(longitude)) {
          showMsgError("gu13");
          return;
        }

        if (urlGoogleMaps.length > 0) {
          if (!validarSintaxeUrl(urlGoogleMaps)) {
            showMsgError("gu10");
            return;
          }

          setCenario(cenarioValidar);

          try {
            const isValidUrl = await pingUrl(urlGoogleMaps);
            if (!isValidUrl) {
              showMsgError("gu11");
              setCenario(cenarioEditar);
              return;
            }
          } catch (e) {
            showMsgError("gu11");
            setCenario(cenarioEditar);
            return;
          }
        }
        goTo();
    };
  }

  return (
    <SafeAreaView style={myStyleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerScroll} contentContainerStyle={myStyleApp.containerScrollContent} showsVerticalScrollIndicator={false}>

        <View style={myStyles.containerHeader}>
          <MaterialIcons name="location-on" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.textoSubtitulo} />
          <Text style={myStyleApp.textoSubtitulo}>Endereço digital</Text>
        </View>

        <View style={myStyles.containerPrincipal}>
          {InputText("Latitude", onChangeLatitude, "ex. 15,23456", 1, 12, "default", flagEditavel, latitude, false)}
          {InputText("Longitude", onChangeLongitude, "ex. -30,67890", 1, 12, "default", flagEditavel, longitude, false)}
          {InputText("Cole aqui o endereço/url GoogleMaps", onChangeUrl, "url GoogleMaps", 1, 200, "default", flagEditavel, urlGoogleMaps, false)}

          <TouchableOpacity style={myStyleApp.buttonHC} disabled={!flagEditavel} onPress={prosseguir} >
            {!flagEditavel ? <ActivityIndicator /> : ""}
            <Text style={myStyleApp.buttonTextStyle}>Continuar</Text>
          </TouchableOpacity>
        </View>
        <View style={myStyles.containerBottom}>
          <MaterialIcons name="check-circle-outline" size={myStyleApp.size.iconSizeSmall} color={myStyleColor.textoRegular} />
          <Text style={myStyleApp.textoPequeno}>Estas informações são opcionais</Text>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}