import { StyleSheet } from "react-native";
import { myStyleApp } from "../../../styles/styleApp";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flexDirection:"row", 
    gap:8, 
    paddingLeft:8
  },
  containerPrincipal: {
    flex:0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    borderWidth: myStyleApp.size.containerBordaOnOff
  },
});