import React, { useState, useContext, useEffect } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { styleColor } from "../../../styles/styleColors";
import { InputText } from '../../../componentes/inputText';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { ShowErrorMessage } from '../../../errors/errorMessage';
import { schemaLojaLocalizacao } from '../../../schemas/lojaSchema';
import { atualizaLocalizacaoLoja, consultaLocalizacaoLoja } from '../../../services/lojaService';
import { pingUrl } from '../../../services/urlService';
import modalSimples from '../../../componentes/modalSimples';
import { useLocalSearchParams } from 'expo-router';

export default function ViewLocalizacaoLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;

  //Controles básicos
  const [cenario, setCenario] = useState(1);
  const [isLoadingDataInitial, setLoadingDataInitial] = useState(true);
  const [flagShowModal, setflagShowModal] = useState(false);
  //Outras declarações
  const [localizacao, setLocalizacao] = useState(schemaLojaLocalizacao)

  //Cenarios
  const cenarioEditar = 1;
  const cenarioValidar = 11;
  cenario !== cenarioEditar || isLoadingDataInitial ? isEditavel = false : isEditavel = true;

  //Ações ao final da construção do componente
  useEffect(() => {
    fetchDados();
  }, [])

  //Carrega dados pre-existentes
  async function fetchDados() {
    try {
      res = await consultaLocalizacaoLoja();
    } catch {
      res = null;
      ShowErrorMessage("lj009");
    };
    if (res !== null) {
      setLocalizacao(res);
    }
    setLoadingDataInitial(!isLoadingDataInitial);
  }

  //Valida campos de formulario
  function onChangeLatitude(parm) {
    setLocalizacao({ ...localizacao, latitude: parm });
  }
  function onChangeLongitude(parm) {
    setLocalizacao({ ...localizacao, longitude: parm });
  }
  function onChangeUrl(parm) {
    setLocalizacao({ ...localizacao, urlMapa: parm });
  }
  function validarSintaxeUrl() {
    if (!localizacao.urlMapa.includes('https://maps.app.goo.gl/')) {
      return false
    }

    const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi;
    const isValid = regex.test(localizacao.urlMapa);
    return isValid;
  }
  function validarSintaxeLongitude() {
    if (localizacao.longitude.length < 10) { return false } else { return true };
  }
  function validarSintaxeLatitude() {
    if (localizacao.latitude.length < 10) { return false } else { return true };
  }

  //Funções auxiliares 
  function handleCloseModal() {
    setflagShowModal(!flagShowModal);
  }
  function showModalMsgResultado() {
    setflagShowModal(!flagShowModal);
    setTimeout(() => {
      setflagShowModal(false);
    }, styleApp.size.modalTimeAutoClose);
  }

  //Ações ao clicar no botão principal (confirmar/prosseguir)
  async function prosseguir() {
    if (isLoadingDataInitial) { return };

    if (!validarSintaxeLatitude()) {
      ShowErrorMessage("gu012");
      return;
    };
    if (!validarSintaxeLongitude()) {
      ShowErrorMessage("gu013");
      return;
    };
    if (!validarSintaxeUrl()) {
      ShowErrorMessage("gu010");
      return;
    };

    setCenario(cenarioValidar);

    try {
      const isValidUrl = await pingUrl(localizacao.urlMapa);
      if (!isValidUrl) {
        ShowErrorMessage("gu011");
        setCenario(cenarioEditar);
        return;
      }
    } catch (e) {
      ShowErrorMessage("gu014");
      setCenario(cenarioEditar);
      return;
    }

    try {
      const res = await atualizaLocalizacaoLoja(localizacao);
      showModalMsgResultado();
    } catch {
      ShowErrorMessage("lj010");
    }
    setCenario(cenarioEditar);
  }

  //Apresentação da view principal
  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScroll} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <View style={styles.containerHeader}>
          <MaterialIcons name="location-on" size={styleApp.size.iconSizeRegular} color={styleColor.textSubtitulo} />
          <Text style={styleApp.textSubtitulo}>localização geográfica</Text>
        </View>

        {modalSimples(flagShowModal, handleCloseModal, "Informações atualizadas!", "TipoMsg", "Título")}

        <View style={styles.containerPrincipal}>
          {InputText("Latitude", onChangeLatitude, "ex. 15,23456", 1, 12, "default", isEditavel, localizacao.latitude, false)}
          {InputText("Longitude", onChangeLongitude, "ex. -30,67890", 1, 12, "default", isEditavel, localizacao.longitude, false)}
          {InputText("Cole aqui o endereço/url GoogleMaps", onChangeUrl, "url GoogleMaps", 1, 200, "default", isEditavel, localizacao.urlMapa, false)}

          <TouchableOpacity style={styleApp.buttonHC} disabled={!isEditavel} onPress={prosseguir} >
            {!isEditavel ? <ActivityIndicator size={styleApp.size.activityIndicatorSize} color={styleApp.color.activityIndicatorCollor} /> : ""}
            <Text style={styleApp.textButtonRegular}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}