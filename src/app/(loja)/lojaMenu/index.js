import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import LojaHandleStatus from '../../../componentes/lojaHandleStatus';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import { consultaListaStatusLoja, consultaLojaEmEdicao } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';

console.log("ViewEdtMenuLoja <inicio>");

//Tela principal
export default function ViewEdtMenuLoja() {
  const { user } = useContext(AuthContext);
  const [lojaDadosBasicos, setLojaDadosBasicos] = useState({ status: "", nome: "" });
  const [disabledEndereco, setDisabledEndereco] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [showViewStatus, setShowViewStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(""); //Quando novo status é selecionado para atualizar
  const [statusList, setStatusList] = useState(null); //Relação de todos os status
  const [statusListToChange, setStatusListToChange] = useState(null); //Status possíveis pelo DFS

  //Caso criação de nova loja: não chega parâmetro
  //Caso edição (loja selecionada na lista): chega parâmetro
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;

  useEffect(() => {
    console.log("useEffetc>>><1>")
    fetchLoja();
  }, [])

  async function fetchLoja() {
    let statusInicial = "";
    if (parmLoja !== null) {
      //Edição de loja: parametros de identificação recebidos
      statusInicial = parmLoja.status;
      setLojaDadosBasicos(parmLoja);
      setDisabled(false); // Libera edição das demais opções
    } else {
      //Inclusão de nova loja; parametro não recebido
      try {
        resLoja = await consultaLojaEmEdicao("n"); //Verifica se já possui alguma sendo criada
      } catch {
        resLoja = null; //Não encontrou uma Loja me estágio de criação para continuar.
      };
      if (resLoja !== null) {
        statusInicial = resLoja.status;
        setLojaDadosBasicos(resLoja);
        setDisabled(false); // Libera edição das demais opções
      }
    };
    setDisabledEndereco(false); // Libera edição do endereço

    //Consulta a lista de status que podem ser atribuídos a uma loja
    if (statusList === null) { //Ainda não foi consultado
      resList = await fetchStatusList();
      filtraNovosStatusPossiveis(resList, statusInicial)
    }
  }

  async function fetchStatusList() {
    try {
      resList = await consultaListaStatusLoja();
    } catch (e) {
      ShowErrorMessage("lj001", "t");
      resList = null;
    }
    if (resList !== null) {
      setStatusList(resList);
    }
    return resList;
  }

  function filtraNovosStatusPossiveis(resList, statusInicial) {
    let arrayPicker = null;
    if (resList !== null && Object.keys(resList).length > 0) {
      //Monta os possíveis novos status
      for (var i = 0; i < resList.length; i++) {
        if (resList[i].id.toUpperCase() === statusInicial.toUpperCase()) {
          console.log("achei no indice: ", i, " ", statusInicial)
          arrayPicker = resList[i].dfs
          break;
        }
      }
    }
    //Atualiza os estados
    console.log("XXXX ", arrayPicker, statusListToChange)
    if (arrayPicker !== statusListToChange) {
      setStatusListToChange(arrayPicker);
    }
  }

  function goTo() {
    router.navigate({
      pathname: "/lojaEndereco",
      params: {
        navigateParmLojaId: JSON.stringify(idLoja)
      }
    })
  }

  function handleShowViewStatus() {
    if (statusListToChange === null || Object.keys(statusListToChange).length === 0) {
      Alert("O status atual não pode ser alterado!");
      return;
    }
    setShowViewStatus(!showViewStatus);
  }

  function handleSelectNewStatus(statusPicker) {
    setSelectedStatus(statusPicker);
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
            <Text style={myStyleApp.textoTituloPagina}>{lojaDadosBasicos.nome}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <Text style={myStyleApp.textoRegular}>Status: <Text style={myStyles.textoStatus}>{lojaDadosBasicos.status}</Text></Text>
              <TouchableOpacity style={myStyleApp.buttonHR} onPress={handleShowViewStatus} >
                <Text style={myStyleApp.buttonTextStyle}>Trocar Status</Text>
                {/*<MaterialIcons name="edit" size={myStyleApp.size.iconSizeButtonSmall} color={myStyleApp.color.buttonText} />*/}
              </TouchableOpacity>
            </View>
          </View>
          :
          <View style={myStyles.containerDadosLoja}>
            <Text style={myStyleApp.textoRegular}>Cadastre sua loja para que seus clientes possam favoritá-la. Começe pelo endereço, nas opções abaixo.</Text>
          </View>
        }

        {showViewStatus ?
          <Animatable.View animation="fadeIn">
            {LojaHandleStatus(statusListToChange, statusList, lojaDadosBasicos.status, selectedStatus, handleSelectNewStatus)}

            <View style={{ marginLeft: 12, marginRight: 12 }}>
              <TouchableOpacity style={myStyleApp.buttonFlatHL_transp} disabled={false} onPress={{}} >
                <MaterialIcons name="info-outline" size={myStyleApp.size.iconSizeSmall} color={myStyleApp.color.buttonTextFlat} />
                <Text style={myStyleApp.buttonTextStyleFlat}>Ler a descrição do status</Text>
              </TouchableOpacity>
              <TouchableOpacity style={myStyleApp.buttonHC} disabled={false} onPress={{}} >
                <Text style={myStyleApp.buttonTextStyle}>
                  Confirmar novo status</Text>
              </TouchableOpacity>
            </View>
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

          <View style={{ backgroundColor: myStyleApp.color.cinzaClaro, minHeight: 24, paddingLeft: 12 }}>
            <Text style={myStyleApp.textoPequeno}>Opções para assinantes</Text>
          </View>
        </View>

        {setLojaDadosBasicos !== null && (lojaDadosBasicos.status === "CRIANDO" || lojaDadosBasicos.status === "Criando") ?
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