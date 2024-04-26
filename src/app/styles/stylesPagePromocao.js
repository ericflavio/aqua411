import { StyleSheet } from "react-native";
import { myStylesComuns } from "./stylesComuns";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flex: 0,
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  containerBody1: {
    flex: 0,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  containerBody2: {
    flex: 1,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    borderWidth: myStylesComuns.containerBordaOnOff
  },
  containerPromoVigente: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    borderWidth: myStylesComuns.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerPromoEncerrada: {
    flexDirection: "row",
    alignItems: "flex-start",
    alignContent: "flex-start",
    justifyContent: "flex-start",
    borderWidth: myStylesComuns.containerBordaOnOff,
    alignSelf: "flex-start"
  },

  //Textos
  textoTituloPromo: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
    color: myStylesComuns.corAzulEscuro,
    borderWidth: 0
  },
  textoPromo: {
    fontSize: 18,
    fontWeight: "500",
    marginTop: 0,
    color: "#1f1f1fff",
    borderWidth: 0
  },

  //Cards
  buttonPromoVigente: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 2,
    borderRadius: 8,
    borderLeftWidth: 6,
    marginTop: 10,
    padding: 14,
    borderColor: myStylesComuns.corCinzEscuro,
    width: "100%",
    height: 150,
    alignSelf: "center",
    elevation: 2
  },


});