import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { consultaLojaEmEdicao, consultaListaStatusLoja } from '../../../services/lojaService';
import * as Animatable from 'react-native-animatable';

//Tela principal
export default function ViewEdtMenuLoja() {
  console.log("ViewEdtMenuLoja <inicio>");
  const { user } = useContext(AuthContext);
  const [lojaDadosBasicos, setLojaDadosBasicos] = useState(null);
  const [disabledEndereco, setDisabledEndereco] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [showStatus, setShowStatus] = useState(false);

  //Caso criação de nova loja: não chega parâmetro
  //Caso edição (loja selecionada na lista): chega parâmetro
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;

  let nomeLoja = "";
  let statusLoja = "";
  let statusList = [];

  useEffect(() => {
    fetchLoja();
    fetchStatusList();
  }, [])

  async function fetchLoja() {
    if (parmLoja !== null) {
      //Edição de loja: parametros de identificação recebidos
      setDisabled(false); // Libera edição das demais opções
      setLojaDadosBasicos(parmLoja);
    } else {
      //Inclusão de nova loja: sem parametro recebido
      try {
        resLoja = await consultaLojaEmEdicao("n"); //Verifica se já possui alguma sendo criada
      } catch {
        resLoja = null;
      };
      if (resLoja !== null) {
        setDisabled(false); // Libera edição das demais opções
        setLojaDadosBasicos(resLoja);
      }
    };
    setDisabledEndereco(false); // Libera edição do endereço
  }
  async function fetchStatusList() {
    try {
      statusList = await consultaListaStatusLoja();
    } catch {
      statusList = null;
    }
    console.log("status recuperados ", statusList)
  }

  function goTo() {
    router.navigate({
      pathname: "/lojaEndereco",
      params: {
        navigateParmLojaId: JSON.stringify(idLoja)
      }
    })
  }

  function handleStatus(){
    setShowStatus(!showStatus);
  }

  if (lojaDadosBasicos !== null) {
    nomeLoja = lojaDadosBasicos.nome;
    statusLoja = lojaDadosBasicos.status.toUpperCase();;
  }

  return (
    <SafeAreaView style={myStyleApp.containerSafeAreaSemPadding}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerScrollWB} contentContainerStyle={myStyleApp.containerScrollContent} showsVerticalScrollIndicator={false}>
        <Image
          style={myStyles.imgNovaLoja}
          source={require('../../../assets/outros/sheep_novaLoja_01.png')}
        />

        {lojaDadosBasicos !== null ?
          <View style={myStyles.containerDadosLoja}>
            <Text style={myStyleApp.textoTituloPagina}>{nomeLoja}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={myStyleApp.textoRegular}>Status: <Text style={myStyles.textoStatus}>{statusLoja}</Text></Text>
              <TouchableOpacity style={myStyleApp.buttonHR} onPress={handleStatus} >
                <Text style={myStyleApp.buttonTextStyle}>Trocar Status</Text>
                <MaterialIcons name="edit" size={myStyleApp.size.iconSizeButtonSmall} color={myStyleApp.color.buttonText} />
              </TouchableOpacity>
            </View>
          </View>
          :
          <View style={myStyles.containerDadosLoja}>
            <Text style={myStyleApp.textoRegular}>Cadastre sua loja para que seus clientes possam favoritá-la. Começe pelo endereço, nas opções abaixo.</Text>
          </View>
        }

        {showStatus ?
          <Animatable.View animation="fadeIn">
            <Text>Selecione o novo status</Text>
            <Text>Selecione o novo status</Text>
            <Text>Selecione o novo status</Text>
            <Text>Selecione o novo status</Text>
          </Animatable.View>
          : <></>}

        <View style={myStyles.containerPrincipal}>
          <TouchableOpacity style={myStyleApp.buttonFlatHL_list} disabled={disabledEndereco} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.buttonTextFlat} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Endereço</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.cinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatHL_list} disabled={disabled} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="location-on" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.buttonTextFlat} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Localização</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.cinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatHL_list} disabled={disabled} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="access-time" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.buttonTextFlat} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Horário de funcionamento</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.cinzaMedio} />
          </TouchableOpacity>
        </View>

        {setLojaDadosBasicos !== null && statusLoja === "EDITANDO" ?
          <View style={{ marginLeft: 12, marginRight: 12 }}>
            <TouchableOpacity style={myStyleApp.buttonHC} disabled={disabled} onPress={{}} >
              <Text style={myStyleApp.buttonTextStyle}>
                Excluir esta loja</Text>
            </TouchableOpacity>
          </View>
          : <></>}

      </ScrollView>
    </SafeAreaView >
  )
}