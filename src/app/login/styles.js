import { StyleSheet } from "react-native";
import { myStylesComuns } from "../../styles/stylesComuns";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flex:0,
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  conteinerTextoAvatar: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    minHeight: 54,
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
  containerAvatar: {
    flex:0,
    flexDirection: "row",
    alignItems: "stretch",
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
  imgAvatar: {
    width: 50, 
    height: 50, 
    resizeMode: 'contain',
  },
});