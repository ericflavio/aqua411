import { StyleSheet } from "react-native";
import { myStyleApp } from "../../../styles/styleApp";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flexDirection:"row", 
    gap:8, 
    paddingLeft:8
  },
  containerPrincipal: {
    flex:1,
    borderWidth: myStyleApp.size.containerBordaOnOff
  },
});