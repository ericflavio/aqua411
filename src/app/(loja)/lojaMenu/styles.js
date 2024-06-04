import { StyleSheet } from "react-native";
import { myStyleApp } from "../../../styles/styleApp";
import { myStyleColor } from "../../../styles/stylesColors";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flexDirection:"row", 
    gap:8, 
    paddingLeft:8
  },
  containerDadosLoja: {
    flex:0,
    paddingHorizontal:12,
    paddingVertical: 16,
    borderWidth: myStyleApp.size.containerBordaOnOff,
    backgroundColor: myStyleColor.tema60B,
  },
  containerPrincipal: {
    flex:0,
    borderWidth: myStyleApp.size.containerBordaOnOff,
    marginBottom: 40,
  },
  textoStatus: {
    fontFamily: 'Lato-Bold',
    size: myStyleApp.size.textoSize3,
    color: myStyleColor.sucesso
  },
  imgNovaLoja: {
    //height: 252, 
    //width: 450,
    overflow:"hidden",
    resizeMode: "contain",
    //position: "relative"
  },
});