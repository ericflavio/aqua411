import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';
import { consultaListaStatusLoja } from '../../../services/lojaService';
import { ShowErrorMessage } from '../../../errors/errorMessage';
import modalSimples from '../../../componentes/modalSimples';
import { schemaLojaStatus } from '../../../schemas/lojaSchema';

//Tela principal
export default function ViewEdtMenuLoja() {
  const { user } = useContext(AuthContext);
  const { navigateParmLoja } = useLocalSearchParams();
  navigateParmLoja ? parmLoja = JSON.parse(navigateParmLoja) : parmLoja = null;
  //Sobre o parâmetro navigateParmLoja:
  //a) Sempre deve chegar preenchido: por seleção de loja na listagem, ou da tela de criação inicial de nova loja.
  //b) Se chegar <> null siginifica que houve algum erro prévio.

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: true });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;

  //Outras declarações
  const [lojaDados, setLojaDados] = useState(parmLoja);
  const [disabled, setDisabled] = useState(false);
  const [statusList, setStatusList] = useState(null); //Relação de todos os status
  const [flagStatusEditavel, setStatusEditavel] = useState(true); //Indica se loja neste estado pode ser editada
  const [statusListToChange, setStatusListToChange] = useState(null); //Novos Status permitidos pelo DFS

  //Providências após a construção do objeto principal
  //TODO: persistir status localmente (raramente mudam)
  useEffect(() => {
    fetchLoja();
  }, [])

  async function fetchLoja() {
    //Consulta a lista de status que podem ser atribuídos a uma loja
    if (statusList === null) { //Ainda não foi consultado
      try {
        carregaDadosObtidosNoLoading(await consultaListaStatusLoja());
      } catch {
        ShowErrorMessage("lj001", "t");
      }
    }
    setProcessing({ ...processing, isLoading: false });
  }

  function carregaDadosObtidosNoLoading(resList) {
    if (resList === null || Object.keys(resList).length === 0) {
      setStatusList(schemaLojaStatus);
      return;
    }
    setStatusList(resList);
    filtraNovosStatusPossiveis(resList, lojaDados.status)
  }

  function filtraNovosStatusPossiveis(resList, statusInicial) {
    //Monta a chamada dos possíveis novos status (ações de gerenciamento)
    for (var i = 0; i < resList.length; i++) { //Todos os status existentes
      if (resList[i].id.toUpperCase() === statusInicial.toUpperCase()) { //Status da loja encontrado
        setStatusEditavel(resList[i].inPermiteEdicao)

        resDfs = resList[i].dfs
        for (var x = 0; x < resDfs.length; x++) { //Todos os novos status possíveis (DFS)
          idDfs = resDfs[x];

          for (var y = 0; y < resList.length; y++) {
            if (resList[y].id.toUpperCase() === idDfs.toUpperCase()) {
              resDfs[x] = { id: idDfs, titulo: resList[y].tituloAcionamento, icone: resList[y].icone }; break;
              break;
            }
          }
          if (y > resList.length) {
            resDfs[x] = { id: idDfs, titulo: "(" + idDfs + ")", icone: "change-history" }
          }
        }
        setStatusListToChange(resDfs)
        break;
      }
    }
  }

  //Funções auxiliares 

  function goToEndereco() {
    router.navigate({
      pathname: '/lojaEndereco',
      params: {
        navigateParmLoja: JSON.stringify(lojaDados), naviateParmOnlyConsulta: JSON.stringify(!flagStatusEditavel)
      }
    })
  }
  function goToLocalizacao() {
    router.navigate({
      pathname: '/lojaLocalizacao',
      params: {
        navigateParmLoja: JSON.stringify(lojaDados), naviateParmOnlyConsulta: !flagStatusEditavel
      }
    })
  }
  function goToDadosBasicos() {
    router.navigate({
      pathname: '/lojaCadastroBasico',
      params: {
        navigateParmLoja: JSON.stringify(lojaDados), naviateParmOnlyConsulta: !flagStatusEditavel
      }
    })
  }
  function goToExpediente() {
    router.navigate({
      pathname: '/lojaExpediente',
      params: {
        navigateParmLoja: JSON.stringify(lojaDados), naviateParmOnlyConsulta: !flagStatusEditavel
      }
    })
  }
  function goToVinculoFranquia() {
    router.navigate({
      pathname: '/lojaVinculoFranquia',
      params: {
        navigateParmLoja: JSON.stringify(lojaDados), naviateParmOnlyConsulta: !flagStatusEditavel
      }
    })
  }

  //Componentes
  const opcaoDeGerenciamento = () => {
    if (!statusListToChange || statusListToChange.length === 0) {
      return;
    }
    return (
      <View>
        {statusListToChange.map((op, index) => (
          <TouchableOpacity key={index} style={[styleApp.buttonFlatHL, { marginTop: 2 }, { marginBottom: 2 }]} onPress={() => console.log('Clicou em:', op.id)} >
            <MaterialIcons name={op.icone} size={styleApp.size.iconSizeButtonRegular} color={styleApp.color.textButtonFlat} />
            <Text style={styleApp.textButtonFlat}>{op.titulo}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styleApp.containerSafeAreaSemPadding}>
      {GradienteFill()}
      <ScrollView style={styleApp.containerScrollFull} contentContainerStyle={styleApp.containerScrollStyleContent} showsVerticalScrollIndicator={false}>
        <Image
          style={styles.imgNovaLoja}
          source={require('../../../assets/outros/sheep_novaLoja_01.png')}
        />

        {processing.isLoading ?
          <></>
          :
          <>
            {parmLoja === null || statusList === null ?
              <View style={styles.containerDadosLoja}>
                <Text style={styleApp.textSubtitulo}>As informações da loja eram esperadas e não foram recebidas.</Text>
                <Text style={styleApp.textSmall}>Tente novamante em instantes. Se o problema persistir, entre em contato com o nosso suporte.</Text>
              </View>
              :
              <>
                <View style={styles.containerDadosLoja}>
                  <Animatable.Text animation="slideInLeft" style={styleApp.textSubtitulo}>
                    {lojaDados.nome !== null && lojaDados.nome !== "" ? lojaDados.nome : "Sua nova loja"}
                  </Animatable.Text>
                  <Text style={styleApp.textSmall}>Status: <Text style={styles.textoStatus}>{lojaDados.status}</Text></Text>
                  <Text style={styleApp.textSmall}>Apelido: {lojaDados.apelido}</Text>
                </View>
                {flagStatusEditavel ? <></> :
                  <View style={styles.containerAlertaEdição}>
                    <Text style={[styleApp.textSmallItalico, { color: 'white' }]}>O status atual não permite alterações</Text>
                  </View>
                }

                {!statusListToChange || statusListToChange.length === 0 ? <></> :
                  <>
                    <View style={styles.containerSection}>
                      <Text style={styleApp.textSmall}>Ações de gerenciamento</Text>
                      <MaterialIcons name="settings" size={20} color={styleApp.color.cinzaMedio} />
                    </View>

                    <View style={styles.containerOthers}>
                      {opcaoDeGerenciamento()}
                    </View>
                  </>
                }

                <View style={styles.containerSection}>
                  <Text style={styleApp.textSmall}>Configuração da loja</Text>
                  <MaterialIcons name="edit" size={20} color={styleApp.color.cinzaMedio} />
                </View>

                <View style={styles.containerPrincipal}>
                  <TouchableOpacity style={styleApp.buttonFlatHL_list} disabled={disabled} onPress={goToEndereco} >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MaterialIcons name="add-business" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
                      <Text style={styleApp.textButtonFlat}>Endereço</Text>
                    </View>
                    <MaterialIcons name="navigate-next" size={styleApp.size.iconSizeRegular} color={styleApp.color.cinzaMedio} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styleApp.buttonFlatHL_list} disabled={disabled} onPress={goToLocalizacao} >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MaterialIcons name="location-on" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
                      <Text style={styleApp.textButtonFlat}>Localização</Text>
                    </View>
                    <MaterialIcons name="navigate-next" size={styleApp.size.iconSizeRegular} color={styleApp.color.cinzaMedio} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styleApp.buttonFlatHL_list} disabled={disabled} onPress={goToExpediente} >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MaterialIcons name="access-time" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
                      <Text style={styleApp.textButtonFlat}>Horário de funcionamento</Text>
                    </View>
                    <MaterialIcons name="navigate-next" size={styleApp.size.iconSizeRegular} color={styleApp.color.cinzaMedio} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styleApp.buttonFlatHL_list} disabled={disabled} onPress={goToVinculoFranquia} >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MaterialIcons name="copyright" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
                      <Text style={styleApp.textButtonFlat}>Vínculo com franquia</Text>
                    </View>
                    <MaterialIcons name="navigate-next" size={styleApp.size.iconSizeRegular} color={styleApp.color.cinzaMedio} />
                  </TouchableOpacity>

                  <TouchableOpacity style={styleApp.buttonFlatHL_list} disabled={disabled} onPress={goToDadosBasicos} >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <MaterialIcons name="more-vert" size={styleApp.size.iconSizeRegular} color={styleApp.color.textButtonFlat} />
                      <Text style={styleApp.textButtonFlat}>Outras informações</Text>
                    </View>
                    <MaterialIcons name="navigate-next" size={styleApp.size.iconSizeRegular} color={styleApp.color.cinzaMedio} />
                  </TouchableOpacity>

                  <View style={styles.containerSection}>
                    <Text style={styleApp.textSmall}>{styleApp.textFraseOpcaoDeAssinantes}</Text>
                    <MaterialIcons name="edit" size={20} color={styleApp.color.cinzaMedio} />
                  </View>
                </View>
              </>
            }
          </>
        }
      </ScrollView>
    </SafeAreaView >
  )
}