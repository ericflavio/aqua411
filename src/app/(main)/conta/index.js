import React, { useContext } from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from "react-native";
import { myStyles } from "./styles";
import { myStyleApp } from '../../../styles/styleApp';
import { myStyleColor } from "../../../styles/stylesColors";
import { MaterialIcons } from "@expo/vector-icons";
import { GradienteFill } from '../../../componentes/gradienteFill';
import { AuthContext } from "../../../contexts/auth";
import { router } from 'expo-router';

//Funcçoes de apoio

//Tela principal HOME
export default function ViewConta() {
  const { user } = useContext(AuthContext);
  var name = "Olá!";
  user.name ? name = user.name : name = user.idLogin;

  function adicionarLoja() {
    router.navigate('/lojaEdtEndereco');
  }

  return (
    <SafeAreaView style={myStyleApp.containerPrincipalSafeArea}>
      {GradienteFill()}
      <ScrollView style={myStyleApp.containerPrincipalScroll} showsVerticalScrollIndicator={false}>
        <View style={myStyles.containerHeader}>
          <Text style={myStyleApp.textoTituloPagina}>
            {name}
          </Text>
          <Image
            style={myStyles.imageUser}
            source={require('../../../assets/icones/app_icon_02.png')}
          />
        </View>

        <View style={myStyles.containerBasics}>
          <TouchableOpacity style={myStyleApp.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStyleApp.buttonContainerWithIconV}>
              <MaterialIcons name="help-outline" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Ajuda</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStyleApp.buttonContainerWithIconV}>
              <MaterialIcons name="payment" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Pagamentos</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={myStyleApp.textoComum}>Cadastre sua lavanderia</Text>
        <View style={myStyles.containerOthers}>
          <TouchableOpacity style={myStyleApp.buttonFlatWithBgCollor} onPress={adicionarLoja} >
            <View style={myStyleApp.buttonContainerWithIconHL}>
              <MaterialIcons name="add-business" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Adicionar nova loja</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStyleApp.buttonContainerWithIconHL}>
              <MaterialIcons name="local-laundry-service" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Gerenciar minhas lojas</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={myStyleApp.textoComum}>Opções para franqueador(a)</Text>
        <View style={myStyles.containerOthers}>
          <TouchableOpacity style={myStyleApp.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStyleApp.buttonContainerWithIconHL}>
              <MaterialIcons name="business" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Adicionar franquia</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={myStyleApp.buttonFlatWithBgCollor} onPress={{}} >
            <View style={myStyleApp.buttonContainerWithIconHL}>
              <MaterialIcons name="business-center" size={myStyleApp.size.iconSizeButtonRegular} color={myStyleColor.corTextoPadrao} />
              <Text style={myStyleApp.buttonTextStyleFlat}>Gerenciar minhas franquias</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView >
  )
}