import { StyleSheet } from "react-native";
import { myStylesComuns } from "../../styles/stylesComuns";
import { myStylesColors } from "../../styles/stylesColors";

export const myStyles = StyleSheet.create({

  containerHeader: {
    flex:0,
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  containerBody1: {
    flex:0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  containerBody2: {
    flex:1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  containerUnidadeEndereco: {
    flexDirection: "row", 
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    borderWidth: myStylesComuns.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerHorarioFuncionamento: {
    flexDirection: "row", 
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    borderWidth: myStylesComuns.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerUltimaAtualizacao: {
    flexDirection: "row", 
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: myStylesComuns.containerBordaOnOff,
    },
  containerBroadcast: {
    marginVertical: 20,
    backgroundColor: myStylesColors.corAlerta,
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    padding: 12,
    borderRadius: myStylesComuns.containerBordaRaio,
    borderWidth: myStylesComuns.containerBordaOnOff,
  },
  containerMaquinas: {
    flexDirection: "row",
    borderWidth: myStylesComuns.containerBordaOnOff,
    backgroundColor: "transparent",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 2
  },
  containerLavaSeca: {
    flexDirection: 'column',
    alignItems: "center",
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  imgLocalizacao: {
    width: 30, 
    height: 30, 
    resizeMode: 'contain'
  },
  imgRelogio: {
    width: 30, 
    height: 25, 
    resizeMode: 'contain'
  },
  imgMaquina: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain'
  },
  textoLavaSeca: {
    fontSize: myStylesComuns.textoFonteTam4,
    fontWeight: myStylesComuns.textoNegritoMedio,
    color: myStylesColors.corTextoPadrao
  },
});