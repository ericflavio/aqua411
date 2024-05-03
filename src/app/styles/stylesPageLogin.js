import { StyleSheet } from "react-native";
import { myStylesComuns } from "./stylesComuns";

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
  containerRecepcionista: {
    flex:0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  containerEntrarCadastrar: {
    flex:0,
    flexDirection: "row",
    alignItems: "stretch",
    justifyContent: "center",
    marginTop: 18,
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  containerFacilidades: {
    flex:0,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    borderWidth:0,
  },
  imgRecepcionista: {
    width: 80, 
    height: 80, 
    resizeMode: 'contain',
  },
});