import { StyleSheet } from "react-native";
import { myStylesComuns } from "./stylesComuns";

export const myStyles = StyleSheet.create({
  containerHeader: {
    flex: 0,
    borderWidth: myStylesComuns.containerBordaOnOff,
    marginBottom: 30
  },
  containerPromoCabecalho: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: myStylesComuns.containerBordaOnOff,
    alignSelf: "flex-start"
  },
  containerPromoPeriodo: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
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
    borderWidth: 0,
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
    marginTop: 8,
    alignItems: 'flex-start',
    backgroundColor: "white",
    borderWidth: 6,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomWidth: 6,
    padding: 14,
    borderColor: "white",
    width: "100%",
    minHeight: 150,
    maxHeight: 200,
    alignSelf: "center",
    elevation: 0
  },
  buttonPromoEncerrada: {
    marginTop: 8,
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderWidth: 6,
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderBottomWidth: 6,
    padding: 14,
    borderColor: "white",
    width: "100%",
    minHeight: 150,
    maxHeight: 200,
    alignSelf: "center",
    elevation: 0
  },


});