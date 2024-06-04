import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert, ActivityIndicator } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { consultaUnidades } from '../../../services/lojaService';
import { myStyleColor } from '../../../styles/stylesColors';

//Tela principal
export default function ViewLojaUnidades() {
  console.log("ViewLojaUnidades <inicio>");
  const { user } = useContext(AuthContext);
  const [listaUnidades, setListaUnidades] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUnidades();
  }, [])

  async function fetchUnidades() {
    const resUnidades = await consultaUnidades(user);
    setListaUnidades(resUnidades);
    setIsLoading(false);
  }

  //Componente visual de cada Unidade (card)
  const Item = ({ item, onPress }) => (
    <TouchableOpacity onPress={onPress} >
      <View style={myStyles.containerCardUnidade}>
        <View style={{ backgroundColor: myStyleColor.tema30A, height: 38, padding: 6, justifyContent: "center" }}>
          <Text style={myStyleApp.textoRegular}>Status: {item.status}</Text>
        </View>
        <View style={{ padding: 6, gap: 8, justifyContent: "flex-start" }}>
          <Text style={myStyleApp.textoSubtitulo}>{item.nome}</Text>
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
    <SafeAreaView style={myStyleApp.containerSafeArea}>
      {GradienteFill()}
      <View style={myStyles.containerHeader}>
        <Text style={myStyleApp.textoTituloPagina}>
          Gerencie suas lojas
        </Text>
        <Text style={myStyleApp.textoRegular}>
          Selecione abaixo uma unidade previamente cadastrada e atualize os dados que desejar
        </Text>
      </View>

      {!isLoading ?
        <View style={myStyleApp.continerViewPrincipal}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={listaUnidades}
            renderItem={renderItem}
            keyExtractor={item => item.idLoja}
            extraData={item => item.idLoja}
          />
        </View>
        :
        <ActivityIndicator size="large" />
      }
    </SafeAreaView >
  )
}