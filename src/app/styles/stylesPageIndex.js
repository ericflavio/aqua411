import { StyleSheet } from "react-native";
import { myStylesComuns } from "./stylesComuns";

myStyles
export const myStyles = StyleSheet.create({

  //Telas principais invocadas via opção do menu
  containerPrincipalSafeArea: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
    alignContent: "flex-start",
    borderWidth: myStylesComuns.containerBordaOnOff,
  },
  containerPrincipalScroll: {
    flex: 1,
    width: "86%",
    borderWidth: myStylesComuns.containerBordaOnOff
  },

  //Tela INICIO
  containerUnidade: {
    flexDirection: "row", 
    alignItems: "center"
  },
  containerMaquinas: {
    flexDirection: "row",
    flex: 1,
    borderWidth: myStylesComuns.containerBordaOnOff,
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