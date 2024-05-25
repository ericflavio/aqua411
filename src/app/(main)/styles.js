import { StyleSheet } from "react-native";
import { myStyleApp } from "../../styles/styleApp";
import { myStyleColor } from "../../styles/stylesColors";

export const myStyles = StyleSheet.create({

  containerHeader: {
    flex:0,
    borderWidth: myStyleApp.containerBordaOnOff
  },
  containerBody1: {
    flex:0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    borderWidth: myStyleApp.containerBordaOnOff
  },
  containerBody2: {
    flex:1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: myStyleApp.containerBordaOnOff
  },
  containerUnidadeEndereco: {
    flexDirection: "row", 
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    borderWidth: myStyleApp.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerHorarioFuncionamento: {
    flexDirection: "row", 
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    borderWidth: myStyleApp.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerUltimaAtualizacao: {
    flexDirection: "row", 
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: myStyleApp.containerBordaOnOff,
    },
  containerBroadcast: {
    marginVertical: 20,
    backgroundColor: myStyleColor.corAlerta,
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    padding: 12,
    borderRadius: myStyleApp.containerBordaRaio,
    borderWidth: myStyleApp.containerBordaOnOff,
  },
  containerMaquinas: {
    flexDirection: "row",
    borderWidth: myStyleApp.containerBordaOnOff,
    backgroundColor: "transparent",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 2
  },
  containerLavaSeca: {
    flexDirection: 'column',
    alignItems: "center",
    borderWidth: myStyleApp.containerBordaOnOff
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
});