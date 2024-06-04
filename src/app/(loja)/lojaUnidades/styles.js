import { StyleSheet } from "react-native";
import { myStyleApp } from "../../../styles/styleApp";
import { myStyleColor } from "../../../styles/stylesColors";

export const myStyles = StyleSheet.create({
  containerHeader: {
    gap: 0,
    width: "88%",
    marginBottom: 30,
    borderWidth: myStyleApp.size.containerBordaOnOff
  },
  containerCardUnidade: {
    padding: 0,
    borderWidth: 1,
    borderColor: myStyleColor.tema30A,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    marginBottom: 8,
    height: 120,
    backgroundColor: myStyleColor.tema60B,
  },
  textoStatus: {
    size: myStyleApp.size.textoSize3,
    color: myStyleColor.sucesso
  },
});