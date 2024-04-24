import { StyleSheet } from "react-native";
import { myStylesComuns } from "./stylesComuns";

export const myStyles = StyleSheet.create({

  textoTituloPagina: {
    fontSize: myStylesComuns.textoFonteTam0,
    fontWeight: myStylesComuns.textoNegritoForte,
    paddingTop: 40,
    paddingBottom: 20,
    color: myStylesComuns.corTemaAppPrincipal,
    borderWidth: myStylesComuns.textoBordaOnOff
  },
  textoSubtitulo: {
    fontSize: myStylesComuns.textoFonteTam2,
    fontWeight: myStylesComuns.textoNegritoForte,
    paddingTop: 20,
    color: myStylesComuns.corPretoRelativo,
    borderWidth: myStylesComuns.textoBordaOnOff
  },
  textoComum: {
    fontSize: myStylesComuns.textoFonteTam3,
    fontWeight: myStylesComuns.textoNegritoMedio,
    paddingTop: 16,
    color: myStylesComuns.corPretoRelativo,
    borderWidth: myStylesComuns.textoBordaOnOff
  },
  textoComumSemPadding: {
    fontSize: myStylesComuns.textoFonteTam3,
    fontWeight: myStylesComuns.textoNegritoMedio,
    paddingTop: 0,
    color: myStylesComuns.corPretoRelativo,
    borderWidth: myStylesComuns.textoBordaOnOff
  },
  textoPalavraDestacada: {
    fontSize: myStylesComuns.textoFonteTam2,
    fontWeight: myStylesComuns.textoNegritoForte,
    color: myStylesComuns.corTemaAppPrincipal,
    borderWidth: myStylesComuns.textoBordaOnOff
  },

  //Telas principais invocadas via opção do menu
  containerPrincipal: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    alignContent: "flex-start",
    alignItems: "center",
    borderWidth: 0
  },

  //Tela INICIO
  containerMaquinas: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 0,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "space-evenly",
    paddingTop: 18
  },
  textoMaquinas: {
    fontSize: 16,
    fontWeight: "100",
    paddingTop: 0,
    paddingBottom: 0,
    color: "black"
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: "#8f8f8fff",
    borderWidth: 2,
    borderRadius: 8,
    padding: 14,
    borderBottomWidth: 6,
    maxWidth: 240,
    minWidth: 200,
    alignSelf: "center"
  },
});