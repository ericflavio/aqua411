import React, { useContext, useEffect, useState } from 'react';
import { router } from 'expo-router';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { styleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { consultaListaUnidades } from '../../../services/lojaService';
import { styleColor } from '../../../styles/styleColors';
import modalSimples from '../../../componentes/modalSimples';

//Tela principal
export default function ViewLojaUnidades() {
  const { user } = useContext(AuthContext);

  //Controles básicos
  const [processing, setProcessing] = useState({ isLoading: true, isExecuting: false, isOnlyConsulta: false });
  processing.isExecuting || processing.isLoading || processing.isOnlyConsulta ? isEditavel = false : isEditavel = true;
  const [flagShowModal, setflagShowModal] = useState(false);

  //Outras declarações
  const [listaUnidades, setListaUnidades] = useState(null);

  useEffect(() => {
    fetchUnidades();
  }, [])

  async function fetchUnidades() {
    const resUnidades = await consultaListaUnidades(user);
    setListaUnidades(resUnidades);
    setProcessing({ ...processing, isLoading: false });
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

  //Componente visual de cada Unidade (card)
  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} >
      <View style={styles.containerCardUnidade}>
        <View style={{ backgroundColor: styleColor.tema30pPrincipal, height: 38, padding: 6, justifyContent: "center" }}>
          <Text style={styleApp.textSmall}>{item.apelido}</Text>
        </View>
        <View style={{ padding: 6, gap: 8, justifyContent: "flex-start" }}>
          <Text style={styleApp.textSubtitulo}>{item.nome}</Text>
        </View>
        <View style={{ padding: 6, gap: 8, justifyContent: "flex-start" }}>
          <Text style={styleApp.textRegular}>Status: {item.status}</Text>
        </View>
      </View >
    </TouchableOpacity>
  );
  //Renderização do componente acima
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => handleItem(item)}
      />
    );
  };

  function handleItem(item) {
    //Vai para o menu de opções para editar uma loja
    router.navigate({
      pathname: "/lojaMenu",
      params: {
        navigateParmLoja: JSON.stringify(item)
      }
    })
  }

  return (
    <SafeAreaView style={styleApp.containerSafeArea}>
      {GradienteFill()}
      <View style={styles.containerHeader}>
        <Text style={styleApp.textTitulo}>
          Gerenciar suas lojas
        </Text>
        <Text style={styleApp.textRegular}>
          Selecione abaixo uma unidade previamente cadastrada e atualize os dados que desejar
        </Text>
        {modalSimples(flagShowModal, handleCloseModal, "Expediente atualizado!", "TipoMsg", "Título", processing)}
      </View>

      {processing.isLoading ?
        <></>
        :
        <View style={styles.continerViewPrincipal}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={listaUnidades}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData={item => item.id}
          />
        </View>
      }
    </SafeAreaView >
  )
}