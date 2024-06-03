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
    borderWidth: myStyleApp.size.containerBordaOnOff,
    marginBottom: 40,
  },
  imgNovaLoja: {
    //height: 252, 
    //width: 450,
    overflow:"hidden",
    resizeMode: "contain",
    //position: "relative"
  },
});