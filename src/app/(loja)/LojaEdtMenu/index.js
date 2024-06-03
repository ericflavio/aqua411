import React, { useContext } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { MaterialIcons } from "@expo/vector-icons";

//Tela principal
export default function ViewEdtMenu() {
  console.log("ViewEdtMenu Loja <inicio>");
  const { user } = useContext(AuthContext);
  const { navigateParmLojaId } = useLocalSearchParams();
  var idLoja = "";
  if (navigateParmLojaId) {
    idLoja = JSON.parse(navigateParmLojaId)
  }
  console.log("loja-id: ", idLoja);

  function goTo() {
    router.navigate({
      pathname: "/lojaEdtEndereco",
      params: {
        navigateParmLojaId: JSON.stringify(idLoja)
      }
    })
  }

  return (
    <SafeAreaView style={myStyleApp.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerPrincipalScrollWB} showsVerticalScrollIndicator={false}>
        <Image
          style={myStyles.imgNovaLoja}
          source={require('../../../assets/outros/sheep_novaLoja_01.png')}
        />

        <View style={myStyles.containerPrincipal}>

          <TouchableOpacity style={myStyleApp.buttonFlatListHL} disabled={false} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Endereço</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corCinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatListHL} disabled={false} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Localização</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corCinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatListHL} disabled={false} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Horário de funcionamento</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corCinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatListHL} disabled={false} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Equipamentos</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corCinzaMedio} />
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatListHL} disabled={false} onPress={goTo} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Facilidades</Text>
            </View>
            <MaterialIcons name="navigate-next" size={myStyleApp.size.iconSizeRegular} color={myStyleApp.color.corCinzaMedio} />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}