import { StyleSheet } from "react-native";
import { styleApp } from "../../styles/styleApp";

export const styles = StyleSheet.create({
  containerHeader: {
    flex:0,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  conteinerTextoAvatar: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    minHeight: 54,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerRecepcionista: {
    flex:0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerAvatar: {
    flex:0,
    flexDirection: "row",
    alignItems: "stretch",
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerFacilidades: {
    flex:0,
    flexDirection: "column",
    alignItems: "flex-start",
    marginTop: 20,
    borderWidth:0,
  },
  imgAvatar: {
    width: 54, 
    height: 54, 
    resizeMode: 'contain',
  },
});