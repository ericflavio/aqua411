import { StyleSheet } from "react-native";
import { styleApp } from "../../../styles/styleApp";
import { styleColor } from "../../../styles/styleColors";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flexDirection: "row",
    gap: 8,
    paddingLeft: 8
  },
  containerDadosLoja: {
    flex: 0,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderWidth: styleApp.size.containerBordaOnOff,
    backgroundColor: styleColor.tema60pMedio,
  },
  containerPrincipal: {
    flex: 0,
    borderWidth: styleApp.size.containerBordaOnOff,
    marginBottom: 40,
  },
  textoStatus: {
    fontFamily: 'Roboto-Bold',
    size: styleApp.size.textoSize3,
    color: styleColor.sucesso
  },
  imgNovaLoja: {
    //height: 252, 
    //width: 450,
    overflow: "hidden",
    resizeMode: "contain",
    //position: "relative"
  },
  containerOthers: {
    justifyContent:"center",
    alignItems: "stretch",
    gap: 8,
    borderWidth: styleApp.size.containerBordaOnOff,
    margin: 12,
    //width: "100%"
  },
  containerSection: {
    backgroundColor: styleApp.color.cinzaClaro, 
    minHeight: 28, 
    padding: 4, 
    paddingLeft: 12, 
    paddingRight: 12, 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" 
  }
});