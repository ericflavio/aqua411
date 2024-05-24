import { StyleSheet } from "react-native";
import { myStylesComuns } from "../../../styles/stylesComuns";

export const myStyles = StyleSheet.create({
  containerPrincipal: {
    flex:0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 8,
    borderWidth: myStylesComuns.containerBordaOnOff
  },
});