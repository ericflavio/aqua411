import React, { useState, useContext } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { myStyles } from "./styles";
import { myStylesComuns } from '../../../styles/stylesComuns';
import { myStylesColors } from "../../../styles/stylesColors";
import { InputText } from '../../../componentes/inputText';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import NewErrorMessage, { errorTextOops } from '../../../errors/errorMessage';
import { pingUrg, pingUrl } from '../../../services/urlService';

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
            if (isValidUrl.erro) {
              showMsgError("vc11");
              setCenario(cenarioEditar);
            }
            return;
          } catch (e) {
            showMsgError("vc11");
            setCenario(cenarioEditar);
            return;
          }
        }
      //GOTO
    };
  }

  return (
    <SafeAreaView style={myStylesComuns.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStylesComuns.containerPrincipalScroll} showsVerticalScrollIndicator={false}>

        <View style={myStyles.containerHeader}>
          <MaterialIcons name="location-on" size={myStylesComuns.size.iconSizeButtonRegular} color={myStylesColors.corTextoPadrao} />
          <Text style={myStylesComuns.textoSubtitulo}>Endereço digital</Text>
        </View>

        <View style={myStyles.containerPrincipal}>
          {InputText("Latitude", onChangeLatitude, "ex. 15,23456", 1, 12, "default", flagEditavel, latitude, false)}
          {InputText("Longitude", onChangeLongitude, "ex. -30,67890", 1, 12, "default", flagEditavel, longitude, false)}
          {InputText("Cole aqui o endereço/url GoogleMaps", onChangeUrl, "url GoogleMaps", 1, 200, "default", flagEditavel, urlGoogleMaps, false)}

          <TouchableOpacity style={myStylesComuns.button} disabled={!flagEditavel} onPress={prosseguir} >
            <View style={myStylesComuns.buttonContainerWithIconHC}>
              {!flagEditavel ? <ActivityIndicator /> : ""}
              <Text style={myStylesComuns.buttonTextStyle}>Continuar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={myStyles.containerBottom}>
          <MaterialIcons name="check-circle-outline" size={myStylesComuns.size.iconSizeSmall} color={myStylesColors.corAzulClaro} />
          <Text style={myStylesComuns.textoPequeno}>Informações opcionais. Você pode continuar sem informá-las</Text>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}