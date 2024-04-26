import { StyleSheet } from "react-native";
import { myStylesComuns } from "./stylesComuns";

myStyles
export const myStyles = StyleSheet.create({

  //Telas principais invocadas via opção do menu
  containerPrincipalSafeArea: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    alignContent: "flex-start",
    borderWidth: myStylesComuns.containerBordaOnOff,
  },
  containerPrincipalScroll: {
    flex: 1,
    width: "86%",
    borderWidth: myStylesComuns.containerBordaOnOff
  },

  //Tela INICIO
  containerUnidadeEndereco: {
    flexDirection: "row", 
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  containerHorarioFuncionamento: {
    flexDirection: "row", 
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
  },
  containerBroadcast: {
    marginVertical: 20,
    backgroundColor: myStylesComuns.corAlerta,
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    padding: 12,
    borderRadius: myStylesComuns.containerBordaRaio
  },
  imgLocalizacao: {
    width: 30, 
    height: 30, 
    resizeMode: 'contain'
  },
  imgMaquina: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain'
  },
  containerMaquinas: {
    flexDirection: "row",
    flex: 1,
    borderWidth: myStylesComuns.containerBordaOnOff,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 18
  },
  containerLavaSeca: {
    flexDirection: 'column',
    alignItems: "center",
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  textoLavaSeca: {
    fontSize: myStylesComuns.textoFonteTam5,
    fontWeight: myStylesComuns.textoNegritoMedio,
    color: myStylesComuns.corPretoRelativo
  },
});