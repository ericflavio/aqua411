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
    borderWidth: myStyleApp.size.containerBordaOnOff
  },
  imgNovaLoja: {
    height: "100%", 
    width: "100%",
    //overflow:"scroll",
    //resizeMode: "stretch",
    alignSelf: "flex-start",
    //position: "relative"
  },
});