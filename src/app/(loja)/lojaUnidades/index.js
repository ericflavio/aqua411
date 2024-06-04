import React, { useContext, useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { consultaUnidades, consultaListaStatusLoja } from '../../../services/lojaService';
import { myStyleColor } from '../../../styles/stylesColors';

//Tela principal
export default function ViewLojaUnidades() {
  console.log("ViewLojaUnidades <inicio>");
  const { user } = useContext(AuthContext);
  const [listaUnidades, setListaUnidades] = useState(null);

  useEffect(() => {
    fetchUnidades();
  }, [])

  async function fetchUnidades() {
    const resUnidades = await consultaUnidades(user);
    const resStatus = await consultaListaStatusLoja();
    setListaUnidades(resUnidades);
  }

  //Componente visual de cada Unidade (card)
  const Item = ({ unidade, onPress }) => (
    <TouchableOpacity onPress={onPress} >
      <View style={myStyles.containerCardUnidade}>
        <View style={{ backgroundColor: myStyleColor.tema30A, height: 38, padding: 6, justifyContent: "center" }}>
          <Text style={myStyleApp.textoRegular}>Status: {unidade.status}</Text>
        </View>
        <View style={{ padding: 6, gap: 8, justifyContent: "flex-start" }}>
          <Text style={myStyleApp.textoSubtitulo}>{unidade.nome}</Text>
        </View>
      </View >
    </TouchableOpacity>
  );

  function goTo(unidade) {
    Alert ("Chegou ");
    router.navigate({
      pathname: "/lojaMenu",
      params: {
        navigateParmLojaId: JSON.stringify(idLoja)
      }
    })
  }

  return (
    <SafeAreaView style={myStyleApp.containerSafeArea}>
      {GradienteFill()}
      <View style={myStyles.containerHeader}>
        <Text style={myStyleApp.textoTituloPagina}>
          Gerencie aqui suas lojas
        </Text>
        <Text style={myStyleApp.textoRegular}>
          Selecione abaixo uma unidade previamente cadastrada e atualize os dados que desejar
        </Text>
      </View>

      <View style={myStyleApp.continerViewPrincipal}>
        <FlatList
          data={listaUnidades}
          renderItem={({ item }) => <Item unidade={item} />}
          keyExtractor={item => item.idLoja}
          //extraData={item => item.idLoja}
          onPress={goTo(1)}
        />
      </View>
    </SafeAreaView >
  )
}