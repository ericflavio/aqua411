import React, { useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import { consultaLojaEmEdicao } from '../../../services/lojaService';

//Tela principal
export default function ViewEdtMenuLoja() {
  console.log("ViewEdtMenuLoja <inicio>");
  const { user } = useContext(AuthContext);
  const [lojaDadosBasicos, setLojaDadosBasicos] = useState(null);
  const [disabledEndereco, setDisabledEndereco] = useState(true);
  const [disabled, setDisabled] = useState(true);

  let nomeLoja = "LOJA AINDA SEM NOME";
  let statusLoja = "Editando";

  useEffect(() => {
    console.log(">>> useefect");
    fetchLoja();
  }, [])

  async function fetchLoja() {
    resLoja = await consultaLojaEmEdicao("s");
    if (resLoja !== null) {
      setDisabled(false); // Libera edição das demais opções
      setLojaDadosBasicos(resLoja);
    }
    setDisabledEndereco(false); // Libera edição do endereço
  }

  console.log("idLoja recuperado: ", lojaDadosBasicos);

  function goTo() {
    router.navigate({
      pathname: "/lojaEndereco",
      params: {
        navigateParmLojaId: JSON.stringify(idLoja)
      }
    })
  }

  if (lojaDadosBasicos !== null) {
    nomeLoja = lojaDadosBasicos.nome;
    statusLoja = lojaDadosBasicos.status;
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
            <Text style={myStyleApp.textoSubtitulo}>{nomeLoja}</Text>
            <Text style={myStyleApp.textoRegular}>Status: <Text style={myStyles.textoStatus}>{statusLoja}</Text></Text>
          </View>
          :
          <View style={myStyles.containerDadosLoja}>
            <Text style={myStyleApp.textoRegular}>Cadastre sua loja para que seus clientes possam favoritá-la. Começe pelo endereço, nas opções abaixo.</Text>
          </View>
        }

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

      </ScrollView>
    </SafeAreaView >
  )
}