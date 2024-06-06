import { StyleSheet } from "react-native";
import { styleApp } from "../../styles/styleApp";
import { styleColor } from "../../styles/styleColors";

export const myStyles = StyleSheet.create({

  containerHeader: {
    flex:0,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerBody1: {
    flex:0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerBody2: {
    flex:1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerUnidadeEndereco: {
    flexDirection: "row", 
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    borderWidth: styleApp.size.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerHorarioFuncionamento: {
    flexDirection: "row", 
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    borderWidth: styleApp.size.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerUltimaAtualizacao: {
    flexDirection: "row", 
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    borderWidth: styleApp.size.containerBordaOnOff,
    },
  containerBroadcast: {
    marginVertical: 20,
    backgroundColor: styleColor.alerta,
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    padding: 12,
    borderRadius: styleApp.containerBordaRaioOn,
    borderWidth: styleApp.size.containerBordaOnOff,
  },
  containerMaquinas: {
    flexDirection: "row",
    borderWidth: styleApp.size.containerBordaOnOff,
    backgroundColor: "transparent",
    alignContent: "center",
    justifyContent: "center",
    marginTop: 2
  },
  containerLavaSeca: {
    flexDirection: 'column',
    alignItems: "center",
    borderWidth: styleApp.size.containerBordaOnOff
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