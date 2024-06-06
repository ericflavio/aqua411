import { StyleSheet } from "react-native";
import { styleApp } from "../../../styles/styleApp";
import { styleColor } from "../../../styles/styleColors";

export const myStyles = StyleSheet.create({
  containerHeader: {
    gap: 0,
    width: "88%",
    marginBottom: 30,
    borderWidth: styleApp.size.containerBordaOnOff
  },
  containerCardUnidade: {
    padding: 0,
    borderWidth: 1,
    borderColor: styleColor.tema30A,
    borderBottomStartRadius: 8,
    borderBottomEndRadius: 8,
    marginBottom: 8,
    height: 120,
    backgroundColor: styleColor.tema60B,
  },
  continerViewPrincipal: { //Com borda lateral
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: styleColor.backgroundSafeArea,
    borderWidth: styleApp.size.containerBordaOnOff,
    borderBlockColor: "#fa7251ff",
    marginBottom: 40,
    width: "88%",
  },
  textoStatus: {
    size: styleApp.size.textoSize3,
    color: styleColor.sucesso
  },
});